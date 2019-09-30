'use strict';

var PIN_HEIGHT = 65;

var arrayRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getHousesPhoto = function () {
  var allHousesPhoto = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var rand = Math.floor(Math.random() * allHousesPhoto.length);
  return allHousesPhoto.slice(rand);
};

var getHousesAvatar = function (index) {
  return 'img/avatars/user0' + index + '.png';
};

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

var generateHouses = function (counter) {
  var type = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  var title = [
    'Luxury Apart',
    'Good flat',
    'My dear home',
    'Great place',
    'Wonderful house',
    'Gold palace',
    'Very cool home',
    'Cheap flat in center'
  ];
  var description = [
    'Прекрасное место для отдыха',
    'Вы полюбите это место как свой дом',
    'Очень дешево и сердито',
    'Вы не заходите уезжать из моего дома',
    'Приезжай сейчас и я дам скидку 10%!',
    'Хочешь красиво жить? Бронируй мое жилье',
    'Красивый вид из окон на море',
    'Квартира в самом центре города!'
  ];
  var checkin = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var checkout = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var houseInfo = [];

  for (var i = 1; i <= counter; i++) {
    var locationX = Math.floor(Math.random() * 1200) - PIN_HEIGHT;
    var locationY = Math.floor(Math.random() * 500) + 130 - PIN_HEIGHT;


    houseInfo.push({
      author: {
        avatar: getHousesAvatar(i),
      },
      offer: {
        title: arrayRandElement(title),
        address: locationX + ', ' + locationY,
        price: Math.floor(Math.random() * 10000),
        type: arrayRandElement(type),
        rooms: Math.floor(Math.random() * 10),
        guests: Math.floor(Math.random() * 10),
        checkin: arrayRandElement(checkin),
        checkout: arrayRandElement(checkout),
        features: [arrayRandElement(features), arrayRandElement(features)],
        description: arrayRandElement(description),
        photos: getHousesPhoto(),
      },
      location: {
        x: locationX,
        y: locationY,
      },
    });
  }

  return houseInfo;
};

var allHouses = generateHouses(8);

var getPinList = function () {
  return document.querySelector('.map');
};

var pinsList = getPinList();
pinsList.classList.remove('map--faded');

var getPinTemplate = function () {
  return document.getElementById('pin')
    .content
    .querySelector('.map__pin');
};

var pinTemplate = getPinTemplate();

var renderPin = function (pinData) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinImage.setAttribute('alt', pinData.offer.title);
  pinImage.setAttribute('src', pinData.author.avatar);
  pinElement.style.left = pinData.location.x + 'px';
  pinElement.style.top = pinData.location.y + 'px';

  return pinElement;
};

var addPins = function (pinsArray) {
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < pinsArray.length; i++) {
    pinFragment.appendChild(renderPin(pinsArray[i]));
  }
  pinsList.appendChild(pinFragment);
};

addPins(allHouses);

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
  cardType.textContent = getHousesType(cardInfo.offer.type);

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

  return cardElement;
};

var getMapFilters = function () {
  return document.querySelector('.map__filters-container');
};

var mapFilters = getMapFilters();

var addCard = function (card) {
  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(renderCard(card));
  mapFilters.before(cardFragment);
};

addCard(allHouses[0]);


