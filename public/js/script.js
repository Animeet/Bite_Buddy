var map;
var service;
var infowindow;
var favorites = [];

function updateResults(results) {
    const resultsOutput = $('#results')
    resultsOutput.empty()
    results.forEach((place) => {
        resultsOutput.append(`
        <li class="p-2">
            <span>${place.name}</span>
            <button data-place-name="${place.name}" class="align-self-start">Favorite</button>
        </li>
        `)
    })
}

function updateFavorites() {
    const favoritesOutput = $('#favorites')
    favoritesOutput.empty()
    favorites.forEach((favorite) => {
        favoritesOutput.append(`
        <li>
            <span>${favorite.name}</span>
        </li>
        `)
    })
}

async function addFavorite() {
    const placeName = $(this).data('place-name');
    const favorite = await $.post('/favorite', {
        name: placeName
    });

    if (!favorite) return;

    favorites.push(favorite)

    updateFavorites()
}
$('#results').on('click', 'button', addFavorite)

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
            type: ['restaurant']
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
            if (!results.length) return updateResults([])
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                for (let i = 0; i < results.length; i++) {
                    console.log(results)
                    createMarker(results[i]);
                }
                updateResults(results);
                map.setCenter(results[0].geometry.location);
            }
        });
    }

    var getCoordinates = function (results, status) {
        if (status = 'OK') {
            console.log(results)
            // pass the results into some function that renders them on the sidebar
            showBarLocations(results[0]?.geometry.location.lat(), results[0].geometry.location.lng());
        }
    }
    geocoder.geocode({ address: zip }, getCoordinates)
}

function search(eventObj) {
    eventObj.preventDefault();
    var input = $('#input-zip')
    var zip = input.val();
    initMap(zip);
    input.val('')
}

function init() {
    document.querySelector('#mapApiBox')
    $('#mapApiBox').submit(search);
}

function renderSidebar(arrData) {
    $('#sidebar').html('')
    for (let restaurant of arrData) {
        $('#sidebar').append('RestaurantData' + JSON.stringify(restaurant))
    }
}

init();