var slideExists = false;
var marker_array = [];
var prev_infowindow = false;

$(document).ready(function() {
    for (var h = 0; h < gon.blogs.length; h++) {

    };

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

        var infowindow;
        for (var i = 0; i < gon.posts.length; i++) {
            var relatedBlog;
            for (var j = 0; j < gon.blogs.length; j++) {
                if (gon.blogs[j].id === gon.posts[i].blog_id) {
                    var image = {
                        url: gon.blogs[j].marker_url,
                        scaledSize: new google.maps.Size(25, 25)
                    }
                    relatedBlog = gon.blogs[j];
                    break;
                };
            };

            var myLatLng = new google.maps.LatLng(gon.posts[i].latitude, gon.posts[i].longitude);

            var temp = relatedBlog.id + "";

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                animation: google.maps.Animation.DROP,
                clickable: true,
                icon: image,
                visible: true,
                group: temp,
                infoRel: gon.posts[i].name
            });

            marker_array.push(marker);

            var content = '<b>' +
                gon.posts[i].restaurant_name +
                '</b><br>' +
                relatedBlog.name +
                '<br>' +
                gon.posts[i].restaurant_loc +
                '<br>' +
                '<a href="' +
                gon.posts[i].post_url +
                '">Original Post: ' +
                gon.posts[i].name +
                '</a>';

            infowindow = new google.maps.InfoWindow();

            google.maps.event.addListener(marker, 'click', getInfoCallback(map, content));
        };
    };

    function getInfoCallback(map, content) {
        var infowindow = new google.maps.InfoWindow({
            content: content
        });
        return function() {
            if (prev_infowindow) {
                prev_infowindow.close();
            };
            prev_infowindow = infowindow;
            infowindow.setContent(content);
            infowindow.open(map, this);
        };
    };

    $('.button-group').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function() {
            if (slideExists === true) {
                $('.menu-slider').addClass('classless-div').removeClass('col-md-2').css('margin-top', '0px');
                $('.col-md-8').addClass('col-md-10').removeClass('col-md-8');
                clearContent();
                slideExists = false;
            } else {
                $('.menu-slider').addClass('col-md-2').removeClass('classless-div').css('margin-top', '60px');
                $('.col-md-10').addClass('col-md-8').removeClass('col-md-10');
                fillContent($(this).attr('data-id'));
                slideExists = true;
            };

            if ($(this).hasClass('is-checked')) {
                $(this).removeClass('is-checked');
            } else {
                $(this).addClass('is-checked');
            };
        });
    });

    $('.slide-test').on('click', function() {
        if (slideExists === false) {
            // $('.col-md-10').animate({
            //     left: "+=100"
            // })
            $('.menu-slider').addClass('col-md-2').removeClass('classless-div').css('margin-top', '60px');
            $('.col-md-10').addClass('col-md-8').removeClass('col-md-10');
            fillContent($(this).attr('data-id'));
            slideExists = true;
        } else {
            $('.menu-slider').addClass('classless-div').removeClass('col-md-2').css('margin-top', '0px');
            $('.col-md-8').addClass('col-md-10').removeClass('col-md-8');
            clearContent();
            slideExists = false;
        };
    });

    function findWithAttr(array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
    };

    var fillContent = function(value) {
        var startPhase;
        if ($('button[data-id="' + value + '"]').hasClass('shown')) {
            startPhase = 'Hide All';
        } else {
            startPhase = 'Show All';
        };
        var r = $('<button id="show-hide" class="button">' + startPhase + '</button>');
        $(".menu-slider").append(r);

        var links = "";
        for (var g = 0; g < gon.posts.length; g++) {
            if (gon.posts[g].blog_id === parseInt(value)) {
                links += '<b>' + gon.posts[g].published + '</b><br>';
                var tempNum = findWithAttr(marker_array, 'infoRel', gon.posts[g].name);
                links += '<a href="javascript:void(0);" onclick="infoOpen(' + "'" + tempNum + "');" + '">' + gon.posts[g].name + '</a><br>';
            }
        }
        $(".menu-slider").append($(links));

        $("#show-hide").on('click', function() {
            if ($('button[data-id="' + value + '"]').hasClass('shown')) {
                $('button[data-id="' + value + '"]').removeClass('shown');
                for (var i = 0; i < marker_array.length; i++) {
                    if (marker_array[i].group === value) {
                        marker_array[i].setVisible(false);
                    }
                }
                $('#show-hide').html('Show All');
            } else {
                $('button[data-id="' + value + '"]').addClass('shown');
                for (var i = 0; i < marker_array.length; i++) {
                    if (marker_array[i].group === value) {
                        marker_array[i].setVisible(true);
                    }
                }
                $('#show-hide').html('Hide All');
            }
        });
    }

    var clearContent = function() {
        $(".menu-slider").empty();
    }
    initialize();
});

var infoOpen = function(i) {
    google.maps.event.trigger(marker_array[i], 'click');
};
