/* Burger Sicherheitstechnik – kleines, robustes Frontend-Skript */
(function () {
  'use strict';

  /* --- Mobiles Menü --- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- Reveal beim Scrollen ---
     Wichtig: Fällt sauber zurück. Wenn kein IntersectionObserver da ist,
     werden ALLE Elemente sofort sichtbar gemacht (nie "hängen bleiben"). */
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !items.length) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (el) { io.observe(el); });

  /* Sicherheitsnetz: falls JS/Observer je klemmt, nach 1,5s alles zeigen */
  setTimeout(function () {
    document.querySelectorAll('.reveal:not(.is-in)').forEach(function (el) {
      el.classList.add('is-in');
    });
  }, 1500);
})();
