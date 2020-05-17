(function () {

    var country_feels
    var people
    var paths = $('path')

    $.ajax({
        url: '/_world_feel',
        // data: $('form').serialize(),
        type: 'POST',
        success: function (response) {


            var new_map = `<svg xmlns="http://www.w3.org/2000/svg" id="world" x="0" y="0" baseProfile="tiny" viewBox="0 -100 1600 840" xml:space="preserve">`

            country_feels = response.feels
            people = response.total_people
            var fill = '#ffffff'
            $.each(response.svg_map, function (index, Map) {

                if (country_feels[Map.cc] < 20) fill = "#006400"


                else if (country_feels[Map.cc] < 40) fill = "#20B2AA"


                else if (country_feels[Map.cc] < 60) fill = "#66FF00"


                else if (country_feels[Map.cc] < 80) fill = "#40E0D0"


                else if (country_feels[Map.cc] <= 100) fill = "#FFFF00"

                else fill = "#eeeeee"

                /*for world*/
                new_map += `<path id="${Map.cc}"  
                                              data-cn="${Map.cn}" 
                                              data-cn2="${Map.cn2}"
                                              data-people="${people[Map.cc]}"
                                              data-feel="${country_feels[Map.cc]}"
                                              fill="${fill}" stroke="#000" stroke-width=".25" d="${Map.d}"/>`


            })
            new_map += `</svg><div class="row no-gutters">
                <div class="col-md-6  text-center border_green border_bottom_only p-2">
                    <span id="current">Hover over map to see country name here</span>
                </div>
                <div class="col-md-6  text-center border_green border_bottom_only d-flex justify-content-around">
                    <span class="map_color_legend map_20" data-range="0-20"><20 </span>
                    <span class="map_color_legend map_40" data-range="20-40"><40 </span>
                    <span class="map_color_legend map_60" data-range="40-60"><60 </span>
                    <span class="map_color_legend map_80" data-range="60-80"><80 </span>
                    <span class="map_color_legend map_100" data-range="80-100">≤100 </span>
                </div>
            </div>`

            $('#SVGContainer').html(new_map)
            $('#map').on('click', function () {
                /*HIDE ANY PREVIOUSLY OPEN DIVS ( CHARTS, MAPS)*/
                $('.landing_interaction').addClass('d-none')

                var map_search = $('#map_search')
                map_search.removeClass('d-none').get(0).scrollIntoView()

            })

            var current_fill
            $('path').on('mouseenter',
                function () {

                    current_fill = $(this).attr('fill')
                    $(this).attr('fill', "rgba(111, 227, 0, 0.3)")
                    $('#current').html(country_name($(this)))
                })
                .on('mouseleave',
                    function () {
                        $(this).attr('fill', current_fill)


                    }
                ).on('click',
                function () {
                    $('#map_info').removeClass('d-flex align-content-around flex-wrap')
                    $('#current_info').html(`
                   
                   <span class="blue">country :</span> <br><span class="smaller_h text-wrap"> ${country_name($(this))} </span><br>
                
                    <span class="blue"> total globers : </span> <span class="smaller_h"> 
                      ${new Intl.NumberFormat(navigator.language).format($(this).data('people'))} 
                     </span><br>
                     <small class="blue">( last 7 days )</small>
                    <hr>
                     <span class="smaller_h user_heart country d-flex justify-content-center align-items-center"> 
                        ${new Intl.NumberFormat(navigator.language).format($(this).data('feel'))} </span>
                      
                        <hr>
                         <a  href="/${$(this).attr('id')}" id='${$(this).attr('id')}' class="gl_button green text-center p-3 text-wrap" >
                        <span class="smaller_h">EXPLORE MORE</span>
                       
                        </a>
                `)
                });

            function country_name(_this) {
                if (_this.data('cn2')) return _this.data("cn2")
                else if (_this.data('cn')) return _this.data("cn")
            }

            var MapControl = new SVGPanZoom(document.getElementById('world'), {
                eventMagnet: null,
                // zoom options
                zoom: {
                    factor: 0.25,
                    minZoom: 1,
                    maxZoom: 20,
                    events: {
                        mouseWheel: true,
                        doubleClick: true,
                        pinch: true
                    },
                    callback: function callback(multiplier) {
                    }
                },
            });
            $('.map_controls').on('click', function () {

                var action = $(this).data('action')
                if (action === 'zoomIn') MapControl.zoomIn()
                if (action === 'zoomOut') MapControl.zoomOut()
                if (action === 'panLeft') MapControl.panLeft()
                if (action === 'panRight') MapControl.panRight()
                if (action === 'panUp') MapControl.panUp()
                if (action === 'panDown') MapControl.panDown()
                if (action === 'reset') MapControl.reset()



            })



        },
        error: function (error) {
            console.log('we could not load data');
        }
    });


})()



