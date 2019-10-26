'use strict';

(function () {

  var RESPONSE_SUCCESS = 200;
  var RESPONSE_TIMEOUT = 5000;

  window.bookingApp.backend = {
    load: function (onLoad, onError) {
      var urlGet = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status !== RESPONSE_SUCCESS) {
          onError('Статус ответа:' + xhr.status + ' ' + xhr.statusText);
        } else {
          onLoad(xhr.response);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за' + xhr.timeout + ' мс');
      });

      xhr.timeout = RESPONSE_TIMEOUT;

      xhr.open('GET', urlGet);
      xhr.send();

    },

    save: function (data, onLoad, onError) {
      var urlPost = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status !== RESPONSE_SUCCESS) {
          onError();
        } else {
          onLoad();
        }
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.addEventListener('timeout', function () {
        onError();
      });

      xhr.timeout = RESPONSE_TIMEOUT;

      xhr.open('POST', urlPost);
      xhr.send(data);
    },
  };


})();
