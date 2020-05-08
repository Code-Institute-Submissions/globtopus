(function () {
    /*removing last _*/
    var days = $('#days').data('days').slice(0, -1).split('_');
    var feelings = $('#feelings').data('feelings').slice(0, -1).split('_');
    //rendering users progress
    new Chart(document.getElementById("user_chart"), {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                data: feelings,

                borderColor: "#3e95cd",
                fill: false
            }
            ]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: 'Your progress'
            }
        }
    });

    $('.user_nav').on('click', function () {
        var action = $(this).data('nav')


        if (action === 'my_feelist') {
            $.ajax({
                url: '/_my_feelist',
                type: 'POST',

                success: function (response) {
                    feelists = response.list

                    $.each(feelists, function (key,name) {
                        console.log('list_name '+name)
                    })
                },
                error: function (error) {
                    console.log(error)
                }
            });
        }
    })
})()



