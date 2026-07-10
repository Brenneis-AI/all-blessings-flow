// All Blessings Flow — Home page JS (locations render via shared data)
// Location data lives in global/locations-data.js (shared with the dedicated Locations page) —
// loaded before this file in index.html. Reveal-on-scroll is handled globally by global/nav.js;
// this file just re-registers the newly-injected location cards with that shared observer via
// window.ABFObserveReveal(), since they're created after nav.js's initial scan runs.
(function () {
  function init() {
    var locationsGrid = document.getElementById('locations-grid');
    if (typeof renderLocationCards === 'function' && locationsGrid) {
      renderLocationCards('locations-grid');
      if (typeof window.ABFObserveReveal === 'function') {
        window.ABFObserveReveal(locationsGrid);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
