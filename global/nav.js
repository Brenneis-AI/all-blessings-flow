// All Blessings Flow — shared global JS (mobile nav toggle, dynamic copyright year)
(function () {
  function init() {
    document.documentElement.classList.remove('no-js');

    // Dynamic copyright year — every page's footer has <span id="copyright-year"></span>
    var yearEl = document.getElementById('copyright-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // Mobile nav toggle
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.site-nav');
    if (toggle && nav) {
      var overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      document.body.appendChild(overlay);

      function closeNav() {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }

      function openNav() {
        document.body.classList.add('nav-open');
        toggle.setAttribute('aria-expanded', 'true');
      }

      toggle.addEventListener('click', function () {
        var isOpen = document.body.classList.contains('nav-open');
        if (isOpen) {
          closeNav();
        } else {
          openNav();
        }
      });

      overlay.addEventListener('click', closeNav);

      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeNav);
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeNav();
      });
    }

    // About dropdown toggle (desktop click + mobile inline expand)
    var dropdown = document.querySelector('.site-nav__dropdown');
    var dropdownToggle = document.querySelector('.site-nav__dropdown-toggle');
    if (dropdown && dropdownToggle) {
      function closeDropdown() {
        dropdown.classList.remove('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }

      dropdownToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = dropdown.classList.contains('is-open');
        if (isOpen) {
          closeDropdown();
        } else {
          dropdown.classList.add('is-open');
          dropdownToggle.setAttribute('aria-expanded', 'true');
        }
      });

      document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) closeDropdown();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeDropdown();
      });
    }

    // Sticky nav shadow on scroll
    var siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
          siteHeader.classList.add('is-scrolled');
        } else {
          siteHeader.classList.remove('is-scrolled');
        }
      });
    }

    // Reveal-on-scroll — shared across every page (design refinement pass, 2026-07-05).
    // Handles both .bento-card (Home's original pattern) and the newer generic .reveal-on-scroll
    // class, so the same fade/lift-in treatment can be applied to How It Works steps, Locations
    // cards, and the Partner trust bar without each page needing its own observer.
    //
    // Exposed as window.ABFObserveReveal(root) so scripts that inject markup AFTER this runs
    // (e.g., index.js's dynamic location cards) can register their new elements too — otherwise
    // content added post-DOMContentLoaded would silently never be observed.
    var revealObserver = null;
    if ('IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
    }

    window.ABFObserveReveal = function (root) {
      var scope = root || document;
      var targets = scope.querySelectorAll('.bento-card, .reveal-on-scroll');
      if (!targets.length) return;
      if (!revealObserver) {
        targets.forEach(function (el) { el.classList.add('is-visible'); });
        return;
      }
      targets.forEach(function (el) {
        revealObserver.observe(el);
      });
    };

    window.ABFObserveReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
