$(document).ready(function () {

    let myMap;

    ymaps.ready(mapInit);

    // минимальные координаты
    const minX = 54.720046, minY = 55.934694;
    // максимальный ход по x и y координат
    const x = 19769, y = 55447;
    function getRandomCoordinate() {
        let stepX = Math.floor(Math.random() * x) / 1000000;
        let stepY = Math.floor(Math.random() * y) / 1000000;
        return [minX + stepX, minY + stepY];
    }

    function mapInit() {
        myMap = new ymaps.Map("map", {
            center: [54.735128, 55.958673],
            controls: ['zoomControl'],
            zoom: 12
        });

        myMap.behaviors.disable('scrollZoom');

        let randomCoordinatesArray = [...Array(4)].map(getRandomCoordinate);
        console.log(randomCoordinatesArray);
        

        randomCoordinatesArray.forEach(coordinates => {
            let placemark = new ymaps.Placemark(coordinates, { hintContent: 'Mr.Burger' }, {
                iconLayout: 'default#image',
                iconImageHref: 'icons/map-marker.svg',
                iconImageOffset: [-24, -24],
                iconContentOffset: [15, 15]
            });
            myMap.geoObjects.add(placemark);
        });

    }

});