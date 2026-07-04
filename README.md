# Burger Sicherheitstechnik – Website

Statische Website (reines HTML/CSS/JS) für den Fachbetrieb Burger Sicherheitstechnik, Eichenau.
Kein Build-Schritt, keine Server-Software nötig – läuft direkt auf klassischem Webhosting (Strato).

## Seiten
| Datei | Inhalt |
|-------|--------|
| `index.html` | Startseite |
| `ueber-uns.html` | Über uns |
| `leistungen.html` | Alle Leistungen (7 Bereiche + Reparaturservice) |
| `kontakt.html` | Kontakt + Formular |
| `danke.html` | Bestätigung nach Formularversand |
| `impressum.html` | Impressum (VORLAGE – Platzhalter füllen!) |
| `datenschutz.html` | Datenschutz (VORLAGE – Platzhalter füllen!) |
| `kontakt.php` | Formular-Handler (E-Mail-Versand) |

## Bilder & Design
Die Seite nutzt eine Hero-Slideshow und echte Produktfotos (aus der bisherigen Website übernommen und für schnelle Ladezeiten als JPG optimiert – gesamter `img/`-Ordner ~1,5 MB). Ablage:

| Ordner | Inhalt |
|--------|--------|
| `img/slider/` | 3 Hero-Slides (`slide-1..3.jpg`, 1920×1080) |
| `img/produkte/` | 7 Produktfotos (`schliessanlagen.jpg`, `beschlaege.jpg`, `tueroeffner.jpg`, `briefkaesten.jpg`, `beschilderungen.jpg`, `einbruchschutz.jpg`, `reparatur.jpg`) |
| `img/logo/` | `logo.png` (weiß, für dunkle Bereiche/Footer), `logo-cropped.jpg` (blaues Icon, Header/App-Icon) |

Visuelle Effekte sind bewusst dezent gehalten: sanfte Crossfade-Slideshow mit Ken-Burns, gestaffelte Scroll-Einblendungen, kompakter Header beim Scrollen, feine Karten-Hover. Alle Effekte respektieren `prefers-reduced-motion`.

## Noch zu erledigen vor Livegang
- [ ] **Impressum** (`impressum.html`): alle `[Platzhalter]` durch echte Daten ersetzen (Name/Rechtsform, Steuer-/USt-IdNr. bzw. Kleinunternehmer-Hinweis). Vom Betreiber prüfen lassen.
- [ ] **Datenschutz** (`datenschutz.html`): Platzhalter füllen, Stand-Datum setzen. Gilt für die schlanke Version ohne Tracking/Google-Fonts/Maps.
- [x] ~~**Echte Fotos** einsetzen~~ – erledigt (Hero-Slideshow + Produktfotos aus der alten Seite übernommen).
- [x] ~~**Logo-Datei** ablegen~~ – erledigt (`img/logo/`; Header nutzt das blaue Icon, Footer das weiße Logo).
- [ ] Optional: echtes **Foto vom Inhaber / der Werkstatt** ergänzen (aktuell steht auf „Über uns" ein Produktfoto als Platzhalter).
- [ ] **Kontaktformular testen**: In `kontakt.php` `$an` und `$von` prüfen (`$von` MUSS eine Domain-eigene Adresse sein, sonst blockt Strato). Testnachricht senden.

## Deployment auf Strato (per FTP)
1. FTP-Zugangsdaten im Strato-Kundenlogin holen (Server/Host, Benutzer, Passwort).
2. Mit einem FTP-Programm (z. B. FileZilla) verbinden.
3. **Alle** Dateien und Ordner (`css/`, `js/`, `img/`, alle `.html`, `kontakt.php`) in das Webspace-Wurzelverzeichnis hochladen (bei Strato meist `/` bzw. der Ordner der Domain).
4. Seite im Browser prüfen. Domain & E-Mail bleiben unverändert bei Strato.

> Kein `next build`, kein `npm` – einfach Dateien hochladen. Updates = geänderte Dateien erneut hochladen.
