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
  };

})();
