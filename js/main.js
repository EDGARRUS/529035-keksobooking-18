'use strict';

var PIN_HEIGHT = 65;
var PIN_MARKER_HEIGHT = 22;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var isEscEvent = function (evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
};

var isEnterEvent = function (evt, action) {
  if (evt.keyCode === ENTER_KEYCODE) {
    action();
  }
};

var arrayRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var onPopupEscPress = function (evt) {
  isEscEvent(evt, removeActiveStateOnPin);
};

var getHousesPhoto = function () {
  var allHousesPhoto = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
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
    'bungalo',
  ];
  var title = [
    'Luxury Apart',
    'Good flat',
    'My dear home',
    'Great place',
    'Wonderful house',
    'Gold palace',
    'Very cool home',
    'Cheap flat in center',
  ];
  var description = [
    'Прекрасное место для отдыха',
    'Вы полюбите это место как свой дом',
    'Очень дешево и сердито',
    'Вы не заходите уезжать из моего дома',
    'Приезжай сейчас и я дам скидку 10%!',
    'Хочешь красиво жить? Бронируй мое жилье',
    'Красивый вид из окон на море',
    'Квартира в самом центре города!',
  ];
  var checkin = [
    '12:00',
    '13:00',
    '14:00',
  ];
  var checkout = [
    '12:00',
    '13:00',
    '14:00',
  ];
  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
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

var removeCard = function () {
  var cardActive = document.querySelector('.map__card');
  if (cardActive) {
    cardActive.remove();
  }
};

var removeActiveClassOnPin = function () {
  var pinElementActive = document.querySelector('.map__pin--active');
  if (pinElementActive) {
    pinElementActive.classList.remove('map__pin--active');
  }
};

var removeActiveStateOnPin = function () {
  removeCard();
  removeActiveClassOnPin();
};

var renderPin = function (pinData) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinImage.setAttribute('alt', pinData.offer.title);
  pinImage.setAttribute('src', pinData.author.avatar);
  pinElement.style.left = pinData.location.x + 'px';
  pinElement.style.top = pinData.location.y + 'px';

  pinElement.addEventListener('click', removeActiveStateOnPin);

  pinElement.addEventListener('click', function () {
    if (!pinElement.classList.contains('map__pin--active')) {
      addCard(pinData);
      pinElement.classList.add('map__pin--active');
      document.addEventListener('keydown', onPopupEscPress);
    }
  });

  return pinElement;
};

var addPins = function (pinsArray) {
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < pinsArray.length; i++) {
    pinFragment.appendChild(renderPin(pinsArray[i]));
  }
  pinsList.appendChild(pinFragment);
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

  var popupClose = cardElement.querySelector('.popup__close');

  var closePopup = function () {
    removeActiveStateOnPin();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  popupClose.addEventListener('click', closePopup);
  popupClose.addEventListener('keydown', function (evt) {
    isEnterEvent(evt, closePopup());
  });

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

  var allHouses = generateHouses(8);
  addPins(allHouses);
};

var onMainPinKeyDownAtStart = function (evt) {

  if (evt.keyCode === ENTER_KEYCODE) {

    pinsList.classList.remove('map--faded');
    mapFiltersForm.classList.remove('ad-form--disabled');
    addForm.classList.remove('ad-form--disabled');
    disableAllFieldsets(allFieldsets, false);

    inputAddress.value = getEndCoordinatePin();

    var allHouses = generateHouses(8);
    addPins(allHouses);
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
    case 'bungalo':
      price.setAttribute('min', '0');
      price.setAttribute('placeholder', '0');
      break;
    case 'flat':
      price.setAttribute('min', '1000');
      price.setAttribute('placeholder', '1000');
      break;
    case 'house':
      price.setAttribute('min', '5000');
      price.setAttribute('placeholder', '5000');
      break;
    case 'palace':
      price.setAttribute('min', '10000');
      price.setAttribute('placeholder', '10000');
      break;
    default:
      typeHome.setCustomValidity('Укажите корректный тип жилья');
  }
};

var validatePrice = function () {
  if (typeHome.value === 'bungalo' && price.value < 0) {
    price.setCustomValidity('Укажите положительную цену');
  } else if (typeHome.value === 'flat' && price.value <= 1000) {
    price.setCustomValidity('Укажите цену не менее 1000 рублей');
  } else if (typeHome.value === 'house' && price.value <= 5000) {
    price.setCustomValidity('Укажите цену не менее 5000 рублей');
  } else if (typeHome.value === 'palace' && price.value <= 10000) {
    price.setCustomValidity('Укажите цену не менее 10000 рублей');
  } else {
    price.setCustomValidity('');
  }
};

var validateTypeHome = function () {
  if (typeHome.value !== 'bungalo' && typeHome.value !== 'flat' && typeHome.value !== 'house' && typeHome.value !== 'palace') {
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
