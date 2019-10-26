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
  };

  var getInputAddress = function () {
    return document.getElementById('address');
  };

  var mainPinXOnStart = mainPin.style.left;
  var mainPinYOnStart = mainPin.style.top;

  disableAllFieldsets(window.bookingApp.form.allFieldsets, true);
  disableAllFieldsets(window.bookingApp.form.mapFiltersForm, true);

  var inputAddress = getInputAddress();

  var onDraggingMainPinMouseMove = function () {
    inputAddress.value = getEndCoordinatePin();
  };

  var onDraggingMainPinMouseDown = function () {
    inputAddress.value = getEndCoordinatePin();
  };

  var draggingMainPin = function (evt) {
    window.bookingApp.util.inactiveState = false;
    window.bookingApp.util.mouseDraggingElement(evt, mainPin, mainPin);
    mainPin.addEventListener('mousemove', onDraggingMainPinMouseMove);
    mainPin.addEventListener('mousedown', onDraggingMainPinMouseDown);
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

  var successHandler = function (pinsArray) {
    pins = pinsArray;
    window.bookingApp.pin.addPins(pins);
  };

  var removeInactiveState = function () {
    window.bookingApp.pin.pinsList.classList.remove('map--faded');
    window.bookingApp.form.mapFiltersForm.classList.remove('ad-form--disabled');
    window.bookingApp.form.addForm.classList.remove('ad-form--disabled');
    disableAllFieldsets(window.bookingApp.form.allFieldsets, false);
    disableAllFieldsets(window.bookingApp.form.mapFiltersForm, false);
    inputAddress.value = getEndCoordinatePin();
    window.bookingApp.backend.load(successHandler, window.bookingApp.util.errorHandler);
  };

  var onMainPinMouseDownAtStart = function () {
    removeInactiveState();
    mainPin.removeEventListener('mousedown', onMainPinMouseDownAtStart);
    mainPin.removeEventListener('keydown', onMainPinKeyDownAtStart);
  };

  var onMainPinKeyDownAtStart = function (evt) {
    if (evt.keyCode === window.bookingApp.util.ENTER_KEYCODE) {
      removeInactiveState();
      mainPin.removeEventListener('mousedown', onMainPinMouseDownAtStart);
      mainPin.removeEventListener('keydown', onMainPinKeyDownAtStart);
    }
  };

  mainPin.addEventListener('mousedown', onMainPinMouseDownAtStart);
  mainPin.addEventListener('keydown', onMainPinKeyDownAtStart);
  mainPin.addEventListener('mousedown', draggingMainPin);
  inputAddress.value = getCenterPinAtStart();

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

  var getPriceMin = function (value) {
    switch (value) {
      case 'middle':
        return 10000;
      case 'low':
        return 0;
      case 'high':
        return 50000;
      default:
        return 0;
    }
  };

  var getPriceMax = function (value) {
    switch (value) {
      case 'middle':
        return 50000;
      case 'low':
        return 10000;
      case 'high':
        return Infinity;
      default:
        return 0;
    }
  };

  window.bookingApp.map = {
    returnToInactiveStateOnPage: function () {
      window.bookingApp.pin.pinsList.classList.add('map--faded');
      window.bookingApp.form.mapFiltersForm.classList.add('ad-form--disabled');
      window.bookingApp.form.addForm.classList.add('ad-form--disabled');
      disableAllFieldsets(window.bookingApp.form.allFieldsets, true);
      window.bookingApp.form.mapFiltersForm.reset();
      disableAllFieldsets(window.bookingApp.form.mapFiltersForm, true);

      mainPinReturnToInactiveState();

      window.bookingApp.util.inactiveState = true;
    },
  };

  var onChangeFilter = function () {
    var filterPins = pins.filter(function (pinElem) {

      var allPins = document.querySelectorAll('.map__pin');
      allPins.forEach(function (pinElement) {
        if (!pinElement.classList.contains('map__pin--main')) {
          pinElement.remove();
        }
      });

      window.bookingApp.card.removeCard();

      if (
        (filterForm.housingType.value === 'any' || pinElem.offer.type === filterForm.housingType.value) &&
        (filterForm.housingRooms.value === 'any' || pinElem.offer.rooms === parseInt(filterForm.housingRooms.value, 10)) &&
        (filterForm.housingPrice.value === 'any' || (getPriceMin(filterForm.housingPrice.value) <= parseInt(pinElem.offer.price, 10) && parseInt(pinElem.offer.price, 10) <= getPriceMax(filterForm.housingPrice.value))) &&
        (filterForm.housingGuests.value === 'any' || pinElem.offer.guests === parseInt(filterForm.housingGuests.value, 10)) &&
        (!filterForm.filterWifi.checked || pinElem.offer.features.some(function (element) {
          return element === filterForm.filterWifi.value;
        })) &&
        (!filterForm.filterDishwasher.checked || pinElem.offer.features.some(function (element) {
          return element === filterForm.filterDishwasher.value;
        })) &&
        (!filterForm.filterParking.checked || pinElem.offer.features.some(function (element) {
          return element === filterForm.filterParking.value;
        })) &&
        (!filterForm.filterWasher.checked || pinElem.offer.features.some(function (element) {
          return element === filterForm.filterWasher.value;
        })) &&
        (!filterForm.filterElevator.checked || pinElem.offer.features.some(function (element) {
          return element === filterForm.filterElevator.value;
        })) &&
        (!filterForm.filterConditioner.checked || pinElem.offer.features.some(function (element) {
          return element === filterForm.filterConditioner.value;
        }))

      ) {
        return true;
      }

      return false;

    });

    window.bookingApp.pin.addPins(filterPins);
  };

  filterForm.housingType.addEventListener('change', function () {
    window.bookingApp.util.debounce(onChangeFilter)();
  });
  filterForm.housingPrice.addEventListener('change', function () {
    window.bookingApp.util.debounce(onChangeFilter)();
  });
  filterForm.housingRooms.addEventListener('change', function () {
    window.bookingApp.util.debounce(onChangeFilter)();
  });
  filterForm.housingGuests.addEventListener('change', function () {
    window.bookingApp.util.debounce(onChangeFilter)();
  });
  filterForm.filterWifi.addEventListener('change', function () {
    window.bookingApp.util.debounce(onChangeFilter)();
  });
  filterForm.filterDishwasher.addEventListener('change', function () {
    window.bookingApp.util.debounce(onChangeFilter)();
  });
  filterForm.filterParking.addEventListener('change', function () {
    window.bookingApp.util.debounce(onChangeFilter)();
  });
  filterForm.filterWasher.addEventListener('change', function () {
    window.bookingApp.util.debounce(onChangeFilter)();
  });
  filterForm.filterElevator.addEventListener('change', function () {
    window.bookingApp.util.debounce(onChangeFilter)();
  });
  filterForm.filterConditioner.addEventListener('change', function () {
    window.bookingApp.util.debounce(onChangeFilter)();
  });

})();
