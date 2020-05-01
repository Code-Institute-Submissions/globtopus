/*FUNCTIONS TO SHOW DIV WITH SEARCH FIELD FOR FEELISTS*/

$(function () {
    $('#feelist').on('click', function () {

        /*AND FOR MOBILE DEVICES WE NEED TO SCROLL TO SEARCH RESULTS*/
        $('#feelist_search').toggleClass('d-none').get(0).scrollIntoView();

    })


})



