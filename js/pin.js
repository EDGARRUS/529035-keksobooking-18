'use strict';

(function () {

  var getPinList = function () {
    return document.querySelector('.map');
  };

  var pinsList = getPinList();

  var getPinTemplate = function () {
    return document.getElementById('pin')
      .content
      .querySelector('.map__pin');
  };

  var pinTemplate = getPinTemplate();

  var renderPin = function (pinData) {
    if (pinData.offer) {
      var pinElement = pinTemplate.cloneNode(true);
      var pinImage = pinElement.querySelector('img');
      pinImage.setAttribute('alt', pinData.offer.title);
      pinImage.setAttribute('src', pinData.author.avatar);
      pinElement.style.left = pinData.location.x + 'px';
      pinElement.style.top = pinData.location.y + 'px';

      pinElement.addEventListener('click', removeActiveStateOnPin);

      pinElement.addEventListener('click', function () {
        if (!pinElement.classList.contains('map__pin--active')) {
          window.bookingApp.card.addCard(pinData);
          pinElement.classList.add('map__pin--active');
          document.addEventListener('keydown', window.bookingApp.pin.onPopupEscPress);
        }
      });

      return pinElement;
    } else {
      return '';
    }
  };


  var removeActiveClassOnPin = function () {
    var pinElementActive = document.querySelector('.map__pin--active');
    if (pinElementActive) {
      pinElementActive.classList.remove('map__pin--active');
    }
  };

  var removeActiveStateOnPin = function () {
    window.bookingApp.card.removeCard();
    removeActiveClassOnPin();
  };

  window.bookingApp.pin = {

    onPopupEscPress: function (evt) {
      window.bookingApp.util.isEscEvent(evt, removeActiveStateOnPin);
    },

    removeActiveStateOnPin: function () {
      removeActiveStateOnPin();
    },

    pinsList: pinsList,

    addPins: function (pinsArray) {
      var numberOfPins = 5;

      var pinFragment = document.createDocumentFragment();
      if (pinsArray.length < numberOfPins) {
        numberOfPins = pinsArray.length;
      }

      for (var i = 0; i < numberOfPins; i++) {
        pinFragment.appendChild(renderPin(pinsArray[i]));
      }

      pinsList.appendChild(pinFragment);
    },
  };

})();
