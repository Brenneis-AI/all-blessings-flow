// All Blessings Flow — Volunteer form progressive disclosure (design refinement pass, 2026-07-05)
(function () {
  function init() {
    var roleSelect = document.getElementById('vol-role');
    var skillsField = document.getElementById('vol-skills-field');
    var pickupFields = document.getElementById('vol-pickup-fields');
    if (!roleSelect || !skillsField || !pickupFields) return;

    function update() {
      var value = roleSelect.value;
      skillsField.hidden = value !== 'Repair Assistance';
      pickupFields.hidden = value !== 'Pickup & Delivery';
    }

    roleSelect.addEventListener('change', update);
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
