var map;
var service;
var infowindow;

function initMap(zip) {
    var geocoder = new google.maps.Geocoder();

    var createMarker = function (place) {
        if (!place.geometry || !place.geometry.location) return;
        var marker = new google.maps.Marker({
            map,
            position: place.geometry.location,
        });

        google.maps.event.addListener(marker, "click", function () {
            console.log(place.name);
            infowindow.setContent(place.name || "");
            infowindow.open(map, this);
        });
        marker.setMap(map);
    }

    var showBarLocations = function (lat, lng) {
        infowindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: lat, lng: lng },
            zoom: 14,
        });

        var request = {
            location: map.getCenter(),
            radius: '3000',
            type: ['bar']
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }

                map.setCenter(results[0].geometry.location);
            }
        });
    }

    var getCoordinates = function (results, status) {
        if (status = 'OK') {
            showBarLocations(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        }
    }
    geocoder.geocode({ address: zip }, getCoordinates)
}

function search(eventObj) {
    eventObj.preventDefault();
    var input = $('.input')
    var zip = input.val();
    initMap(zip);
    input.val('')
}

function init() {
    document.querySelector('#mapApiBox')
    $('#mapApiBox').submit(search);
}

init();