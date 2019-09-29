'use strict';

var PIN_HEIGHT = 65;

function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

var generateHouses = function (counter) {
  var type = ['palace', 'flat', 'house', 'bungalo'];
  var title = ['Luxury Apart', 'Good flat', 'My dear home', 'Great place', 'Wonderful house', 'Gold palace', 'Very cool home', 'Cheap flat in center'];
  var description = ['Прекрасное место для отдыха', 'Вы полюбите это место как свой дом', 'Очень дешево и сердито', 'Вы не заходите уезжать из моего дома', 'Приезжай сейчас и я дам скидку 10%!', 'Хочешь красиво жить? Бронируй мое жилье', 'Красивый вид из окон на море', 'Квартира в самом центре города!'];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var houseInfo = [];

  for (var i = 1; i <= counter; i++) {

    var locationX = Math.floor(Math.random() * 1200) - PIN_HEIGHT;
    var locationY = Math.floor(Math.random() * 500) + 130 - PIN_HEIGHT;

    houseInfo.push({
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
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
        features: arrayRandElement(features),
        description: arrayRandElement(description),
        photos: 'http://o0.github.io/assets/images/tokyo/hotel' + counter + '.jpg'
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }

  return houseInfo;
};

var allHouses = generateHouses(8);

var pinsList = document.querySelector('.map');
pinsList.classList.remove('map--faded');

var pinTemplate = document.getElementById('pin')
  .content
  .querySelector('.map__pin');

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
