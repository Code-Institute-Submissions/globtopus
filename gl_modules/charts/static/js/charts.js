/*FUNCTIONS FOR INTERACTIONS WITH CHARTS
* DISPLAYING HOW DO WORLD COUNTRIES FEEL */


(function () {
    $.postJSON = function (url, data, func) {
        $.post(url, data, func, 'json');
    }

    var list_of_locations = $('#list_of_locations')

    /*CLICKING ON charts BUTTON UNDER GLOBE, OR BUTTONS NEXT TO THE CHART ON THE RIGHT
    * 2 OPTIONS :
    *       1. WORLD FEEL DAYS (30,90....)
    *       2. COUNTRIES TOP 10,30,ALL...*/
    $('.chart').on('click', function () {

        /*USER VISUAL FEEDBACK AS TO WHAT CHART IS DISPLAYED*/
        selected_chart($(this))


        show_country_chart()
        /*HIDE ANY PREVIOUSLY OPEN DIVS ( CHARTS, MAPS)*/
        $('.landing_interaction').addClass('d-none')
        /*DIV F0R DISPLAYING CHARTS*/
        $('#chart_search').removeClass('d-none')
        /*SCROLLING TO THE DIV ON MOBILE DEVICES*/
        if (screen.width < 768) $('#bottom_of_chart').get(0).scrollIntoView()
        /*CLEARING ANY PREVIOUSLY DISPLAYED COUNTRIES*/
        list_of_locations.html('')

        /*@type chart_for OF THE CHART*/

        var chart_for = $(this).data('chart_for')

         if (chart_for === 'country') $('.chart_days').data('chart_for', 'country')


        /*@num_of_days HOW MANY DAYS TO DISPLAY ON THE CHART*/
        /*@num_of_countries HOW MANY  TOP COUNTRIES TO DISPLAY ON THE CHART*/
        /*@country_code COUNTRY CODE*/
        var num_of_days = $(this).data('num_of_days')
        var num_of_countries = $(this).data('num_of_countries')
        var country_code = $(this).data('country')
        var country_name = $(this).data('country_name')
        var county_name = $(this).data('county_name')

        /*to prevent old graph on hover, CLEARING ANY EVENTS ATTACHED TO
        * PREVIOUSLY ATTACHED CHART*/
        clear_canvas()
        /*end of to prevent old graph on hover*/

        var chart_canvas = $('#chart')

        /*AJAX REQUEST TO GET RESULTS*/
        /*WHEN USER CLICKS charts BUTTON, OR WORLD FEEL PERIODS BUTTON
        * OR TOP COUNTRY BUTTON WE WILL SEND REQUEST TO SERVER TO GET US DATA
        * TO DISPLAY */

        $.getJSON('/_chart_data', {
                num_of_days: num_of_days,
                num_of_countries: num_of_countries,
                chart_for: chart_for,
                country_code: country_code,
                county_name: county_name,
                country_name: country_name

            },

            function (data) {

                c_feel = data.c_feels

                c_labels = data.labels
                feels = data.feels
                B_colors = data.B_colors

                /*WHEN USER CLICKS ON TOP COUNTRIES,
                * WE WILL APPEND TOP COUNTRIES FOR USER TO
                * SEE THEM WITH ADDITIONAL CONTROLS FOR COUNTRY CHARTS(PERIODS OF 30,90,280...DAYS)
                * THEY WILL DISPLAY WHEN USER CLICKS ON COUNTRY NAME */
                if (num_of_countries) {
                    $('.lists').addClass('d-none')

                    list_of_locations.removeClass('d-none')
                    $.each(data.country_codes, function (key, code) {

                        list_of_locations.append(`
                            
                        <li class="list-group-item no_border chart  mb-1"   
                        title="click to see country progress past 7 days"
                        data-chart_for="country"
                        data-country=${code}
                        data-num_of_days=7
                        
                        style="border-left: 5px solid ${B_colors[key]}; 
                        border-radius:0" 
                        
                        >
                      <strong style="color: ${B_colors[key]}">${feels[key]}</strong>&nbsp;   ${c_labels[key]}  
                      
                    </li> 
                        <li class="controls d-none list-group-item no_border mb-1  text-center" data-c_code=${code}>
                      <span class="gl_btn_round country"  
                      title="click to see  progress past 30 days"
                        data-chart_for=${chart_for}
                        data-country=${code}
                        data-num_of_days=30>30</span> 
                        <span class="gl_btn_round country"
                        title="click to see progress past 90 days"
                         data-chart_for=${chart_for}
                        data-country=${code}
                        data-num_of_days=90>90</span> 
                        <span class="gl_btn_round country" 
                        title="click to see progress past 180 days"
                         data-chart_for=${chart_for}
                        data-country=${code}
                        data-num_of_days=180>180</span>
                         <span class="gl_btn_round country" 
                         title="click to see progress past 360 days"
                         data-chart_for=${chart_for}
                        data-country=${code}
                        data-num_of_days=360>360</span>
                        
                         <hr>
                    <a  href="/${code}" id='${code}' class="gl_button green text-center p-2 " >
                        <span class="smaller_h">EXPLORE MORE</span>
                       
                        </a>
                      
                    </li>
                   
                   `)
                    })
                }
                /*NEED TO ADD EVENT LISTENER TO NEWLY RENDERED COUNTRIES
                * SO THAT WHEN USER CLICKS ON ANY COUNTRY WE WILL DISPLAY
                * CHART FOR THAT PERIOD OF DAYS*/
                $('.chart').on('click', function () {

                   // render_country_chart($(this), num_of_countries)

                        show_country_chart()
                        selected_chart($(this))
                        /*HIDE PREVIOUSLY ADDED BUTTONS*/
                        $('.controls').addClass('d-none')

                        /*show buttons to select duration of charts in days*/
                        $(`[data-c_code=${$(this).data('country')}]`).removeClass('d-none');

                         num_of_days = $(this).data('num_of_days')
                         country_code = $(this).data('country')

                })
                $('.country').on('click',function(){
                  render_country_chart($(this), num_of_countries)
                })


                // RENDERING CHART FOR WORLD PROGRESS AND TOP COUNTRIES
                render_chart(chart_canvas, chart_for, feels, c_labels, B_colors, num_of_countries, num_of_days,
                    chart_for === 'county' ? county_name : country_name)


            });


    })


    function render_country_chart(this_, num_of_countries) {

        show_country_chart()
        selected_chart(this_)
        /*HIDE PREVIOUSLY ADDED BUTTONS*/
        $('.controls').addClass('d-none')

        /*show buttons to select duration of charts in days*/
        $(`[data-c_code=${this_.data('country')}]`).removeClass('d-none');

        var num_of_days = this_.data('num_of_days')
        var country_code = this_.data('country')

        /*GETTING DATA FROM SERVER*/
        $.getJSON('/_chart_data', {

                num_of_days: num_of_days,
                chart_for: 'country',
                country_code: country_code

            },

            function (data) {

                c_labels = data.labels
                feels = data.feels
                B_colors = data.B_colors
                country_name = data.country_name
                counties = data.counties



                /*to prevent old graph on hover*/
                clear_canvas()
                /*end of to prevent old graph on hover*/


                // RENDERING CHART FOR COUNTRY PROGRESS
                render_chart($('#chart'), 'country', feels, c_labels, B_colors, num_of_countries, num_of_days, country_name)


            });
    }

    function render_chart(chart_canvas, chart_for, feels, c_labels, B_colors, num_of_countries, num_of_days, location_name ) {


        var chart = new Chart(chart_canvas, {
            type: chart_for === 'countries' ? 'bar' : 'line',
            data: {
                labels: c_labels,
                datasets: [
                    {
                        label: chart_for === 'countries' || chart_for === 'country' ? "Country feel" : chart_for === 'county' ? 'County feel' : "World feel",
                        backgroundColor: chart_for === 'countries' ? B_colors : [],
                        data: feels,
                        fill: false,
                        borderColor: "#177199",
                    }
                ]
            },
            options: {
                legend: {display: false},
                title: {
                    display: true,
                    text: chart_for === 'countries' ? `Top ${num_of_countries} countries ` : `${chart_for === 'world' ? 'World' : location_name.replace(/\__/g, ' | ').replace(/\_/g, ' ')}   feel past ${num_of_days} days `
                }
            }
        });

        chart.render()
        if (screen.width < 768) $('#chart_holder').get(0).scrollIntoView()
    }

    function clear_canvas() {
        /*to prevent old graph on hover*/
        $("canvas#chart").remove();
        $("div#chart_holder").append('<canvas id="chart"></canvas>');
        /*end of to prevent old graph on hover*/
    }

    /*visual feedback to user that this type of chart is selected*/
    function selected_chart(this_) {
        $('.chart').removeClass('gl_selected')
        this_.addClass('gl_selected')
    }

    function show_country_chart() {

        $('#map_holder').addClass('d-none')
        $('#chart_holder').removeClass('d-none')
    }

    /*USER CAN SELECT WORLD CHARTS OR COUNTRIES CHARTS NEXT TO THE CHARTS*/
    $('.chart_type').on('click', function () {


        var oposite_charts = {world_controls: 'countries_controls', countries_controls: 'world_controls'}
        var current = $(this).data('chart_type')
        list_of_locations.html('')

        /*CHANGING APPEARANCE OF BUTTONS*/
        $(`[data-chart_type=${oposite_charts[current]}]`).addClass('opaque');
        $(`[data-chart_type=${current}]`).removeClass('opaque');

        /*DISPLAYING, HIDING CHARTS CONTROLS*/

        $('#' + current).removeClass('d-none')
        $('#' + oposite_charts[current]).addClass('d-none')
    })
})()