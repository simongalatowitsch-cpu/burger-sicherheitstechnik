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

  /* --- Header: kompakter Zustand beim Scrollen --- */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) { header.classList.add('is-scrolled'); }
      else { header.classList.remove('is-scrolled'); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Hero-Slideshow ---
     Reines Crossfade mit Punkten. Auto-Play, Pause bei Hover,
     stoppt sauber, falls nur 1 Slide oder das Tab im Hintergrund ist. */
  var slider = document.querySelector('.hero-slider');
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.hero-slider__slide'));
    var dots = Array.prototype.slice.call(slider.querySelectorAll('.hero-slider__dots button'));
    var current = 0;
    var timer = null;
    var DELAY = 6000;

    var show = function (i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.classList.toggle('is-active', n === current); });
      dots.forEach(function (d, n) { d.classList.toggle('is-active', n === current); });
    };
    var next = function () { show(current + 1); };
    var start = function () { if (slides.length > 1 && !timer) { timer = setInterval(next, DELAY); } };
    var stop = function () { if (timer) { clearInterval(timer); timer = null; } };

    if (slides.length) {
      show(0);
      dots.forEach(function (d, n) {
        d.addEventListener('click', function () { show(n); stop(); start(); });
      });
      slider.addEventListener('mouseenter', stop);
      slider.addEventListener('mouseleave', start);
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) { stop(); } else { start(); }
      });
      start();
    }
  }

  /* --- Reveal beim Scrollen ---
     Wichtig: Fällt sauber zurück. Wenn kein IntersectionObserver da ist,
     werden ALLE Elemente sofort sichtbar gemacht (nie "hängen bleiben"). */
  var items = document.querySelectorAll('.reveal, .reveal-grid');
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
