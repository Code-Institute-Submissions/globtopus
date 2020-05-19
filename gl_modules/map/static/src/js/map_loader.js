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
            $.each(paths, function (key, value) {

                $(this).data('people', people[$(this).attr('id')]);

                var feel = country_feels[$(this).attr('id')]

                $(this).data('feel', feel)

                if (feel < 20) $(this).attr('fill', "#006400")


                else if (feel < 40) $(this).attr('fill', '#20B2AA')


                else if (feel < 60) $(this).attr('fill', '#66FF00')


                else if (feel < 80) $(this).attr('fill', '#40E0D0')


                else if (feel <= 100) $(this).attr('fill', '#FFFF00')

                else $(this).attr('fill', '#eeeeee')
                    ;
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
                if (action === 'reset') MapControl.reset()



            })



        },
        error: function (error) {
            console.log('we could not load data');
        }
    });


})()



