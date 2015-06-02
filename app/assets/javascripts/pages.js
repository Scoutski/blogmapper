$(document).ready(function() {
    function initialize() {
        var mapCanvas = document.getElementById('map-canvas');
        var mapOptions = {
            center: new google.maps.LatLng(-33.8702543, 151.2063811),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);
    }
    initialize();
});
