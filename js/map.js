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

  var mainPinXOnStart = mainPin.style.left;
  var mainPinYOnStart = mainPin.style.top;

  window.bookingApp.form.allFieldsets = disableAllFieldsets(window.bookingApp.form.allFieldsets, true);

  var inputAddress = getInputAddress();

  var draggingMainPin = function (evt) {
    window.bookingApp.util.inactiveState = false;
    window.bookingApp.util.mouseDraggingElement(evt, mainPin, mainPin);
    mainPin.addEventListener('mousemove', function () {
      inputAddress.value = getEndCoordinatePin();
    });
    mainPin.addEventListener('mousedown', function () {
      inputAddress.value = getEndCoordinatePin();
    });
  };

  var mainPinReturnToInactiveState = function () {
    mainPin.addEventListener('mousedown', onMainPinMouseDownAtStart);
    mainPin.addEventListener('keydown', onMainPinKeyDownAtStart);
    var allPins = document.querySelectorAll('.map__pin');
    allPins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      } else {
        mainPin.style.left = mainPinXOnStart;
        mainPin.style.top = mainPinYOnStart;
      }
    });

    var activeCard = document.querySelector('.map__card');
    if (activeCard) {
      activeCard.remove();
    }
    inputAddress.value = getCenterPinAtStart();
  };

  var pins = [];

  var successHandler = function (pinsArray, counter) {
    pins = pinsArray;
    window.bookingApp.pin.addPins(pins, counter);
  };

  var removeInactiveState = function () {
    window.bookingApp.pin.pinsList.classList.remove('map--faded');
    window.bookingApp.form.mapFiltersForm.classList.remove('ad-form--disabled');
    window.bookingApp.form.addForm.classList.remove('ad-form--disabled');
    disableAllFieldsets(window.bookingApp.form.allFieldsets, false);
    inputAddress.value = getEndCoordinatePin();
    window.bookingApp.backend.load(successHandler, window.bookingApp.util.errorHandler);
  };

  var onMainPinMouseDownAtStart = function () {
    removeInactiveState();
    document.removeEventListener('mousedown', onMainPinMouseDownAtStart);

  };

  var onMainPinKeyDownAtStart = function (evt) {
    if (evt.keyCode === window.bookingApp.util.ENTER_KEYCODE) {
      removeInactiveState();
      document.removeEventListener('keydown', onMainPinKeyDownAtStart);

    }
  };

  mainPin.addEventListener('mousedown', onMainPinMouseDownAtStart);
  mainPin.addEventListener('keydown', onMainPinKeyDownAtStart);
  mainPin.addEventListener('mousedown', draggingMainPin);
  inputAddress.value = getCenterPinAtStart();

  window.bookingApp.map = {
    returnToInactiveStateOnPage: function () {
      window.bookingApp.pin.pinsList.classList.add('map--faded');
      window.bookingApp.form.mapFiltersForm.classList.add('ad-form--disabled');
      window.bookingApp.form.addForm.classList.add('ad-form--disabled');
      disableAllFieldsets(window.bookingApp.form.allFieldsets, true);

      mainPinReturnToInactiveState();

      window.bookingApp.util.inactiveState = true;
    },
  };

  var filterForm = {
    housingType: document.getElementById('housing-type'),
    housingPrice: document.getElementById('housing-price'),
    housingRooms: document.getElementById('housing-rooms'),
    housingGuests: document.getElementById('housing-guests'),
    filterWifi: document.getElementById('filter-wifi'),
    filterDishwasher: document.getElementById('filter-dishwasher'),
    filterParking: document.getElementById('filter-parking'),
    filterWasher: document.getElementById('filter-washer'),
    filterElevator: document.getElementById('filter-elevator'),
    filterConditioner: document.getElementById('filter-conditioner'),
  };

  filterForm.housingType.addEventListener('change', function () {
    var filterValue = filterForm.housingType.value;

    var allPins = document.querySelectorAll('.map__pin');
    allPins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });

    if (filterForm.housingType.value === 'any') {
      window.bookingApp.pin.addPins(pins);
    } else {
      var filterPins = pins.filter(function (pin) {
        if (pin.offer.type === filterValue) {
          return true;
        }
      });

      window.bookingApp.pin.addPins(filterPins);
    }

  });

})();
