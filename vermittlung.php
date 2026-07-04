<?php
/**
 * Formular-Handler für die Handwerkervermittlung (Strato-Webhosting).
 * Sendet die Anfrage per E-Mail an den Betreiber. Baugleich zu kontakt.php,
 * jedoch mit zusätzlichem Feld "Leistung" und eigenem Betreff.
 *
 * WICHTIG vor dem Livegang:
 *  - $an  = Zieladresse (idealerweise eine @burger-sicherheitstechnik.de-Adresse).
 *  - $von = MUSS eine Absenderadresse der EIGENEN Domain sein (Strato verlangt das),
 *           NICHT die vom Besucher eingegebene Adresse.
 *  - Kurz mit einer Testnachricht prüfen, ob die Mail ankommt.
 */

$an  = 'info@burger-sicherheitstechnik.de';
$von = 'website@burger-sicherheitstechnik.de'; // Absender der eigenen Domain

// Nur POST zulassen
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: handwerkervermittlung.html');
    exit;
}

// Spam-Honeypot: ist das versteckte Feld ausgefüllt -> Bot, still abbrechen
if (!empty($_POST['website'])) {
    header('Location: danke.html');
    exit;
}

function feld($k) { return trim(filter_var($_POST[$k] ?? '', FILTER_UNSAFE_RAW)); }

$name      = feld('name');
$email     = feld('email');
$telefon   = feld('telefon');
$leistung  = feld('leistung');
$nachricht = feld('nachricht');
$consent   = !empty($_POST['datenschutz']);

// Pflichtfelder prüfen
if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $leistung === '' || $nachricht === '' || !$consent) {
    http_response_code(400);
    echo 'Bitte füllen Sie alle Pflichtfelder aus und gehen Sie zurück. <a href="handwerkervermittlung.html">Zurück</a>';
    exit;
}

// Header-Injection verhindern
foreach (array($name, $email, $telefon, $leistung) as $wert) {
    if (preg_match('/[\r\n]/', $wert)) { http_response_code(400); exit('Ungültige Eingabe.'); }
}

$betreff = 'Neue Handwerker-Vermittlungsanfrage über die Website';
$body  = "Neue Vermittlungsanfrage von burger-sicherheitstechnik.de\n\n";
$body .= "Gesuchte Leistung: $leistung\n\n";
$body .= "Name:     $name\n";
$body .= "E-Mail:   $email\n";
$body .= "Telefon:  $telefon\n\n";
$body .= "Beschreibung:\n$nachricht\n";

$headers  = "From: Website <$von>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($an, $betreff, $body, $headers)) {
    header('Location: danke.html');
    exit;
}

http_response_code(500);
echo 'Die Anfrage konnte nicht gesendet werden. Bitte rufen Sie uns an: 0151 506 902 29. <a href="handwerkervermittlung.html">Zurück</a>';
