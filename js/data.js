'use strict';

(function () {

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

  window.bookingApp.data = {

    getHousesType: function (houseType) {
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
    },

    generateHouses: function (counter) {
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
        var locationX = Math.floor(Math.random() * 1200) - window.bookingApp.util.PIN_HEIGHT;
        var locationY = Math.floor(Math.random() * 500) + 130 - window.bookingApp.util.PIN_HEIGHT;


        houseInfo.push({
          author: {
            avatar: getHousesAvatar(i),
          },
          offer: {
            title: window.bookingApp.util.arrayRandElement(title),
            address: locationX + ', ' + locationY,
            price: Math.floor(Math.random() * 10000),
            type: window.bookingApp.util.arrayRandElement(type),
            rooms: Math.floor(Math.random() * 10),
            guests: Math.floor(Math.random() * 10),
            checkin: window.bookingApp.util.arrayRandElement(checkin),
            checkout: window.bookingApp.util.arrayRandElement(checkout),
            features: [window.bookingApp.util.arrayRandElement(features), window.bookingApp.util.arrayRandElement(features)],
            description: window.bookingApp.util.arrayRandElement(description),
            photos: getHousesPhoto(),
          },
          location: {
            x: locationX,
            y: locationY,
          },
        });
      }

      return houseInfo;
    },

  }
  ;


})();
