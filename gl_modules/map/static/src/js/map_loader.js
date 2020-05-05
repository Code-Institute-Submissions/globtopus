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
            people = response.current_people


            $.each(paths, function (key, value) {

                $(this).data('people', people[$(this).attr('id')]);
                var feel = country_feels[$(this).attr('id')]
                $(this).data('feel', feel)

                if (feel < 20) $(this).attr('fill', "#006400")
                // else if (feel < 20) $(this).attr('fill', '#387400')
                // else if (feel < 30) $(this).attr('fill', '#419000')
                else if (feel < 40) $(this).attr('fill', '#20B2AA')
                     // else if (feel < 50) $(this).attr('fill', '#4FB900')
                     else if (feel < 60) $(this).attr('fill', '#66FF00')
                     // else if (feel < 70) $(this).attr('fill', '#58D500')
                     else if (feel < 80) $(this).attr('fill', '#32CD32')
                     // else if (feel < 90) $(this).attr('fill', '#61F100')
                else if (feel <= 100) $(this).attr('fill', 'salmon')

                else $(this).attr('fill', 'black')
                    ;
            });

        },
        error: function (error) {
            console.log('we could not load data');
        }
    });


})()


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
      callback: function callback(multiplier) {}
    },
            });

