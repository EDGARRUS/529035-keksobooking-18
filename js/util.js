'use strict';

window.bookingApp = {};

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var PIN_HEIGHT = 65;
  var PIN_MARKER_HEIGHT = 22;

  window.bookingApp.util = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_MARKER_HEIGHT: PIN_MARKER_HEIGHT,
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.bookingApp.util.ESC_KEYCODE) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === window.bookingApp.util.ENTER_KEYCODE) {
        action();
      }
    },

    arrayRandElement: function (arr) {
      var rand = Math.floor(Math.random() * arr.length);
      return arr[rand];
    },

    flat: {
      name: 'flat',
      minPrice: 1000,
      placeholderPrice: '1000',
    },

    bungalo: {
      name: 'bungalo',
      minPrice: 0,
      placeholderPrice: '0',
    },

    house: {
      name: 'house',
      minPrice: 5000,
      placeholderPrice: '5000',
    },

    palace: {
      name: 'palace',
      minPrice: 10000,
      placeholderPrice: '10000',
    },
  };

})();
