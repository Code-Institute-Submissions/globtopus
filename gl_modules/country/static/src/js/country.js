/*LOADING COUNTRY MAP FROM DB AS WELL AS COUNTRY FEELS
* AND APPLYING COLOR TO COUNTIES ACCORDING TO FEELING IN THE COUNTY*/

(function () {
    /*SWITCHING DIVS VISIBILITY*/
    $('#country_map').on('click', function () {
        $('#map_holder').removeClass('d-none')
        $('#chart_holder').addClass('d-none')
    })

    var locations_list = []

    /*LOADING THE MAP AND RENDERING MAP CONTROLLS AS WELL*/
    $.getJSON('/load_map',
        {
            cc: $('#c_search').data('cc')
        },
        function (response) {
            $('.chart_days').data('chart_for', 'country')
            var feels = response.feels

            var new_map = ` <div class="row no-gutters">
                <div class="col-md-6  text-center border_green border_bottom_only p-2"
                 data-step="4"
                  data-intro="Hovering over the map will give you the county name here.">
                    <span id="current">Hover over map to see location name here</span>
                </div>
                <div class="col-md-6  text-center border_green border_bottom_only d-flex justify-content-around">
                    <span class="map_color_legend map_20" data-range="20"
                    data-step="5"
                  data-intro="Clicking on one of these buttons will display counties in that range! If you click
                  on the county link, you will see progress of that county on the chart!"><20 </span>
                    <span class="map_color_legend map_40" data-range="40"><40 </span>
                    <span class="map_color_legend map_60" data-range="60"><60 </span>
                    <span class="map_color_legend map_80" data-range="80"><80 </span>
                    <span class="map_color_legend map_100" data-range="100">≤100 </span>
                    <span class="map_color_legend" data-range="all" 
                     data-step="6"
                  data-intro="Clicking on the list button will display all counties!
                  If you click
                  on the county link, you will see progress of that county on the chart!"><i class="fas fa-list"></i></span>
                </div>
            </div> <svg xmlns="http://www.w3.org/2000/svg" id="country_map" x="0" y="0" baseProfile="tiny" viewBox="0 0 660 447" xml:space="preserve">`

            var fill = '#eeeeee'

            /*ADDING COLOR TO COUNTIES ACCORDING TO COUNTY FELINGS*/
            $.each(response.c_map, function (index, map_) {
                var county = Object.keys(map_)[0]
                var d = map_[county]

                var feel = feels[county]
                locations_list[county] = feel

                if (feel < 20) {
                    fill = "#006400"
                    /*APPENDING COUNTIES IN THAT RANGE INTO THE DIVS, AND ON CLICK ON THE RANGE BUTTON, WE WILL LIFT IT WITH SWEETALERT POPUP*/
                    $('#r_20').append(chart_link(county, feel))
                } else if (feel < 40) {
                    fill = "#20B2AA"

                    $('#r_40').append(chart_link(county, feel))
                } else if (feel < 60) {
                    fill = "#66FF00"

                    $('#r_60').append(chart_link(county, feel))
                } else if (feel < 80) {
                    fill = "#40E0D0"

                    $('#r_80').append(chart_link(county, feel))
                } else if (feel <= 100) {
                    fill = "#FFFF00"

                    $('#r_100').append(chart_link(county, feel))
                }

                $('#r_all').append(chart_link(county, feel))

                /*ASSEMBLING SVG PATHS OF THE COUNTRY MAP, DATA LIKE d and id ARE STORED IN MONGODB AND ADDING THE REST HERE*/
                new_map += `<path id="${county}" 
                                data-chart_for="county" 
                                data-num_of_days="10" 
                                class="chart map_chart" 
                                data-county_name="${county}"
                                fill="${fill}" 
                                stroke="#177199" 
                                stroke-width=".25" d="${d}"/>`


            })


            $('#r_100,#r_80,#r_60,#r_40,#r_20,#r_all').append(`<br>`)
            new_map += `</svg>`
            /*ASSIGNING THE MAP TO DIV*/
            $('#map_holder').html(new_map)

            /*WHEN USER CLICKS ON COLOR RANGE BUTTON, WE WILL SHOW HIM COUNTIES IN THAT RANGE*/
            $('.map_color_legend').on('click', function () {

                show_list($(this))

                /*WHEN HE CLICKS ON THE COUNTY LINK IN POPUP, WE WILL DISPLAY CHART FOR THAT COUNTY*/
                $('.map_chart').on('click', function () {
                    show_county_chart($(this))
                    swal.close()
                })
            })
            /*ON HOVERING THE MAP WE ARE APPLIYNG RED BORDER AROUND THE PATHS*/
            $('path').on('mouseenter',
                function () {


                    $(this).attr('stroke', "red").attr('stroke-width', 2)
                    $('#current').html($(this).attr('id')
                        .replace(/\__/g, ' | ')
                        .replace(/\_/g, ' '))
                })
                .on('mouseleave',
                    function () {

                        $(this).attr('stroke', "#177199").attr('stroke-width', 0.25)


                    }
                ).on('click', function () {
 /*WHEN HE CLICKS ON THE COUNTY MAP, WE WILL DISPLAY CHART FOR THAT COUNTY*/
                show_county_chart($(this))

            })

            function show_county_chart(this_) {
                var num_of_days = this_.data('num_of_days')
                var county_name = this_.attr('id')


                /*CHANGING chart_for DATA ATTRIBUTE TO TEAD OF HARD-CODING SECOND SET OF CONTROLS FOR CHARTS
                , => SO THE CHARTS WILL BE RENDERED FOR SELECTED COUNTY

                CHANGING IT BACK TO COUNTRY WHEN USER CLICKS ON CHART BUTTON*/
                $('.chart_days').data('chart_for', 'county').data('county_name', county_name)


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

                        var c_labels = data.labels
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
                                    text: `${county_name.replace(/\__/g, ' | ').replace(/\_/g, ' ')}    feel past ${num_of_days} days `
                                }
                            }
                        });

                        // chart.render()
                        if (screen.width < 768) $('#chart_holder').get(0).scrollIntoView()
                    })
            }


        })


})()

