// All Blessings Flow — Home page JS (locations render via shared data, scroll-reveal for featured cards)
// Location data now lives in global/locations-data.js (shared with the dedicated Locations page) —
// loaded before this file in index.html.
(function () {
  function initCardReveal() {
    var cards = document.querySelectorAll('.bento-card');
    if (!cards.length) return;

    if (!('IntersectionObserver' in window)) {
      cards.forEach(function (c) { c.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(function (card) {
      observer.observe(card);
    });
  }

  function init() {
    if (typeof renderLocationCards === 'function') {
      renderLocationCards('locations-grid');
    }
    initCardReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
