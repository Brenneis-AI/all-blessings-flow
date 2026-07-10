// All Blessings Flow — Donate Equipment form progressive disclosure (design refinement pass, 2026-07-05)
(function () {
  function init() {
    var pickupSelect = document.getElementById('don-pickup');
    var pickupFields = document.getElementById('don-pickup-fields');
    var dropoffField = document.getElementById('don-dropoff-field');
    if (!pickupSelect || !pickupFields || !dropoffField) return;

    function update() {
      var value = pickupSelect.value;
      pickupFields.hidden = value !== 'Yes';
      dropoffField.hidden = value !== 'No';

      var pickupAddress = document.getElementById('don-pickup-address');
      if (pickupAddress) pickupAddress.required = value === 'Yes';
    }

    pickupSelect.addEventListener('change', update);
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