function show_list(this_) {
    /*GETTING DIV WITH LOCATIONS IN THAT RANGE PREVIOUSLY RENDERED INTO THE DIVS*/
    var list_of_locations = $('#r_' + this_.data('range'))
    $('.' + this_.data('range')).remove()
    list_of_locations.append(`

                    <span class="gl_button mt-2 d-print-none ${this_.data('range')}" 
                    onclick="swal.close()" title="close"> close</span>
                    
                    <span class="gl_button save_list d-print-none ${this_.data('range')}" 
                    title="save list" onclick="window.print()"><i class="fas fa-save"></i></span>
                    
                    <hr class="${this_.data('range')} d-print-none">
                    
                    <small class="blue ${this_.data('range')} d-print-none">
                    click on link to see chart <i class="fas fa-chart-line"></i></small>`)


    list_of_locations.prepend(`<img  class="d-none d-print-block" src="assets/dist/images/gloptopus_logo.gif"/>`)
/*AND DISPLAYING THE NAMES WITH LINKS TO DISPLAY CHARTS*/
    Swal.fire({

        html: list_of_locations.html(),
        showConfirmButton: false
    })

}
/*COUNTY LINK IN THE POPUP HAS A CLASS chart TO DISPLAY COUNTY CHART*/
function chart_link(county, feel) {

    return `<span class="list-group-item no_padding">
                             <a id="${county}" 
                                data-chart_for="county" 
                                data-num_of_days="10" 
                                class="chart map_chart" 
                                data-county_name="${county}">
                                ${feel.toFixed(2)} - ${county.replace(/\__/g, ' | ').replace(/\_/g, ' ')}</a><br>

                        </span>  `
}