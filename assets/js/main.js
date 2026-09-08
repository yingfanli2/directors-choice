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

  /* ---- hero gallery ---- */
  (function () {
    var root = document.getElementById('carousel');
    if (!root) return;

    var track = root.querySelector('.carousel__track');
    var stage = root.querySelector('.carousel__stage');
    var real = Array.prototype.slice.call(track.children);
    if (real.length < 2) return;

    // Give each card the ratio of its own photograph. The width/height
    // attributes are on the markup, so this resolves before the file loads
    // and the arc never reflows.
    real.forEach(function (li) {
      var im = li.querySelector('img');
      var w = im.getAttribute('width'), h = im.getAttribute('height');
      if (w && h) li.style.setProperty('--ar', w + ' / ' + h);
    });

    // Five visible slots plus a hidden slot each side needs seven cards for
    // the wrap to happen off-stage. With fewer, clone the deck once so the
    // arc still never has to teleport a card across the middle.
    if (real.length < 7) {
      real.forEach(function (li) {
        var clone = li.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    }
    var items = Array.prototype.slice.call(track.children);
    var n = items.length;

    // The arc, indexed by distance from the middle.
    var SCALE  = [1, 0.87, 0.75, 0.66];
    var ROTATE = [0, 16, 26, 30];      // deg
    var LIFT   = [0, 5, 14, 18];       // % of the card's own height, down
    var FADE   = [1, 0.92, 0.8, 0];

    var active = 0;
    var timer = null;
    var HOLD = 4200;

    function at(off) {
      return ((active + off) % n + n) % n;
    }

    function relative(i) {
      var off = i - active;
      if (off > n / 2) off -= n;        // shortest way round
      if (off < -n / 2) off += n;
      return off;
    }

    // Cards share a height but not a width, so even centre-to-centre steps
    // would leave two wide cards touching and two narrow ones far apart.
    // Walk outwards from the middle instead, adding half of each neighbour
    // plus one constant gap, so every seam is the same width.
    function offsets() {
      var stageW = stage.clientWidth;
      var gap = stageW * (stageW < 640 ? 0.055 : 0.032);
      var xs = { 0: 0 };
      [-1, 1].forEach(function (dir) {
        var x = 0;
        for (var k = 1; k <= 3; k++) {
          var prev = items[at(dir * (k - 1))].offsetWidth * SCALE[k - 1];
          var cur = items[at(dir * k)].offsetWidth * SCALE[Math.min(k, 3)];
          x += prev / 2 + gap + cur / 2;
          xs[dir * k] = dir * x;
        }
      });
      return xs;
    }

    function layout() {
      var xs = offsets();
      items.forEach(function (el, i) {
        var off = relative(i);
        var d = Math.min(Math.abs(off), 3);
        var sign = off < 0 ? -1 : 1;
        var x = xs[off] !== undefined ? xs[off] : xs[sign * 3];

        el.style.transform =
          'translate(-50%,-50%)' +
          ' translateX(' + Math.round(x) + 'px)' +
          ' translateY(' + LIFT[d] + '%)' +
          ' scale(' + SCALE[d] + ')' +
          ' rotateY(' + (-sign * ROTATE[d]) + 'deg)';
        el.style.opacity = FADE[d];
        el.style.zIndex = String(20 - d);
        el.style.pointerEvents = d === 3 ? 'none' : '';
        el.classList.toggle('is-active', off === 0);
      });
    }

    function go(step) {
      active = (active + step + n) % n;
      layout();
    }

    function play() {
      if (reduce) return;
      stop();
      timer = setInterval(function () { go(1); }, HOLD);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    root.querySelectorAll('.carousel__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        go(Number(btn.getAttribute('data-dir')) || 1);
        play();
      });
    });

    items.forEach(function (el, i) {
      el.addEventListener('click', function () {
        if (i === active) return;
        go(relative(i));
        play();
      });
    });

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { go(-1); play(); e.preventDefault(); }
      if (e.key === 'ArrowRight') { go(1); play(); e.preventDefault(); }
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', play);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', play);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else play();
    });

    var from = null;
    stage.addEventListener('pointerdown', function (e) {
      from = e.clientX; stop();
      stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener('pointerup', function (e) {
      if (from === null) return;
      var dx = e.clientX - from;
      from = null;
      if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
      play();
    });
    stage.addEventListener('pointercancel', function () { from = null; play(); });

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 120);
    });

    layout();
    play();
  })();

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
