'use strict';


(function () {

  var util = window.bookingApp.util;

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

    if (!inputCapacity.validity.valid) {
      document.querySelector('.ad-form__submit').click();
    }
  };

  inputCapacity.addEventListener('change', validateCapacity);
  inputRoomNumber.addEventListener('change', validateCapacity);

  var getTimeInInput = function () {
    return document.getElementById('timein');
  };

  var getTimeOutInput = function () {
    return document.getElementById('timeout');
  };

  var timein = getTimeInInput();
  var timeout = getTimeOutInput();

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  var validateTime = function () {
    if (timein.value !== timeout.value) {
      timein.setCustomValidity('Укажите корректное время');
    }
  };

  var getTypeHomeInput = function () {
    return document.getElementById('type');
  };

  var typeHome = getTypeHomeInput();

  var getPriceInput = function () {
    return document.getElementById('price');
  };

  var price = getPriceInput();

  var changeMinPrice = function () {
    switch (typeHome.value) {
      case util.bungalo.name:
        price.setAttribute('min', util.bungalo.minPrice);
        price.setAttribute('placeholder', util.bungalo.placeholderPrice);
        break;
      case util.flat.name:
        price.setAttribute('min', util.flat.minPrice);
        price.setAttribute('placeholder', util.flat.placeholderPrice);
        break;
      case util.house.name:
        price.setAttribute('min', util.house.minPrice);
        price.setAttribute('placeholder', util.house.placeholderPrice);
        break;
      case util.palace.name:
        price.setAttribute('min', util.palace.minPrice);
        price.setAttribute('placeholder', util.palace.placeholderPrice);
        break;
      default:
        typeHome.setCustomValidity('Укажите корректный тип жилья');
    }
  };

  var validatePrice = function () {
    if (typeHome.value === util.bungalo.name && price.value < util.bungalo.minPrice) {
      price.setCustomValidity('Укажите положительную цену');
    } else if (typeHome.value === util.flat.name && price.value <= util.flat.minPrice) {
      price.setCustomValidity('Укажите цену не менее 1000 рублей');
    } else if (typeHome.value === util.house.name && price.value <= util.house.minPrice) {
      price.setCustomValidity('Укажите цену не менее 5000 рублей');
    } else if (typeHome.value === util.palace.name && price.value <= util.palace.minPrice) {
      price.setCustomValidity('Укажите цену не менее 10000 рублей');
    } else {
      price.setCustomValidity('');
    }
  };

  var validateTypeHome = function () {
    if (typeHome.value !== util.bungalo.name && typeHome.value !== util.flat.name && typeHome.value !== util.house.name && typeHome.value !== util.palace.name) {
      typeHome.setCustomValidity('Укажите корректный тип дома');
    } else {
      changeMinPrice();
      validatePrice();
    }
  };

  typeHome.addEventListener('change', validateTypeHome);
  price.addEventListener('input', validatePrice);

  addForm.addEventListener('submit', function (evt) {
    validateCapacity();
    validateTime();
    validateTypeHome();
    validatePrice();
    if (!inputCapacity.checkValidity()) {
      evt.preventDefault();
    }
  });

  window.bookingApp.form = {
    addForm: addForm,
    mapFiltersForm: mapFiltersForm,
    allFieldsets: allFieldsets,
  };

})();
