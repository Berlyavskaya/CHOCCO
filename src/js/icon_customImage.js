;ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [55.75, 37.60],
            zoom: 13
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark1 = new ymaps.Placemark([55.75893090207855,37.583082952087416], {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Первая'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'icons/map-ikon.gif',
            // Размеры метки.
            iconImageSize: [46, 57],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset:  [-5, -38]
        }),
        myPlacemark2 = new ymaps.Placemark([55.74980682163106,37.604111470764174], {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Вторая'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'icons/map-ikon.gif',
            iconImageSize: [46, 57],
            iconImageOffset:  [-5, -38]
        }),
        myPlacemark3 = new ymaps.Placemark([55.7581807270031,37.62402419049073], {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Третья'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'icons/map-ikon.gif',
            iconImageSize: [46, 57],
            iconImageOffset:  [-5, -38]
        }),
        myPlacemark4 = new ymaps.Placemark([55.74331737582376,37.58082301516784], {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Четвертая'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'icons/map-ikon.gif',
            iconImageSize: [46, 57],
            iconImageOffset:  [-5, -38]
        });
    myMap.geoObjects
    .add(myPlacemark1)
    .add(myPlacemark2)
    .add(myPlacemark3)
    .add(myPlacemark4);
    myMap.behaviors.disable('scrollZoom');
});