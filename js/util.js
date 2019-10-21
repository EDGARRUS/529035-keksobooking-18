'use strict';

window.bookingApp = {};

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var PIN_HEIGHT = 74;
  var PIN_MARKER_HEIGHT = 22;
  var DEBOUNCE_INTERVAL = 500;

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

    inactiveState: true,

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

    mouseDraggingElement: function (evt, handler, element) {

      var mapCity = document.querySelector('.map__pins');
      var mapCityWidth = mapCity.getBoundingClientRect().width;
      var mapCityHeight = mapCity.getBoundingClientRect().height;

      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY,
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY,
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        var elementStyleTop = element.offsetTop - shift.y;
        if (elementStyleTop <= 71) {
          elementStyleTop = 71;
        } else if (elementStyleTop >= 571) {
          elementStyleTop = 571;
        }

        var elementStyleLeft = element.offsetLeft - shift.x;
        if (elementStyleLeft <= -37) {
          elementStyleLeft = -37;
        } else if(elementStyleLeft >= 1163) {
          elementStyleLeft = 1163;
        }

        element.style.top = (elementStyleTop) + 'px';
        element.style.left = (elementStyleLeft) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },

    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },

    debounce: function (cb) {
      console.log('Пошел дибаунс');
      var lastTimeout = null;

      return function () {
        console.log('Пошла функция внутри дибаунса');
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    },
  };

})();
