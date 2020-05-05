(function () {

    $('#map').on('click', function () {
        /*HIDE ANY PREVIOUSLY OPEN DIVS ( CHARTS, MAPS)*/
        $('.landing_interaction').addClass('d-none')
        /*DIV F0R DISPLAYING CHARTS*/
        $('#map_search').removeClass('d-none')
        $('#map_search').get(0).scrollIntoView()
    })

    var current_fill
    $('path').on('mouseenter',
        function () {

            current_fill = $(this).attr('fill')
            $(this).attr('fill',"rgba(111, 227, 0, 0.3)")
            $('#current').html(country_name($(this)) )
        })
        .on('mouseleave',
            function () {
            $(this).attr('fill',current_fill)


            }
        ).on('click',
        function () {
            $('#current_info').html(`
                   
                   <span > country :</span> <br><span class="smaller_h text-wrap"> ${country_name($(this))} </span><br>
                   <span>${$(this).attr('id')}</span><br>
                    <span > number of people : </span> <span class="smaller_h"> 
                      ${new Intl.NumberFormat(navigator.language).format($(this).data('people'))} 
                     </span>
                    <hr>
                     <span class="smaller_h user_heart country d-flex justify-content-center align-items-center"> 
                        ${new Intl.NumberFormat(navigator.language).format($(this).data('feel'))} </span>
                      
                        <hr>
                         <p id='${$(this).attr('id')}' class="gl_button green text-center p-3 text-wrap">
                        <span class="smaller_h"> see globs in</span> <br> ${country_name($(this))}</p>
                        <span >You can save them into your feelist!</span>
                `)
        });

    function country_name(_this) {
        if (_this.data('cn2')) return _this.data("cn2")
        else if (_this.data('cn')) return _this.data("cn")
    }

var MapControl  = new SVGPanZoom(document.getElementById('world'), {
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
    $('.map_controls').on('click', function () {

        var action = $(this).data('action')
        if(action === 'zoomIn') MapControl.zoomIn()
        if(action === 'zoomOut') MapControl.zoomOut()
         if(action === 'panLeft') MapControl.panLeft()
         if(action === 'panRight') MapControl.panRight()
         if(action === 'panUp') MapControl.panUp()
         if(action === 'panDown') MapControl.panDown()
         if(action === 'reset') MapControl.reset()
        /*to do redo for mobile*/
        /*moving the map according to user needs. action on the button is in data-action attribute*/
        //window["svgPanZoom"][$(this).data('action')]();
    })
})()