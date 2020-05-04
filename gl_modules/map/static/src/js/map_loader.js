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


$("svg").svgPanZoom({
    events: {

        // enables mouse wheel zooming events
        mouseWheel: true,

        // enables double-click to zoom-in events
        doubleClick: true,

        // enables drag and drop to move the SVG events
        drag: true,

        // cursor to use while dragging the SVG
        dragCursor: "move"
    },

// time in milliseconds to use as default for animations.
// Set 0 to remove the animation
    animationTime: 300,

// how much to zoom-in or zoom-out
    zoomFactor: 0.25,

// maximum zoom in, must be a number bigger than 1
    maxZoom: 3,

// how much to move the viewBox when calling .panDirection() methods
    panFactor: 10,

});


