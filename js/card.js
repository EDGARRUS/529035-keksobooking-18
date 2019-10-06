'use strict';

(function () {

  var getCardTemplate = function () {
    return document.getElementById('card')
      .content
      .querySelector('.map__card');
  };

  var cardTemplate = getCardTemplate();

  var renderCard = function (cardInfo) {
    var cardElement = cardTemplate.cloneNode(true);

    var cardTitle = cardElement.querySelector('.popup__title');
    cardTitle.textContent = cardInfo.offer.title;

    var cardAddress = cardElement.querySelector('.popup__text--address');
    cardAddress.textContent = cardInfo.offer.address;

    var cardPrice = cardElement.querySelector('.popup__text--price');
    cardPrice.textContent = cardInfo.offer.price + '₽/ночь';

    var cardType = cardElement.querySelector('.popup__type');
    cardType.textContent = window.bookingApp.data.getHousesType(cardInfo.offer.type);

    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    cardCapacity.textContent = cardInfo.offer.rooms + ' комнаты для ' + cardInfo.offer.guests + ' гостей';

    var cardTime = cardElement.querySelector('.popup__text--time');
    cardTime.textContent = 'Заезд после ' + cardInfo.offer.checkin + ', выезд до ' + cardInfo.offer.checkout;

    var cardFeatures = cardElement.querySelector('.popup__features');
    cardFeatures.textContent = cardInfo.offer.features;

    var cardDescription = cardElement.querySelector('.popup__description');
    cardDescription.textContent = cardInfo.offer.description;

    var cardPhotosList = cardElement.querySelector('.popup__photos');
    var cardPhoto = cardPhotosList.querySelector('img');
    cardPhoto.src = cardInfo.offer.photos[0];
    if (cardInfo.offer.photos.length > 1) {
      for (var i = 1; i < cardInfo.offer.photos.length; i++) {
        var PhotosElement = cardPhoto.cloneNode(true);
        PhotosElement.src = cardInfo.offer.photos[i];
        cardPhotosList.append(PhotosElement);
      }
    }

    var cardAvatar = cardElement.querySelector('.popup__avatar');
    cardAvatar.src = cardInfo.author.avatar;

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
