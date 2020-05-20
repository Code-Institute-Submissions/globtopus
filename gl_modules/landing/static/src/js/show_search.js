/*FUNCTIONS TO SHOW DIV WITH SEARCH FIELD FOR FEELISTS*/

$(function () {
    $('#posts').on('click', function () {
        /*HIDE ANY PREVIOUSLY OPEN DIVS ( CHARTS, MAPS)*/
        $('.landing_interaction').addClass('d-none')
        /*AND FOR MOBILE DEVICES WE NEED TO SCROLL TO SEARCH RESULTS*/
        $('#post_search').toggleClass('d-none').get(0).scrollIntoView();


    })


})



