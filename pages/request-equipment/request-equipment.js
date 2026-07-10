// All Blessings Flow — Request Equipment form progressive disclosure (design refinement pass, 2026-07-05)
(function () {
  function init() {
    var categorySelect = document.getElementById('req-category');
    var bedsLiftFields = document.getElementById('req-beds-lift-fields');
    var specificItemField = document.getElementById('req-specific-item-field');
    if (!categorySelect || !bedsLiftFields || !specificItemField) return;

    function update() {
      var value = categorySelect.value;
      var isBedsLift = value === 'Bed or Lift (hospital bed, patient lift, bed rails)';
      var hasCategory = value !== '' && value !== 'Not sure / other';

      bedsLiftFields.hidden = !isBedsLift;
      specificItemField.hidden = !hasCategory;

      // Only require the beds/lift follow-up fields when that group is actually visible
      var weightCapacity = document.getElementById('req-weight-capacity');
      var roomAccess = document.getElementById('req-room-access');
      if (weightCapacity) weightCapacity.required = isBedsLift;
      if (roomAccess) roomAccess.required = isBedsLift;
    }

    categorySelect.addEventListener('change', update);
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
