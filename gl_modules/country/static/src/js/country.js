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
            $('.chart_days').data('chart_for', 'country')
            var feels = response.feels

            var new_map = ` <svg xmlns="http://www.w3.org/2000/svg" id="country_map" x="0" y="0" baseProfile="tiny" viewBox="0 0 660 447" xml:space="preserve">`
            var counties = ''
             var fill = '#eeeeee'
            $.each(response.c_map, function (index, map_) {
                var county = Object.keys(map_)[0]
                var d = map_[county]

               var feel = feels[county]


                 if (feel < 20) fill="#006400"


                else if (feel < 40)  fill="#20B2AA"


                else if (feel < 60)   fill="#66FF00"


                else if (feel < 80)  fill="#40E0D0"


                else if (feel <= 100)  fill="#FFFF00"


                counties += `${county} <br>`

                new_map += `<path id="${county}" 
                                data-chart_for="county" 
                                data-num_of_days="10" 
                                class="chart map_chart" 
                                data-county_name="${county}"
                                fill="${fill}" 
                                stroke="#177199" 
                                stroke-width=".25" d="${d}"/>`


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
                ).on('click', function () {

                var num_of_days = $(this).data('num_of_days')
                var county_name = $(this).attr('id')


                /*CHANGING chart_for DATA ATTRIBUTE TO TEAD OF HARD-CODING SECOND SET OF CONTROLS FOR CHARTS
                , => SO THE CHARTS WILL BE RENDERED FOR SELECTED COUNTY

                CHANGING IT BACK TO COUNTRY WHEN USER CLICKS ON CHART BUTTON*/
                $('.chart_days').data('chart_for', 'county').data('county_name',county_name)


                $('#map_holder').addClass('d-none')

                $('#chart_holder').removeClass('d-none')

                /*to prevent old graph on hover*/
                $("canvas#chart").remove();
                $("div#chart_holder").append('<canvas id="chart"></canvas>');
                /*end of to prevent old graph on hover*/
                $.getJSON('/_chart_data',
                    {
                        num_of_days: num_of_days,
                        county_name: county_name,
                        chart_for: 'county'
                    },
                    function (data) {
                        // RENDERING CHART FOR COUNTY PROGRESS

                        c_labels = data.labels
                        feels = data.feels
                        new Chart(document.getElementById("chart"), {
                            type: 'line',
                            data: {
                                labels: c_labels,
                                datasets: [{
                                    label: 'County feel',
                                    backgroundColor: [],
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
                                    text: `${county_name}    feel past ${num_of_days} days `
                                }
                            }
                        });

                        // chart.render()
                       if (screen.width < 768)  $('#chart_holder').get(0).scrollIntoView()
                    })

            })


        })


})()