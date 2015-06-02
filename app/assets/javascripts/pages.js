$(document).ready(function() {
    function initialize() {
        if ($('#map-canvas').length === 0) {
            return;
        }
        var mapCanvas = document.getElementById('map-canvas');
        var mapOptions = {
            center: new google.maps.LatLng(-33.8702543, 151.2063811),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);


        for (var i = 0; i < gon.posts.length; i++) {
            for (var j = 0; j < gon.blogs.length; j++) {
                if (gon.blogs[j].id === gon.posts[i].blog_id) {
                    var image = {
                        url: gon.blogs[j].marker_url,
                        scaledSize: new google.maps.Size(25, 25)
                    }
                    break;
                };
            };

            var myLatLng = new google.maps.LatLng(gon.posts[i].latitude, gon.posts[i].longitude);

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                animation: google.maps.Animation.DROP,
                clickable: true,
                icon: image
            });

            marker.info = new google.maps.InfoWindow({
                content: '<b>' + gon.posts[i].restaurant_name + '</b><br>' +
                    gon.posts[i].restaurant_loc + '<br>' +
                    '<a href="' + gon.posts[i].post_url + '">Original Post: ' + gon.posts[i].name +'</a>'
            });

            google.maps.event.addListener(marker, 'click', function() {
                marker.info.open(map, this);
            });
        };
    };
    initialize();
});
