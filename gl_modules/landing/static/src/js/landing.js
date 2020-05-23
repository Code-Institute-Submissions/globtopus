$(function () {
    $('#posts').on('click', function () {
        /*HIDE ANY PREVIOUSLY OPEN DIVS ( CHARTS, MAPS)*/
        $('.landing_interaction').addClass('d-none')
        $('.feel_form').addClass('d-none')
        /*AND FOR MOBILE DEVICES WE NEED TO SCROLL TO SEARCH RESULTS*/
        $('#post_search').toggleClass('d-none');
scroll_into_view()

    })
 /*CLICKING ON write BUTTON UNDER THE GLOBE TO SEE FORM ON MOBILE DEVICES*/
    $('#write_post').on('click', function () {
        $('.feel_form').removeClass('d-none')
        $('.landing_interaction').addClass('d-none')
       scroll_into_view()
    })

    /*CLICKING ON map BUTTON UNDER THE GLOBE TO SEE MAP*/
    $('#map').on('click', function () {
        /*HIDE ANY PREVIOUSLY OPEN DIVS ( CHARTS, MAPS)*/
        $('.landing_interaction').addClass('d-none')
        $('.feel_form').addClass('d-none')

        /*SHOW DIV WITH MAP*/
        var map_search = $('#map_search')
        map_search.removeClass('d-none')

      scroll_into_view()

    })

    function scroll_into_view() {
 if (screen.width < 768) $('#posts').get(0).scrollIntoView(1, 'slow')
    }
})



