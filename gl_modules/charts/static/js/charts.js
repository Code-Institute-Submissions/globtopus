/*FUNCTIONS FOR INTERACTIONS WITH CHARTS
* DISPLAYING HOW DO WORLD COUNTRIES FEEL */

(function () {

    var country_list = $('#country_list')


    $('#charts,.chart').on('click', function () {

        selected_chart($(this))
        if ($(this).attr('id') === 'charts') {
            $('#world').removeClass('d-none')
        }


        $('.landing_interaction').addClass('d-none')
        $('#chart_search').removeClass('d-none')
        $('#bottom_of_chart').get(0).scrollIntoView()
        country_list.html('')

        var type = 'world'

        if ($(this).data('num_of_countries')) {
            type = 'countries'
        }


        var num_of_days = $(this).data('num_of_days')
        var num_of_countries = $(this).data('num_of_countries')
        var country_code = $(this).data('country')

        /*to prevent old graph on hover*/
        clear_canvas()
        /*end of to prevent old graph on hover*/

        var chart_canvas = $('#chart')

        /*AJAX REQUEST TO GET RESULTS*/
        $.getJSON('/_chart_data', {
                num_of_days: num_of_days,
                num_of_countries: num_of_countries,
                type: type,
                country_code: country_code

            },

            function (data) {


                c_labels = data.labels
                feels = data.feels
                B_colors = data.B_colors


                if (num_of_countries) {
                    $('.lists').addClass('d-none')

                    country_list.removeClass('d-none')
                    $.each(data.country_codes, function (key, code) {

                        country_list.append(`
                            
                        <li class="list-group-item no_border chart country mb-1"   
                        title="click to see country progress past 7 days"
                        data-type="country"
                        data-country=${code}
                        data-num_of_days=7
                        
                        style="border-left: 5px solid ${B_colors[key]}; 
                        border-radius:0" 
                        
                        >
                      <strong style="color: ${B_colors[key]}">${feels[key]}</strong>&nbsp;   ${c_labels[key]}  
                      
                    </li> 
                    <li class="controls d-none list-group-item no_border mb-1" data-c_code=${code}>
                      <span class="gl_btn_round country"  
                      title="click to see country progress past 30 days"
                        data-type="country"
                        data-country=${code}
                        data-num_of_days=30>30</span> 
                        <span class="gl_btn_round country"
                        title="click to see country progress past 90 days"
                         data-type="country"
                        data-country=${code}
                        data-num_of_days=90>90</span> 
                        <span class="gl_btn_round country" 
                        title="click to see country progress past 180 days"
                         data-type="country"
                        data-country=${code}
                        data-num_of_days=180>180</span>
                         <span class="gl_btn_round country" 
                         title="click to see country progress past 360 days"
                         data-type="country"
                        data-country=${code}
                        data-num_of_days=360>360</span>
                      
                    </li>
                   `)
                    })

                    $('.country').on('click', function () {
                        selected_chart($(this))
                        /*HIDE PREVIOUSLY ADDED BUTTONS*/
                        $('.controls').addClass('d-none')
                        /*show buttons to select duration of charts in days*/
                        $(`[data-c_code=${$(this).data('country')}]`).removeClass('d-none');
                        var num_of_days = $(this).data('num_of_days')
                        var country_code = $(this).data('country')
                        $.getJSON('/_chart_data', {

                                num_of_days: num_of_days,
                                type: 'country',
                                country_code: country_code

                            },

                            function (data) {

                                c_labels = data.labels
                                feels = data.feels
                                B_colors = data.B_colors
                                country_name = data.country_name

                                /*to prevent old graph on hover*/
                                clear_canvas()
                                /*end of to prevent old graph on hover*/

                                var chart_canvas = $('#chart')

                                // Bar chart
                                render_chart(chart_canvas, 'country', c_labels, B_colors, num_of_countries, num_of_days,country_name)




                            });

                    })


                }


                // Bar chart
                render_chart(chart_canvas, type, c_labels, B_colors, num_of_countries, num_of_days)


            });


    })

    function render_chart(chart_canvas, type, c_labels, B_colors, num_of_countries, num_of_days,country_name) {
        // Bar chart

        var chart = new Chart(chart_canvas, {
            type: type === 'countries' ? 'bar' : 'line',
            data: {
                labels: c_labels,
                datasets: [
                    {
                        label: type === 'countries' || type === 'country' ? "Country feel" : "World feel",
                        backgroundColor: type === 'countries' ? B_colors : [],
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
                    text: type === 'countries' ? `Top ${num_of_countries} countries ` : `${type === 'world' ? 'World' : country_name}   feel past ${num_of_days} days `
                }
            }
        });

        chart.render()
        $('#chart_holder').get(0).scrollIntoView()
    }

    function clear_canvas() {
        /*to prevent old graph on hover*/
        $("canvas#chart").remove();
        $("div#chart_holder").append('<canvas id="chart"></canvas>');
        /*end of to prevent old graph on hover*/
    }

    function selected_chart(this_)
    {
        $('.chart').removeClass('gl_selected')
        this_.addClass('gl_selected')
    }

    /*USER CAN SELECT WORLD CHARTS OR COUNTRIES CHARTS*/
    $('.chart_type').on('click', function () {


        var oposite_charts = {world: 'countries', countries: 'world'}
        var current = $(this).data('chart_type')
        country_list.html('')
        /*CHANGING APPEARANCE OF BUTTONS*/
        $(`[data-chart_type=${oposite_charts[current]}]`).addClass('opaque');
        $(`[data-chart_type=${current}]`).removeClass('opaque');

        /*DISPLAYING, HIDING CHARTS CONTROLS*/
        $('#' + oposite_charts[current]).addClass('d-none')
        $('#' + current).toggleClass('d-none')
    })
})()