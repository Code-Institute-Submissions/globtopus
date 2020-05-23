(function () {


        var country_feels
        var people
        var paths = $('path')
        var svg_map = 'world'
       var countries=[]
        var counter = 0
        /*IF WE ARE ON LANDING PAGE, WE WILL LOAD FEELINGS DATA INTO
        * #THE MAP , AND APPLY DIFFERENT COLOR TO COUNTRIES,
        * ACCORDING TO THEIR FEELING RATING. OTHERWISE, WE ARE ON SIGN UP PAGE AND WE DON'T NEED
        * COLORFUL MAP*/
        if (window.location.pathname === '/') {
            $.ajax({
                url: '/_world_feel',
                // data: $('form').serialize(),
                type: 'POST',
                success: function (response) {


                    country_feels = response.feels
                    people = response.total_people


                    $.each(paths, function (key, value) {

                        $(this).data('people', people[$(this).attr('id')]);

                        var feel = country_feels[$(this).attr('id')]
                        var c_name = $(this).data('cn2') ? $(this).data('cn2') : $(this).data('cn')
                        var cc = $(this).attr('id')
                        if(countries.indexOf($(this).data('cn')) !== -1) doubles.push($(this).data('cn'))

                        countries["'"+cc+"'"  ]= c_name+","


                        $(this).data('feel', feel)

                        if (feel < 20) {
                            $(this).attr('fill', "#006400")
                            $('#r_20').append(select_location_link(c_name, feel, cc))
                        } else if (feel < 40) {
                            $(this).attr('fill', '#20B2AA')
                            $('#r_40').append(select_location_link(c_name, feel, cc))
                        } else if (feel < 60) {
                            $(this).attr('fill', '#66FF00')
                            $('#r_60').append(select_location_link(c_name, feel, cc))
                        } else if (feel < 80) {
                            $(this).attr('fill', '#40E0D0')
                            $('#r_80').append(select_location_link(c_name, feel, cc))
                        } else if (feel <= 100) {
                            $(this).attr('fill', '#FFFF00')
                            $('#r_100').append(select_location_link(c_name, feel, cc))
                        } else {
                            $(this).attr('fill', '#eeeeee')

                        }

                        $('#r_all').append(select_location_link(c_name, feel, cc))
                    });


                },
                error: function (error) {
                    console.log('we could not load data');
                }
            });
        }

        /*SIGN UP PAGE...*/
        else {
            $.each(paths, function (key, value) {


                var c_name = $(this).data('cn2') ? $(this).data('cn2') : $(this).data('cn')
                var cc = $(this).attr('id')

                $(this).attr('class', 'select_location')
                $(this).data('level', 'country')
                $(this).data('location', c_name)
                $(this).data('cc', $(this).attr('id'))

                $('#r_all').append(select_location_link(c_name, 'sign_up', cc, 'country'))
            });
        }


        /*MAP HOVER INTERACTIVITY*/
        map_interactivity()



        /*CLICKING ON COLORFUL LEGEND TO GET LOCATIONS IN RANGE*/
        $('.map_color_legend,.show_list').on('click', function () {

            /*POPUP WITH COUNTIES/ STATES*/
            show_list($(this))
            /*LINKS IN POPUP ARE NOT IN THE DOM YET WHEN WE ARE LOADING PAGE,
            * SO WE NEED TO ATTACH CLICK LISTENER AFTER THEY ARE IN THE DOM*/
            $('.select_location').on('click', function () {

                select_location($(this))
            })

        })

        /*LINKS IN THE MAP ARE IN THE DOM WHEN WE ARE LOADING PAGE*/
        $('.select_location').on('click', function () {

            select_location($(this))
        })

        /*LINK TO APPEND TO LOCATION LIST POPUP*/
        function select_location_link(c_name, feel, cc, level = null) {

            /*IF WE ARE ON SIGN UP PAGE, WE NEED TO ADD LOCATION NAME TO INPUT FIELD*/
            if (feel === 'sign_up') {
                return `<span class="list-group-item no_padding">
                             <a 
                             href="#"
                                title="click to select"
                                class="locations_list select_location" 
                                data-cc="${cc}"
                                data-location="${c_name}"
                                data-level="${level}">
                                
                               
                                 ${display_name(c_name)}</a><br>

                        </span>  `
            }
            /*IF WE ARE ON LANDING PAGE, WE WILL REDIRECT TO SELECTED
            * COUNTRY PAGE*/
            else {
                return `<span class="list-group-item no_padding">
                             <a 
                             href="/${cc}"
                               title="click to visit"
                                class="locations_list" 
                                data-country_name="${c_name}">
                                
                                ${parseFloat(feel).toFixed(2)} 
                                - ${display_name(c_name)}</a><br>

                        </span>  `
            }

        }

        /*WHEN USER CLICKS ON MAP */
        function select_location($_this) {
            /*COUNTRY CODE*/
            var cc = $_this.data('cc')

            /*LEVEL country, county*/
            var level = $_this.data('level')

            /*location name..*/
            var location = $_this.data('location')


            /*WE WILL LOAD SELECTED COUNTRY MAP AND ADD SELECTED COUNTRY TO INPUT FIELD*/
            if (level === 'country') {
                $('#country_name').val(location)
                $('#cc').val(cc)
                $('#r_all').html('')

                /*LOADING DIMENSIONS OF THE MAP WITH LOCATIONS NAMES FROM DB AND
                * PUTTING IT TOGETHER ON THE FLY HERE*/
                $.getJSON('/load_map',
                    {
                        cc: cc
                    },
                    function (response) {
                        /*STARTING WITH SOME TEXT INPUT FOR CURRENTLY HOVERED LOCATION AND
                        * 2 BUTTONS
                        *
                        * ONE TO SHOW LIST OF LOCATIONS AND SECOND TO RELOAD WORLD MAP*/
                        var new_map = `
                            <div class="row no-gutters" >
                    <div class="col-md-6 map_info text-center border_green border_bottom_only p-2 d-flex justify-content-around align-items-center">
                        <span id="current">Hover over map to see county name
                       </span>
                    </div>
                    <div  data-range="all" title="see the list"
                            class="col-md-6 p-2 show_list text-center border_green border_bottom_only d-flex justify-content-around align-items-center">
                        <span><i class="fas fa-list"></i></span><br>
                        <span class="text-center">or select location from the list</span>
                       

                    </div>
                        <span class="reload d-flex justify-content-around" title="reload map"><i class="fas fa-redo  pt-1" ></i></span>
                </div>
                        <svg xmlns="http://www.w3.org/2000/svg" id="country_map" x="0" y="0" 
                        baseProfile="tiny" viewBox="0 0 660 447" xml:space="preserve">`


                        /*FOR EACH PIECE OF MAP "COUNTY" WE WILL ASSIGN
                        * CLASS FOR INTERACTIONS AND DATA LIKE LEVEL AND COUNTY NAME*/
                        $.each(response.c_map, function (index, map_) {
                            var county = Object.keys(map_)[0]
                            var d = map_[county]


                            $('#r_all').append(select_location_link(county, 'sign_up', cc, 'county'))


                            new_map += `<path id="${county}" 
                                title="click to select"
                                class="locations_list select_location" 
                               
                                data-location="${county}"
                                data-level="county"
                                fill="#66FF00" 
                                stroke="#177199" 
                                stroke-width=".25" d="${d}"/>`


                        })
                        /*CLOSE UP SVG ELEMENT*/
                        new_map += `</svg> `

                        svg_map = 'country_map'

                        /*ASSIGN NEWLY CREATED MAP TO map_sign_up DIV*/
                        $('#map_sign_up').html(new_map)

                        /*ADD MAP INTEARCTIVITY*/
                        map_interactivity()

                        /*EVERY PATH (COUNTY OR COUNTRY) HAS THIS CLASS
                        * SO WHEN CLICKED WE WILL SELECT THIS MAP AND
                        * UPDATE FORM INPUT FIELDS WITH COUNTRY AND COUNTY SELECTED*/
                        $('.select_location').on('click', function () {

                            select_location($(this))
                        })

                        /*SELECTING LOCATIONS IN RANGE*/
                        $('.map_color_legend,.show_list').on('click', function () {


                            show_list($(this))
                            /*LINKS IN POPUP ARE NOT IN THE DOM YET WHEN WE ARE LOADING PAGE,
                            * SO WE NEED TO ATTACH CLICK LISTENER AFTER THEY ARE IN THE DOM*/
                            $('.select_location').on('click', function () {

                                select_location($(this))
                            })

                        })

                        /*RELOADING WORLD MAP*/
                        $('.reload').on('click', function () {
                            window.location.reload();
                        })

                    })
            }
            /*IF WE ARE ON COUNTY MAP, WE WILL ADD COUNTY NAME TO INPUT FIELD*/
            else if (level === 'county') {

                /*FORM INPUT FIELD VALUE OF CURRENTLY SELECTED LOCATION*/
                $('#county_name').val(display_name(location))

                /*RESET ANY PREVIOUSLY SELECTED LOCATION*/
                $('path').attr('fill', '#66FF00')

                /*WE WILL CHANGE COLOR OF SELECTED LOCATION*/
                $("[data-location='" + location + "']").attr('fill', '#20B2AA')
                if (screen.width < 768) $('.globi_logo').get(0).scrollIntoView(1, 'slow')

            }
            swal.close()


        }

        /*POPUP WITH CURRENTLY SELECTED MAP LOCATIONS*/
        function show_list($_this) {
            var list_of_locations = $('#r_' + $_this.data('range'))

            $('.' + $_this.data('range')).remove()
            list_of_locations.append(`

                    <span class="gl_button mt-2 d-print-none ${$_this.data('range')}" 
                    onclick="swal.close()" title="close"> close</span>
                    
                    <span class="gl_button save_list d-print-none ${$_this.data('range')}" 
                    title="save list" onclick="window.print()"><i class="fas fa-save"></i></span>
                    
                    <hr class="${$_this.data('range')} d-print-none">
                    
                    <small class="blue ${$_this.data('range')} d-print-none">
                    click on link to see country </small>`)


            list_of_locations.prepend(`<img  class="d-none d-print-block" src="/assets/dist/images/gloptopus_logo.gif"/>`)

            Swal.fire({

                html: list_of_locations.html(),
                showConfirmButton: false
            })
        }

        /*JUST STRING REPLACE FOR LOCATION NAME*/
        function display_name(location) {
            return location.replace(/\__/g, ' | ').replace(/\_/g, ' ')
        }

        /*LOCATION NAME:
        *   IT COULD BE COUNTRY NAME WITH ONE OR TWO TRANSLATIONS
        * OR COUNTY NAME*/
        function location_name(_this) {
            if (_this.data('cn2')) return _this.data("cn2")
            else if (_this.data('cn')) return _this.data("cn")
            else if (_this.data('location')) return _this.data("location")
        }

        /*MAP INTERACTIVITY ON MOUSEENTER, MOUSELEAVE, CLICK*/
        function map_interactivity() {
            $('path')
                .on('mouseenter',
                    function () {

                        $(this).attr('stroke', "red").attr('stroke-width', 2)
                        $('#current').html(display_name(location_name($(this))))

                    })
                .on('mouseleave',
                    function () {
                        $(this).attr('stroke', "#177199").attr('stroke-width', 0.25)


                    })
                .on('click',
                    function () {
                        $('#map_info').removeClass('d-flex align-content-around flex-wrap')
                        $('#current_info').html(`
                   
                   <span class="blue">country :</span> <br><span class="smaller_h text-wrap"> ${location_name($(this))} </span><br>
                
                    <span class="blue"> total globers : </span> <span class="smaller_h"> 
                      ${new Intl.NumberFormat(navigator.language).format($(this).data('people'))} 
                     </span>
                  
                     <span class="smaller_h user_heart country d-flex justify-content-center align-items-center"> 
                        ${new Intl.NumberFormat(navigator.language).format($(this).data('feel'))} </span>
                      
                       <br>
                         <a  href="/${$(this).attr('id')}" id='${$(this).attr('id')}' class="gl_button green text-center p-3 text-wrap" >
                        <span class="smaller_h pb-3">EXPLORE MORE</span>
                       
                        </a>
                        <hr>
                `)
                    });
        }

        /*ZOOMING AND PANING FOR SVG MAP*/
        var MapControl = new SVGPanZoom(document.getElementById(svg_map), {
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
    }

)()



