/*FUNCTIONALITY TO SHOW USER FEELINGS ON SLIDE RANGE
* AND TO CHANGE TEXT ABOVE ACTIONS PART OF THE FORM
* IF FEELINGS < 51 OR >= 51*/

(function () {



    $('#feeling').on('change', function () {

        var feelings = this.value;

        $('#feeling_holder').val(feelings);

        if(feelings > 51){
            $('#this_or_better').removeClass('d-none');
            $('#better').addClass('d-none');
        }
        else{
             $('#this_or_better').addClass('d-none');
             $('#better').removeClass('d-none');
        }
    });
})();

