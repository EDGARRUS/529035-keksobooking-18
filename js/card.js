'use strict';

(function () {

  var getHousesType = function (houseType) {
    switch (houseType) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return 'Неизвестное жилье';
    }
  };

  var getCardTemplate = function () {
    return document.getElementById('card')
      .content
      .querySelector('.map__card');
  };

  var cardTemplate = getCardTemplate();

  var renderCard = function (cardInfo) {
    var cardElement = cardTemplate.cloneNode(true);

    var cardTitle = cardElement.querySelector('.popup__title');
    if (cardInfo.offer.title) {
      cardTitle.textContent = cardInfo.offer.title;
    } else {
      cardTitle.classList.add('visually-hidden');
    }

    var cardAddress = cardElement.querySelector('.popup__text--address');
    if (cardInfo.offer.address) {
      cardAddress.textContent = cardInfo.offer.address;
    } else {
      cardAddress.classList.add('visually-hidden');
    }

    var cardPrice = cardElement.querySelector('.popup__text--price');
    if (cardInfo.offer.price) {
      cardPrice.textContent = cardInfo.offer.price + '₽/ночь';
    } else {
      cardPrice.classList.add('visually-hidden');
    }

    var cardType = cardElement.querySelector('.popup__type');
    if (cardInfo.offer.type) {
      cardType.textContent = getHousesType(cardInfo.offer.type);
    } else {
      cardType.classList.add('visually-hidden');
    }

    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    if (cardInfo.offer.rooms || cardInfo.offer.guests) {
      cardCapacity.textContent = cardInfo.offer.rooms + ' комнаты для ' + cardInfo.offer.guests + ' гостей';
    } else {
      cardCapacity.classList.add('visually-hidden');
    }

    var cardTime = cardElement.querySelector('.popup__text--time');
    if (cardInfo.offer.checkin || cardInfo.offer.checkout) {
      cardTime.textContent = 'Заезд после ' + cardInfo.offer.checkin + ', выезд до ' + cardInfo.offer.checkout;
    } else {
      cardTime.classList.add('visually-hidden');
    }

    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardFeaturesElements = cardFeatures.querySelectorAll('li');

    if (cardInfo.offer.features) {
      cardInfo.offer.features.forEach(function (feature) {
        switch (feature) {
          case 'wifi':
            cardFeatures.querySelector('.popup__feature--wifi').textContent = feature;
            break;
          case 'dishwasher':
            cardFeatures.querySelector('.popup__feature--dishwasher').textContent = feature;
            break;
          case 'parking':
            cardFeatures.querySelector('.popup__feature--parking').textContent = feature;
            break;
          case 'washer':
            cardFeatures.querySelector('.popup__feature--washer').textContent = feature;
            break;
          case 'elevator':
            cardFeatures.querySelector('.popup__feature--elevator').textContent = feature;
            break;
          case 'conditioner':
            cardFeatures.querySelector('.popup__feature--conditioner').textContent = feature;
            break;
        }
      });

      for (var index = 0; index < cardFeaturesElements.length; index++) {
        if (cardFeaturesElements[index].innerText === '') {
          cardFeaturesElements[index].classList.add('visually-hidden');
        }
      }

    } else {
      cardFeatures.classList.add('visually-hidden');
    }

    var cardDescription = cardElement.querySelector('.popup__description');
    if (cardInfo.offer.description) {
      cardDescription.textContent = cardInfo.offer.description;
    } else {
      cardDescription.classList.add('visually-hidden');
    }

    var cardPhotosList = cardElement.querySelector('.popup__photos');
    var cardPhoto = cardPhotosList.querySelector('img');
    if (cardInfo.offer.photos) {
      cardPhoto.src = cardInfo.offer.photos[0];
      if (cardInfo.offer.photos.length > 1) {
        for (var i = 1; i < cardInfo.offer.photos.length; i++) {
          var PhotosElement = cardPhoto.cloneNode(true);
          PhotosElement.src = cardInfo.offer.photos[i];
          cardPhotosList.append(PhotosElement);
        }
      }
    } else {
      cardPhotosList.classList.add('visually-hidden');
    }

    var cardAvatar = cardElement.querySelector('.popup__avatar');
    if (cardInfo.author.avatar) {
      cardAvatar.src = cardInfo.author.avatar;
    } else {
      cardAvatar.classList.add('visually-hidden');
    }

    var popupClose = cardElement.querySelector('.popup__close');

    var closePopup = function () {
      window.bookingApp.pin.removeActiveStateOnPin();
      document.removeEventListener('keydown', window.bookingApp.pin.onPopupEscPress);
    };

    popupClose.addEventListener('click', closePopup);
    popupClose.addEventListener('keydown', function (evt) {
      window.bookingApp.util.isEnterEvent(evt, closePopup);
    });

    return cardElement;
  };

  var getMapFilters = function () {
    return document.querySelector('.map__filters-container');
  };

  var mapFilters = getMapFilters();

  window.bookingApp.card = {
    removeCard: function () {
      var cardActive = document.querySelector('.map__card');
      if (cardActive) {
        cardActive.remove();
      }
    },

    addCard: function (card) {
      var cardFragment = document.createDocumentFragment();
      cardFragment.appendChild(renderCard(card));
      mapFilters.before(cardFragment);
    },

  };


})();
