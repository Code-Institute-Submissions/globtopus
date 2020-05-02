/*FUNCTIONS FOR INTERACTIONS WITH CHARTS
* DISPLAYING HOW DO WORLD COUNTRIES FEEL */

(function () {
    $('#charts').on('click', function () {
        $('.landing_interaction').addClass('d-none')
        $('#chart_search').removeClass('d-none')
        $('#bottom_of_chart').get(0).scrollIntoView()
                var days = []
                var day_feels =[]
                var B_colors =[]
                var num_of_days = 50
        /*AJAX REQUEST TO GET RESULTS*/
        $.getJSON('/_world_feel', {
                num_of_days: num_of_days,

            },

            function (data) {

                 days = data.days
                 day_feels = data.day_feels
                 B_colors = data.B_colors
                console.log(B_colors)
                 // Bar chart
                new Chart(document.getElementById("bar-chart"), {
                    type: 'bar',
                    data: {
                        labels: days,
                        datasets: [
                            {
                                label: "World feel",
                                backgroundColor: B_colors,
                                data: day_feels,
                                 fill: false,
                               borderColor: "#e8c3b9",
                            }
                        ]
                    },
                    options: {
                        legend: {display: false},
                        title: {
                            display: true,
                            text: `World feel past ${num_of_days} days`
                        }
                    }
                });

            });





    })
})()