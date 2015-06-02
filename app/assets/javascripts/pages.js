$(document).ready(function() {
    function initialize() {
        var mapCanvas = document.getElementById('map-canvas');
        var mapOptions = {
            center: new google.maps.LatLng(-33.8702543, 151.2063811),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);

        var myLatLng = new google.maps.LatLng(-33.877207, 151.1030065);

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            clickable: true
        });

        marker.info = new google.maps.InfoWindow({
            content: '<b>Hello World!</b>'
        });

        google.maps.event.addListener(marker, 'click', function() {
            marker.info.open(map, marker);
        });
    };
    initialize();
});
