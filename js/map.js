'use strict';

(function () {

  var getMainPin = function () {
    return document.querySelector('.map__pin--main');
  };

  var mainPin = getMainPin();

  var getCenterPinAtStart = function () {
    return getCenterXPin() + ', ' + getCenterYPin();
  };

  var getCenterXPin = function () {
    return Math.floor(parseInt(mainPin.style.left.slice(0, -2), 10) + window.bookingApp.util.PIN_HEIGHT / 2);
  };

  var getCenterYPin = function () {
    return Math.floor(parseInt(mainPin.style.top.slice(0, -2), 10) + window.bookingApp.util.PIN_HEIGHT / 2);
  };

  var getEndCoordinatePin = function () {
    return getCenterXPin() + ', ' + (getCenterYPin() + window.bookingApp.util.PIN_MARKER_HEIGHT);
  };

  var disableAllFieldsets = function (fieldSets, isDisabled) {
    var disabledFieldSets = Array.from(fieldSets).slice();
    for (var i = 0; i < disabledFieldSets.length; i++) {
      disabledFieldSets[i].disabled = isDisabled;
    }

    return disabledFieldSets;
  };

  var getInputAddress = function () {
    return document.getElementById('address');
  };

  window.bookingApp.form.allFieldsets = disableAllFieldsets(window.bookingApp.form.allFieldsets, true);

  var inputAddress = getInputAddress();
  inputAddress.value = getCenterPinAtStart();

  var onMainPinMouseDownAtStart = function () {
    window.bookingApp.pin.pinsList.classList.remove('map--faded');
    window.bookingApp.form.mapFiltersForm.classList.remove('ad-form--disabled');
    window.bookingApp.form.addForm.classList.remove('ad-form--disabled');
    disableAllFieldsets(window.bookingApp.form.allFieldsets, false);

    inputAddress.value = getEndCoordinatePin();

    var allHouses = window.bookingApp.data.generateHouses(8);
    window.bookingApp.pin.addPins(allHouses);
  };

  var onMainPinKeyDownAtStart = function (evt) {

    if (evt.keyCode === window.bookingApp.util.ENTER_KEYCODE) {

      window.bookingApp.pin.pinsList.classList.remove('map--faded');
      window.bookingApp.form.mapFiltersForm.classList.remove('ad-form--disabled');
      window.bookingApp.form.addForm.classList.remove('ad-form--disabled');
      disableAllFieldsets(window.bookingApp.form.allFieldsets, false);

      inputAddress.value = getEndCoordinatePin();

      var allHouses = window.bookingApp.data.generateHouses(8);
      window.bookingApp.pin.addPins(allHouses);
    }
  };

  mainPin.addEventListener('mousedown', onMainPinMouseDownAtStart);
  mainPin.addEventListener('keydown', onMainPinKeyDownAtStart);
})();
