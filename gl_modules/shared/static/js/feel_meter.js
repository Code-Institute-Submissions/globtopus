/*FUNCTIONALITY TO SHOW USER FEELINGS ON SLIDE RANGE
* AND TO CHANGE TEXT ABOVE ACTIONS PART OF THE FORM
* IF FEELINGS < 51 OR >= 51*/

function feelometer () {



    $('#feeling').on('change', function () {

        var feelings = this.value;

        $('#feeling_holder').val(feelings);

        if(feelings > 51){
            $('#this_or_better').removeClass('d-none');
            $('#better').addClass('d-none');
            $('#slider_result')
                .css('background',"url('assets/dist/images/happy.png')")
                .css('background-repeat', 'no-repeat')


        }
        else{
             $('#this_or_better').addClass('d-none');
             $('#better').removeClass('d-none');
             $('#slider_result')
                .css('background',"url('assets/dist/images/sad.png')")
                .css('background-repeat', 'no-repeat')
        }
    })

 }
 feelometer ()
/*assets/dist/images/avatars/${counter % 38}.png*/