$('document').ready(() => {
    const statusUrl = 'http://' + window.location.hostname + ':5001/api/v1/status/';
    const placesSearchUrl = 'http://' + window.location.hostname + ':5001/api/v1/places_search/';

    // Check API status
    $.get(statusUrl, function(data) {
        if (data.status === 'OK') {
            $('DIV#api_status').addClass('available');
        } else {
            $('DIV#api_status').removeClass('available');
        }
    });

    const amenities = {};
    $('.amenities .popover input').change(function () {
        if ($(this).is(':checked')) {
            amenities[$(this).attr('data-name')] = $(this).attr('data-id');
        } else if ($(this).is(':not(:checked)')) {
            delete amenities[$(this).attr('data-name')];
        }
        const names = Object.keys(amenities);
        $('.amenities h4').text(names.sort().join(', '));
    });

    // Function to fetch and display places
    function fetchPlaces(amenities) {
        $.ajax({
            url: placesSearchUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: Object.values(amenities) }),
            success: function(data) {
                $('section.places').empty(); // Clear existing places
                for (const place of data) {
                    const article = $('<article></article>');
                    article.append(`<div class="title_box"><h2>${place.name}</h2><div class="price_by_night">$${place.price_by_night}</div></div>`);
                    article.append(`<div class="information"><div class="max_guest">${place.max_guest} Guests</div><div class="number_rooms">${place.number_rooms} Bedrooms</div><div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div></div>`);
                    article.append(`<div class="description">${place.description}</div>`);
                    $('section.places').append(article);
                }
            },
            error: function() {
                console.error('An error occurred while fetching places.');
            }
        });
    }

    // Initial fetch of places
    fetchPlaces({});

    // Fetch places when the button is clicked
    $('button').click(function() {
        fetchPlaces(amenities);
    });
});
