/* ============ GentleSip theme — scripts ============ */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  /* ---- Mobile menu ---- */
  function initMenu() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var menu = document.querySelector('[data-menu]');
    if (!toggle || !menu) return;

    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function open() {
      menu.classList.add('is-open');
      overlay.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      menu.classList.remove('is-open');
      overlay.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    toggle.addEventListener('click', function () {
      menu.classList.contains('is-open') ? close() : open();
    });
    overlay.addEventListener('click', close);
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') close();
    });
  }

  /* ---- Header shadow on scroll ---- */
  function initHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Scroll reveal ---- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { obs.observe(el); });
  }

  /* ---- Hero scroll cue ---- */
  function initHeroScroll() {
    var cue = document.querySelector('[data-hero-scroll]');
    if (!cue) return;
    cue.addEventListener('click', function () {
      window.scrollTo({ top: window.innerHeight * 0.86, behavior: 'smooth' });
    });
  }

  /* ---- Quantity steppers ---- */
  function initQty() {
    document.querySelectorAll('.qty').forEach(function (wrap) {
      var input = wrap.querySelector('input');
      if (!input) return;
      wrap.querySelectorAll('button').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var step = btn.dataset.step === 'down' ? -1 : 1;
          var val = parseInt(input.value, 10) || 1;
          val = Math.max(parseInt(input.min, 10) || 1, val + step);
          input.value = val;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
    });
  }

  /* ---- Product gallery thumbnails ---- */
  function initGallery() {
    var main = document.querySelector('[data-gallery-main]');
    var thumbs = document.querySelectorAll('[data-gallery-thumb]');
    if (!main || !thumbs.length) return;
    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        main.src = thumb.dataset.full;
        thumbs.forEach(function (t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');
      });
    });
  }

  /* ---- Product variant selection ---- */
  function initVariants() {
    var form = document.getElementById('ProductForm');
    if (!form) return;
    var dataEl = document.querySelector('[data-variant-json]');
    if (!dataEl) return;

    var variants;
    try { variants = JSON.parse(dataEl.textContent); } catch (e) { return; }

    var idInput = form.querySelector('[name="id"]');
    var priceEl = document.querySelector('[data-product-price]');
    var compareEl = document.querySelector('[data-product-compare]');
    var atcBtn = form.querySelector('[data-atc]');
    var optionInputs = form.querySelectorAll('[data-option-index]');

    /* Single-variant products have no option inputs — keep server-rendered state */
    if (optionInputs.length === 0) return;

    function selectedOptions() {
      var opts = [];
      optionInputs.forEach(function (input) {
        if (input.type === 'radio') {
          if (input.checked) opts[parseInt(input.dataset.optionIndex, 10)] = input.value;
        } else {
          opts[parseInt(input.dataset.optionIndex, 10)] = input.value;
        }
      });
      return opts;
    }

    function money(cents) { return '$' + (cents / 100).toFixed(2); }

    function update() {
      var chosen = selectedOptions();
      var match = variants.find(function (v) {
        return v.options.every(function (opt, i) { return opt === chosen[i]; });
      });

      form.querySelectorAll('.product__swatch').forEach(function (label) {
        var inp = label.querySelector('input');
        if (inp) label.classList.toggle('is-selected', inp.checked);
      });

      if (!match) {
        if (atcBtn) { atcBtn.disabled = true; atcBtn.textContent = 'Unavailable'; }
        return;
      }
      if (idInput) idInput.value = match.id;
      if (priceEl) priceEl.textContent = money(match.price);
      if (compareEl) {
        if (match.compare_at_price && match.compare_at_price > match.price) {
          compareEl.textContent = money(match.compare_at_price);
          compareEl.hidden = false;
        } else {
          compareEl.hidden = true;
        }
      }
      if (atcBtn) {
        atcBtn.disabled = !match.available;
        atcBtn.textContent = match.available ? 'Add to cart' : 'Sold out';
      }
    }

    optionInputs.forEach(function (input) { input.addEventListener('change', update); });
    update();
  }

  /* ---- Init ---- */
  document.addEventListener('DOMContentLoaded', function () {
    initMenu();
    initHeader();
    initReveal();
    initHeroScroll();
    initQty();
    initGallery();
    initVariants();
  });
})();
