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
                if (feel < 49) $(this).attr('fill', "red")
                else if (feel < 50) $(this).attr('fill', 'green')
                else if (feel < 51) $(this).attr('fill', 'blue')
                else if (feel < 52) $(this).attr('fill', 'cyan')
                else if (feel < 53) $(this).attr('fill', 'salmon')
                else if (feel < 54) $(this).attr('fill', 'grey')
                else if (feel < 55) $(this).attr('fill', 'magenta')
                else if (feel < 56) $(this).attr('fill', 'yellow')
                else if (feel < 57) $(this).attr('fill', 'purple')
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

