// To make commenting easier to understand, a comment will apply to the code that exists beneath it.

var slideExists = false;
var marker_array = [];
var prev_infowindow = false;
var map;

$(document).ready(function() {
    // This if statement is used to ensure that there is a #map-canvas on the page (there are 3 pages which use this)
    if ($('#map-canvas').length === 0) {
        return;
    }
    for (var h = 0; h < gon.blogs.length; h++) {

    };

    function initialize() {

        var mapCanvas = document.getElementById('map-canvas');
        var mapOptions = {
            center: new google.maps.LatLng(-33.8752213, 151.1361061),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(mapCanvas, mapOptions);

        var infowindow;


        for (var i = 0; i < gon.posts.length; i++) {
            var relatedBlog;
            var stop = false;

            //This condition just checks that there is a user logged in.
            if (gon.user) {
                // If a user is logged in, this next check is used to skip putting a post marker on the map if the user is on the my favorites page.
                if ((gon.user.fav_posts.indexOf(gon.posts[i].id) === -1) && ($('.my-favs-map').length > 0)) {
                    stop = true;
                };
            };
            for (var j = 0; j < gon.blogs.length; j++) {
                if (($('.button[data-id="' + gon.blogs[j].id + '"]').length === 0) && ($('.my-favs-map').length === 0)) {
                    stop = true;
                    break;
                }
                if (gon.blogs[j].id === gon.posts[i].blog_id) {
                    var image = {
                        url: gon.blogs[j].marker_url,
                        scaledSize: new google.maps.Size(25, 25)
                    }
                    relatedBlog = gon.blogs[j];
                    break;
                };
            };

            if (stop === true) {
                continue;
            }

            var myLatLng = new google.maps.LatLng(gon.posts[i].latitude, gon.posts[i].longitude);

            var temp = relatedBlog.id + "";


            // This creates the marker object that will be stored in the global marker_array.
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                animation: google.maps.Animation.DROP,
                clickable: true,
                icon: image,
                visible: true,
                group: temp,
                infoRel: gon.posts[i].name,
                infoPostID: gon.posts[i].id
            });
            marker_array.push(marker);

            infowindow = new google.maps.InfoWindow();

            google.maps.event.addListener(marker, 'click', function() {
                var thisMarker = marker_array[marker_array.indexOf(this)];
                $.get('/users/' + this.infoPostID + '/fav_posts/').done(function(data) {

                    var infowindow = new google.maps.InfoWindow({
                        content: data
                    });

                    if (prev_infowindow) {
                        prev_infowindow.close();
                    };
                    prev_infowindow = infowindow;
                    infowindow.setContent(data);
                    infowindow.open(map, thisMarker);
                });
            });
        };
    };

    $(document).on('click', '.favorite-link', function() {
        if ($(this).html() === 'Favorite') {
            $(this).html('Unfavorite');
            $('.favorite-title').html('<img src="/assets/star.gif" alt="Favorite star">');
        } else {
            $(this).html('Favorite');
            $('.favorite-title').html('');
        };

        var url = $(this).closest('form').attr('action');
        $.post(url).done(function() {});
    });

    var setFavBlogName = function() {
        // This function runs after a user has logged in to set the correct name on the button.
        if ($('#favorite-blog').html() === "Follow Blog") {
            $('#favorite-blog').html("Unfollow Blog");
        } else {
            $('#favorite-blog').html("Follow Blog");
        };
    };

    $(document).on('click', '.menu-slider #favorite-blog', function() {
        setFavBlogName();
        var url = "/users/" + $(this).attr('data-id') + "/fav_blog/";
        console.log(url);
        $.post(url);
    });

    $('.button-group').each(function(i, buttonGroup) {

        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function() {
            if ($(this).hasClass('is-checked')) {
                $(this).removeClass('is-checked');
            } else {
                $('.button').removeClass('is-checked');
                $(this).addClass('is-checked');
            };

            if (slideExists === true) {
                var checkOpen = false;

                if ($(this).attr('data-id') !== $('#show-hide').attr('data-rel')) {
                    checkOpen = true;
                };

                $('.menu-slider').addClass('classless-div').removeClass('col-md-2');
                $('.col-md-8').addClass('col-md-10').removeClass('col-md-8');
                clearContent();
                slideExists = false;

                if (checkOpen) {
                    $('.menu-slider').addClass('col-md-2').removeClass('classless-div');
                    $('.col-md-10').addClass('col-md-8').removeClass('col-md-10');
                    fillContent($(this).attr('data-id'));
                    slideExists = true;
                };
            } else {

                $('.menu-slider').addClass('col-md-2').removeClass('classless-div');
                $('.col-md-10').addClass('col-md-8').removeClass('col-md-10');
                fillContent($(this).attr('data-id'));
                slideExists = true;
            };


        });
    });

    function findWithAttr(array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
    };

    var fillContent = function(value) {
        $(".menu-slider").css('overflow-y', 'scroll');
        $(".menu-slider").css('height', '600px');
        $(".menu-slider").css("padding-top", "10px");

        var startShowPhase;
        if ($('button[data-id="' + value + '"]').hasClass('shown')) {
            startShowPhase = 'Hide All';
        } else {
            startShowPhase = 'Show All';
        };


        $.get('/blogs/' + value + '/favorite/').done(function(data) {
            var $favoriteBlogButton = $('<button id="favorite-blog" class="button" data-id="' + value + '">' + data + '</button>');
            // <input type="hidden" name="mess" value="Favorite">
            $(".menu-slider").append($favoriteBlogButton);

            var $showHideButton = $('<button id="show-hide" class="button" data-rel="' + value + '">' + startShowPhase + '</button>');
            $(".menu-slider").append($showHideButton);

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
        });
    }



    var clearContent = function() {
        // This function removes all the CSS properties for the slide out menu and then empty is used to delete all the buttons and list of links.
        $("#favorite-blog").off();
        $(".menu-slider").css("height", "");
        $(".menu-slider").css("overflow-y", "");
        $(".menu-slider").css("padding-top", "");
        $(".menu-slider").empty();
    };

    initialize();

});

var infoOpen = function(i) {
    google.maps.event.trigger(marker_array[i], 'click');
};
