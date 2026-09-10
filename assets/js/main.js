/* Director's Choice Ltd — site behaviour (no dependencies) */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- sticky nav state ---- */
  var nav = document.getElementById('nav');
  function onScroll() {
    nav.classList.toggle('is-stuck', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile menu ---- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  function setMenu(open, restoreFocus) {
    if (restoreFocus === undefined) restoreFocus = true;
    var wasInside = !open && menu.contains(document.activeElement);

    menu.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';

    // The header sits above the sheet because it holds the close button, so
    // only the content behind it is made inert.
    [document.getElementById('main'), document.querySelector('.foot')].forEach(function (el) {
      if (!el) return;
      if (open) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });

    if (wasInside && restoreFocus) burger.focus();
  }
  burger.addEventListener('click', function () {
    setMenu(menu.hidden);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false, false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) setMenu(false);
  });

  /* ---- scroll reveal ---- */
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // stagger siblings inside the same group for a gentle cascade
        var group = el.parentElement;
        var peers = group ? Array.prototype.filter.call(group.children, function (c) {
          return c.classList.contains('reveal');
        }) : [];
        var i = peers.indexOf(el);
        el.style.transitionDelay = (i > 0 ? Math.min(i, 5) * 70 : 0) + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- two-photo crossfades ---- */
  Array.prototype.forEach.call(document.querySelectorAll('.fade'), function (root) {
    var items = Array.prototype.slice.call(root.querySelectorAll('.fade__item'));
    var dots = Array.prototype.slice.call(root.querySelectorAll('.fade__dot'));
    if (items.length < 2) return;

    var at = 0;
    var timer = null;

    function show(n) {
      at = (n + items.length) % items.length;
      items.forEach(function (el, i) { el.classList.toggle('is-on', i === at); });
      dots.forEach(function (d, i) {
        d.classList.toggle('is-on', i === at);
        d.setAttribute('aria-current', i === at ? 'true' : 'false');
      });
    }
    function play() {
      if (reduce) return;
      stop();
      timer = setInterval(function () { show(at + 1); }, 5200);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { show(i); play(); });
    });
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', play);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', play);

    show(0);
    play();
  });

  /* ---- current year ---- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
