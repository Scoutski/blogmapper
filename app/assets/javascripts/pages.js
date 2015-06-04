var marker_array = [];
var prev_infowindow = false;
var map;

$(document).ready(function() {
    // This if statement is used to ensure that there is a #map-canvas on the page (there are 3 pages which use this)
    if ($('#map-canvas').length === 0) {
        return;
    }

    var image;
    var relatedBlog;
    var slideExists = false;

    var createMap = function() {
        // Function Purpose:
        // This function puts the map on the page with the settings defined in initialMapSettings().
        var mapCanvas = document.getElementById('map-canvas');
        var mapOptions = initialMapSettings();
        map = new google.maps.Map(mapCanvas, mapOptions);
    };

    var initializeMarkers = function() {
        // Function Purpose:
        // This function sets up the map and drops the markers.
        for (var i = 0; i < gon.posts.length; i++) {

            var skipMarker = shouldMarkerExist(i);

            if (onFavoriteMap() && notUserFavorite(i)) {
                skipMarker = true;
            }
            if (skipMarker === true) {
                continue;
            }

            var marker = markerSettings(gon.posts[i].latitude, gon.posts[i].longitude, gon.posts[i].name, gon.posts[i].id);
            marker_array.push(marker);
            createMarkerListener(marker);
        };
    };

    var initialMapSettings = function() {
        // Function Purpose:
        // This function just exists to return the settings for the map and the starting position.
        return {
            center: new google.maps.LatLng(-33.8752213, 151.1361061),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    };

    var markerImageSettings = function(blogID) {
        // Function Purpose:
        // This function exists to assign the properties for the marker image on the map.
        return {
            url: gon.blogs[blogID].marker_url,
            scaledSize: new google.maps.Size(25, 25)
        };
    };

    var shouldMarkerExist = function(num) {
        // Function Purpose:
        // This function exists to check if the marker is appropriate for the current page (out of the Index, My Blogs and My Favorites pages.)
        for (var j = 0; j < gon.blogs.length; j++) {
            if (!onFavoriteMap() && !blogButtonExists(gon.blogs[j].id)) {
                // This exists so that if the post doesn't have a blog_id of one of the buttons on the page for the My Blogs page, it doesn't assign the marker to the page.
                continue;
            };
            if (gon.blogs[j].id === gon.posts[num].blog_id) {
                image = markerImageSettings(j);
                relatedBlog = gon.blogs[j];
                return false;
            };
        };
        return true;
    };

    var markerSettings = function(Lat, Lng, name, idNumber) {
        // Function Purpose:
        // This function exists to assign the properties for each marker.
        var LatLng = new google.maps.LatLng(Lat, Lng);

        return new google.maps.Marker({
            position: LatLng,
            map: map,
            animation: google.maps.Animation.DROP,
            clickable: true,
            icon: image,
            visible: true,
            group: (relatedBlog.id + ""),
            infoRel: name,
            infoPostID: idNumber
        });
    };

    var createMarkerListener = function(marker) {
        // Function Purpose:
        // This function exists to just create the event listener for the markers on the map and to add the correct info window by pulling the HTML in through an AJAX request.
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

    var notUserFavorite = function(currentPost) {
        // Function Purpose:
        // This function checks if a user is logged in, then it checks if the current page is the My Favorites page and if it is, if the current post exists within the logged in users fav_posts array.
        if (isUserLoggedIn()) {
            if (gon.user.fav_posts.indexOf(gon.posts[currentPost].id) === -1) {
                return true;
            };
        };
        return false;
    };

    var onFavoriteMap = function() {
        // Function Purpose:
        // This function checks if the user is on the Favorite Maps page.
        if ($('.my-favs-map').length > 0) {
            return true
        } else {
            return false;
        };
    };

    var blogButtonExists = function(blogID) {
        // Function Purpose:
        // This function exists for the My Blogs page and checks if a post belongs to a subscribed blog.
        if ($('.button[data-id="' + blogID + '"]').length !== 0) {
            return true;
        } else {
            return false;
        }
    };

    var isUserLoggedIn = function() {
        // Function Purpose:
        // This function exists to show if a user is currently logged in.
        if (gon.user) {
            return true;
        } else {
            return false;
        };
    };

    $(document).on('click', '.favorite-link', function() {
        // Event Purpose:
        // This event handler exists to call the function to change the info window and post the post_id to the current users fav_posts array.
        changeFavoriteLink($(this));
        $.post($(this).closest('form').attr('action'));
    });

    var changeFavoriteLink = function(link) {
        // Function Purpose:
        // Changes the state of the info window after clicking on the favorite or unfavorite link.
        if (link.html() === 'Favorite') {
            link.html('Unfavorite');
            $('.favorite-title').html('<img src="https://cdn2.iconfinder.com/data/icons/diagona/icon/16/031.png" alt="Favorite star">');
        } else {
            link.html('Favorite');
            $('.favorite-title').html('');
        };
    };

    $(document).on('click', '.menu-slider #favorite-blog', function() {
        // Event Purpose:
        // This event runs to call the function to change the follow button text and post the blog_id to the current users fav_blogs array.
        setFavBlogName();
        if (isUserLoggedIn()) {
            var url = "/users/" + $(this).attr('data-id') + "/fav_blog/";
            console.log(url);
            $.post(url);
        };
    });

    var setFavBlogName = function() {
        // Function Purpose:
        // This function runs after a user has logged in to set the correct name on the button.
        if ($('#favorite-blog').html() === "Follow Blog") {
            $('#favorite-blog').html("Unfollow Blog");
        } else if ($('#favorite-blog').html() === "Unfollow Blog") {
            $('#favorite-blog').html("Follow Blog");
        } else {
            return;
        }
    };

    $(document).on('click', '.blog-button', function() {
        // Event Purpose:
        // This event exists to open and close the slide out menu for the blog buttons on the left-hand side of the page.
        changeCheckedState($(this));

        if (slideExists === true) {
            var checkOpen = false;

            if ($(this).attr('data-id') !== $('#show-hide').attr('data-rel')) {
                checkOpen = true;
            };

            clearSlideMenu();
            slideExists = false;

            if (checkOpen) {
                openSlideMenu($(this));
            };

        } else {
            openSlideMenu($(this));
        };
    });

    var changeCheckedState = function(button) {
        // Function Purpose:
        // This function ensures that a button is always in the correct display state.
        if (button.hasClass('is-checked')) {
            button.removeClass('is-checked');
        } else {
            $('.button').removeClass('is-checked');
            button.addClass('is-checked');
        };
    };

    var clearSlideMenu = function() {
        // Function Purpose:
        // This function removes all the CSS properties for the slide out menu and then empty is used to delete all the buttons and list of links.
        $("#favorite-blog").off();
        $('#show-hide').off();
        $(".menu-slider").css("height", "");
        $(".menu-slider").css("overflow-y", "");
        $(".menu-slider").css("padding-top", "");
        $(".menu-slider").empty();
        $('.menu-slider').addClass('classless-div').removeClass('col-md-2');
        $('.col-md-8').addClass('col-md-10').removeClass('col-md-8');
    };

    var openSlideMenu = function(blogButton) {
        // Function Purpose:
        // This function exists to change the classes of the 3 main divs on the page to create the menu and then to call the fillSlideMenuContent function to put the correct content in the menu.
        $('.menu-slider').addClass('col-md-2').removeClass('classless-div');
        $('.col-md-10').addClass('col-md-8').removeClass('col-md-10');
        fillSlideMenuContent(blogButton.attr('data-id'));
        slideExists = true;
    };

    var findWithAttr = function(array, attr, value) {
        // Function Purpose:
        // This function returns the id number that matches the correct info window to bring up when the marker is selected.
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
    };

    var fillSlideMenuContent = function(value) {
        // Function Purpose:
        // This function exists to generate all the elements in the slide menu
        setUpSlideMenu();

        $.get('/blogs/' + value + '/favorite/').done(function(data) {
            createSlideButtons(data, value);
            createBlogLinks(value);
            setUpShowHideHandler(value);
        });
    };

    var setUpSlideMenu = function() {
        // Function Purpose:
        // This function sets up the menu on the page with the right size and format.
        $(".menu-slider").css('overflow-y', 'scroll');
        $(".menu-slider").css('height', '600px');
        $(".menu-slider").css("padding-top", "10px");
    };

    var createSlideButtons = function(favoriteStartState, blogID) {
        // Function Purpose:
        // This function exists to create the Follow Blog button and the Show Hide button in the slide out menu each time it is created.
        var $favoriteBlogButton = $('<button id="favorite-blog" class="button" data-id="' + blogID + '">' + favoriteStartState + '</button>');
        $(".menu-slider").append($favoriteBlogButton);

        var $showHideButton = $('<button id="show-hide" class="button" data-rel="' + blogID + '">' + startShowPhase(blogID) + '</button>');
        $(".menu-slider").append($showHideButton);
    };

    var startShowPhase = function(blogID) {
        // Function Purpose:
        // This function exists to determine what the text on the Show/Hide markers button should be when the slide menu is opened.
        if ($('button[data-id="' + blogID + '"]').hasClass('shown')) {
            return 'Hide All';
        } else {
            return 'Show All';
        };
    };

    var createBlogLinks = function(blogID) {
        // Function Purpose:
        // This function exists to create the list of posts in the slide out menu for the currently selected blog button.
        var links = "";
        for (var g = 0; g < gon.posts.length; g++) {
            if (gon.posts[g].blog_id === parseInt(blogID)) {
                links += '<b>' + gon.posts[g].published + '</b><br>';
                var tempNum = findWithAttr(marker_array, 'infoRel', gon.posts[g].name);
                links += '<a href="javascript:void(0);" onclick="infoOpen(' + "'" + tempNum + "');" + '">' + gon.posts[g].name + '</a><br>';
            };
        };
        $(".menu-slider").append($(links));
    };

    var setUpShowHideHandler = function(blogID) {
        // Function Purpose:
        // This function exists to create the event handler for the Show/Hide button when it is created each time.
        $("#show-hide").on('click', function() {
            if ($('button[data-id="' + blogID + '"]').hasClass('shown')) {
                $('button[data-id="' + blogID + '"]').removeClass('shown');
                toggleMarkerVisibility(blogID, false);

                $('#show-hide').html('Show All');
            } else {
                $('button[data-id="' + blogID + '"]').addClass('shown');
                toggleMarkerVisibility(blogID, true);

                $('#show-hide').html('Hide All');
            };
        });
    };

    var toggleMarkerVisibility = function(blogID, visibility) {
        // Function Purpose:
        // This function either shows or hides the markers for the currently selected blog.
        for (var i = 0; i < marker_array.length; i++) {
            if (marker_array[i].group === blogID) {
                marker_array[i].setVisible(visibility);
            };
        };
    };

    createMap();
    initializeMarkers();
});

var infoOpen = function(i) {
    // Function Purpose:
    // This function exists to create the info windows when the slide menu links are clicked.
    google.maps.event.trigger(marker_array[i], 'click');
};
