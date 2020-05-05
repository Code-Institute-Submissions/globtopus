(function () {

    $('#map').on('click', function () {
        /*HIDE ANY PREVIOUSLY OPEN DIVS ( CHARTS, MAPS)*/
        $('.landing_interaction').addClass('d-none')
        /*DIV F0R DISPLAYING CHARTS*/
        $('#map_search').removeClass('d-none')
        $('#map_search').get(0).scrollIntoView()
    })

    $('path').on('mouseenter',
        function () {


            $('#current').html(country_name($(this)))
        })
        .on('mouseleave',
            function () {


            }
        ).on('click',
        function () {
            $('#current_info').html(`
                   
                   <span > country :</span> <br><span class="smaller_h text-wrap"> ${country_name($(this))} </span><br>
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

    $('.map_controls').on('click', function () {


        /*moving the map according to user needs. action on the button is in data-action attribute*/
        window["svgPanZoom"][$(this).data('action')]();
    })
})()