'use strict';

var PIN_HEIGHT = 65;
var PIN_MARKER_HEIGHT = 22;
var ENTER_KEYCODE = 13;

var getPinList = function () {
  return document.querySelector('.map');
};

var pinsList = getPinList();

var getAddForm = function () {
  return document.querySelector('.ad-form');
};

var getMapFiltersForm = function () {
  return document.querySelector('.map__filters');
};

var getAllFieldsets = function () {
  return document.querySelectorAll('fieldset');
};

var addForm = getAddForm();
var mapFiltersForm = getMapFiltersForm();
var allFieldsets = getAllFieldsets();

var disableAllFieldsets = function (fieldSets, isDisabled) {
  var disabledFieldSets = Array.from(fieldSets).slice();
  for (var i = 0; i < disabledFieldSets.length; i++) {
    disabledFieldSets[i].disabled = isDisabled;
  }

  return disabledFieldSets;
};

var getMainPin = function () {
  return document.querySelector(' .map__pin--main');
};

var getCenterXPin = function () {
  return Math.floor(parseInt(mainPin.style.left.slice(0, -2), 10) + PIN_HEIGHT / 2);
};

var getCenterYPin = function () {
  return Math.floor(parseInt(mainPin.style.top.slice(0, -2), 10) + PIN_HEIGHT / 2);
};

var getCenterPinAtStart = function () {
  return getCenterXPin() + ', ' + getCenterYPin();
};

var onMainPinMouseDownAtStart = function () {
  pinsList.classList.remove('map--faded');
  mapFiltersForm.classList.remove('ad-form--disabled');
  addForm.classList.remove('ad-form--disabled');
  disableAllFieldsets(allFieldsets, false);

  inputAddress.value = getEndCoordinatePin();
};

var onMainPinKeyDownAtStart = function (evt) {

  if (evt.keyCode === ENTER_KEYCODE) {

    pinsList.classList.remove('map--faded');
    mapFiltersForm.classList.remove('ad-form--disabled');
    addForm.classList.remove('ad-form--disabled');
    disableAllFieldsets(allFieldsets, false);

    inputAddress.value = getEndCoordinatePin();

  }
};

var getInputAddress = function () {
  return document.getElementById('address');
};

var disabledFieldSets = disableAllFieldsets(allFieldsets, true);
allFieldsets = disabledFieldSets;

var mainPin = getMainPin();
mainPin.addEventListener('mousedown', onMainPinMouseDownAtStart);
mainPin.addEventListener('keydown', onMainPinKeyDownAtStart);

var inputAddress = getInputAddress();

var getEndCoordinatePin = function () {
  return getCenterXPin() + ', ' + (getCenterYPin() + PIN_MARKER_HEIGHT);
};

inputAddress.value = getCenterPinAtStart();

var getinputRoomNumber = function () {
  return document.getElementById('room_number');
};

var getinputCapacity = function () {
  return document.getElementById('capacity');
};

var inputRoomNumber = getinputRoomNumber();
var inputCapacity = getinputCapacity();

var getCustomValidityMessage = function (roomNumber, capacity) {
  var message = '';

  if (roomNumber === 1 && capacity !== 1) {
    message = 'Здесь может проживать только 1 гость';
  } else if (roomNumber === 2 && (capacity > 2 || capacity === 0)) {
    message = 'Здесь могут проживать до 2 гостей';
  } else if (roomNumber === 3 && capacity === 0) {
    message = 'Здесь могут проживать от 1 до 3 гостей';
  } else if (roomNumber === 100 && capacity !== 0) {
    message = 'Здесь не могут проживать гости';
  } else {
    message = '';
  }

  return message;
};

var validateCapacity = function () {
  var inputCapacityValue = parseInt(inputCapacity.value, 10);
  var inputRoomNumberValue = parseInt(inputRoomNumber.value, 10);

  inputCapacity.setCustomValidity(getCustomValidityMessage(inputRoomNumberValue, inputCapacityValue));

  document.querySelector('.ad-form__submit').click();
};

inputCapacity.addEventListener('change', validateCapacity);
inputRoomNumber.addEventListener('change', validateCapacity);

addForm.addEventListener('submit', function (evt) {
  validateCapacity();
  if (!inputCapacity.checkValidity()) {
    evt.preventDefault();
  }
});
