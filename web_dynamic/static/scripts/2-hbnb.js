$('document').ready(() => {
    const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
    $.get(url, function(data) {
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
})