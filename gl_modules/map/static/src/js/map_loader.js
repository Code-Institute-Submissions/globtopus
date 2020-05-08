(function () {

    var country_feels
    var people

    var paths = $('path')
    $.ajax({
        url: '/_country_feel',
        // data: $('form').serialize(),
        type: 'POST',
        success: function (response) {
            country_feels = response.feels
            people = response.total_people


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



        },
        error: function (error) {
            console.log('we could not load data');
        }
    });



})()



