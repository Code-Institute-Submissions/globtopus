(function () {
    $('#country_map').on('click', function () {
        $('#map_holder').removeClass('d-none')
        $('#chart_holder').addClass('d-none')
    })

    $.getJSON('/load_map',
        {
            cc: $('#c_search').data('cc')
        },
        function (response) {

            var new_map = ` <svg xmlns="http://www.w3.org/2000/svg" id="country_map" x="0" y="0" baseProfile="tiny" viewBox="0 0 660 447" xml:space="preserve">`
            var counties = ''
            $.each(response.c_map, function (index, map_) {
                var county = Object.keys(map_)[0]
                var d = map_[county]
                counties += `${county} <br>`

                new_map += `<path id="${county}" fill="#006400" stroke="#eee" stroke-width=".25" d="${d}"/>`


            })
            new_map += `</svg> <div class="row no-gutters">
                <div class="col-md-6  text-center border_green border_bottom_only p-2">
                    <span id="current">Hover over map to see location name here</span>
                </div>
                <div class="col-md-6  text-center border_green border_bottom_only d-flex justify-content-around">
                    <span class="map_color_legend map_20" data-range="0-20"><20 </span>
                    <span class="map_color_legend map_40" data-range="20-40"><40 </span>
                    <span class="map_color_legend map_60" data-range="40-60"><60 </span>
                    <span class="map_color_legend map_80" data-range="60-80"><80 </span>
                    <span class="map_color_legend map_100" data-range="80-100">≤100 </span>
                </div>
            </div>`
            $('#map_holder').html(new_map)
            // swal.fire({
            //     title: 'Map from db and cc: '+c_c,
            //
            //     html: new_map + counties,
            //     position: 'top-end'
            // })
            $('path').on('mouseenter',
                function () {

                    current_fill = $(this).attr('fill')
                    $(this).attr('fill', "rgba(111, 227, 0, 0.3)")
                    $('#current').html($(this).attr('id')
                        .replace(/\__/g, ' | ')
                        .replace(/\_/g, ' '))
                })
                .on('mouseleave',
                    function () {
                        $(this).attr('fill', current_fill)


                    }
                )




        })
})()