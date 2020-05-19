
(function () {

    var country_feels
    var people
    var paths = $('path')

    $.ajax({
        url: '/_world_feel',
        // data: $('form').serialize(),
        type: 'POST',
        success: function (response) {


            country_feels = response.feels
            people = response.total_people

            var fill = '#ffffff'
            $.each(paths, function (key, value) {

                $(this).data('people', people[$(this).attr('id')]);

                var feel = country_feels[$(this).attr('id')]
                var c_name = $(this).data('cn2') ? $(this).data('cn2'): $(this).data('cn')
                var cc = $(this).attr('id')
                $(this).data('feel', feel)

                if (feel < 20) {
                    $(this).attr('fill', "#006400")
                     $('#r_20').append(chart_link (c_name,feel,cc))
                }


                else if (feel < 40) {
                    $(this).attr('fill', '#20B2AA')
                    $('#r_40').append(chart_link (c_name,feel))
                }


                else if (feel < 60) {
                    $(this).attr('fill', '#66FF00')
                     $('#r_60').append(chart_link (c_name,feel))
                }


                else if (feel < 80) {
                    $(this).attr('fill', '#40E0D0')
                     $('#r_80').append(chart_link (c_name,feel))
                }


                else if (feel <= 100) {
                    $(this).attr('fill', '#FFFF00')
                     $('#r_100').append(chart_link (c_name,feel))
                }

                else {
                    $(this).attr('fill', '#eeeeee')

                }

                 $('#r_all').append(chart_link (c_name,feel))
            });

            $('#map').on('click', function () {
                /*HIDE ANY PREVIOUSLY OPEN DIVS ( CHARTS, MAPS)*/
                $('.landing_interaction').addClass('d-none')

                var map_search = $('#map_search')
                map_search.removeClass('d-none')

                 if (screen.width < 768)  map_search.get(0).scrollIntoView(1,'slow')

            })

            var current_fill
            $('path').on('mouseenter',
                function () {

                    $(this).attr('stroke', "red").attr('stroke-width', 2)
                    $('#current').html(country_name($(this)))
                })
                .on('mouseleave',
                    function () {
                       $(this).attr('stroke', "#177199").attr('stroke-width', 0.25)


                    }
                ).on('click',
                function () {
                    $('#map_info').removeClass('d-flex align-content-around flex-wrap')
                    $('#current_info').html(`
                   
                   <span class="blue">country :</span> <br><span class="smaller_h text-wrap"> ${country_name($(this))} </span><br>
                
                    <span class="blue"> total globers : </span> <span class="smaller_h"> 
                      ${new Intl.NumberFormat(navigator.language).format($(this).data('people'))} 
                     </span>
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
                if (action === 'reset') MapControl.reset() })



        },
        error: function (error) {
            console.log('we could not load data');
        }
    });

 function chart_link (county,feel,cc){

              return  `<span class="list-group-item no_padding">
                             <a id="${county}" 
                             href="/${cc}"
                                data-chart_for="county" 
                                data-num_of_days="10" 
                                class="chart map_chart" 
                                data-county_name="${county}">
                                ${parseFloat(feel) .toFixed(2) } - ${county.replace(/\__/g, ' | ').replace(/\_/g, ' ')}</a><br>

                        </span>  `
            }
})()



