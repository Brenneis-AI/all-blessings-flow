// All Blessings Flow — Home page JS (locations data render, scroll-reveal for featured cards)
(function () {
  // Structured location data — fixes the client's real pain point of hand-editing hours in raw HTML.
  // Hours/addresses are VERIFIED from the live-site audit crawl (research-report.md) — NOT the
  // Stitch mockup's fabricated hours. See page-copy.md Copy Flags for the two unresolved fields.
  var LOCATIONS = [
    {
      name: 'Charlottesville',
      address: '2335 Seminole Lane, Suite 2000<br>Charlottesville, VA 22901',
      hours: [
        { days: 'Monday & Thursday', time: '10:00 AM – 2:00 PM' },
        { days: 'Saturday', time: '10:00 AM – 12:00 PM' }
      ],
      mapQuery: '2335 Seminole Lane, Charlottesville, VA 22901'
    },
    {
      name: 'Elkton',
      // COPY FLAG: ZIP not independently confirmed from the site crawl — 22827 is Elkton, VA's
      // standard ZIP but should be confirmed with the client before launch.
      address: '149 W. Spotswood Ave. (Thrift at Heart)<br>Elkton, VA 22827',
      hours: [
        { days: 'Tuesday', time: '5:00 PM – 7:00 PM' }
      ],
      mapQuery: '149 W Spotswood Ave, Elkton, VA 22827'
    },
    {
      name: 'Palmyra',
      // COPY FLAG: exact street address not found in the site crawl — do not fabricate one.
      address: 'Address pending confirmation — call (434) 422-8888 or email info@allblessingsflow.org',
      hours: [
        { days: 'Wednesday', time: '10:00 AM – 12:00 PM (Noon)' }
      ],
      mapQuery: null
    }
  ];

  var MAP_PIN_ICON = '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';

  function renderLocations() {
    var grid = document.getElementById('locations-grid');
    if (!grid) return;

    LOCATIONS.forEach(function (loc) {
      var card = document.createElement('div');
      card.className = 'location-card bento-card';

      var hoursRows = loc.hours.map(function (h) {
        return '<tr><td>' + h.days + '</td><td class="location-card__time">' + h.time + '</td></tr>';
      }).join('');

      var actionButton = loc.mapQuery
        ? '<a class="btn-secondary location-card__action" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(loc.mapQuery) + '" target="_blank" rel="noopener">' + MAP_PIN_ICON + ' View on Map</a>'
        : '<a class="btn-secondary location-card__action" href="tel:+14344228888">' + MAP_PIN_ICON + ' Call for Directions</a>';

      card.innerHTML =
        '<h3 class="location-card__name">' + loc.name + '</h3>' +
        '<p class="location-card__address">' + loc.address + '</p>' +
        '<table class="location-card__hours"><tbody>' + hoursRows + '</tbody></table>' +
        actionButton;

      grid.appendChild(card);
    });
  }

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
    renderLocations();
    initCardReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
