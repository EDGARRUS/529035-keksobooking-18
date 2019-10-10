'use strict';

(function () {

  window.bookingApp.backend = {
    load: function (onLoad, onError) {
      var urlGet = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status !== 200) {
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

      xhr.timeout = 5000;

      xhr.open('GET', urlGet);
      xhr.send();

    },
  };


})();