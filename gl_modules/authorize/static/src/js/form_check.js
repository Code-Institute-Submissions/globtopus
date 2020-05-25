/*GETTING LOCATION DETAILS ON sign_up.html
 *
 * USING nominatim.openstreetmap.org/reverse API
 *
 * */


(function () {

$('#country_name,#county_name').on('click', function () {
 if (screen.width < 768 && $('#country_name').val() === '' && $('#county_name').val() === '') {
     $('#svg_map').get(0).scrollIntoView(1, 'slow')
 }
})

$('#sign_up').on('click', function (e) {
    console.log('country',$('#country_name').html(), 'county', $('#county_name').val())
    if ($('#country_name').val() === '')
    {
        e.preventDefault()
        swal.fire({
            html:form_message('country'),
            showConfirmButton:false
        })
    }
  else  if ($('#county_name').val() === '')
    {
        e.preventDefault()
        swal.fire({
            html:form_message('county'),
            showConfirmButton:false
        })
    }

    function form_message(location){
        return `<p class="border_blue_l text-danger p-2">Please select ${location} by clicking on the map, or by selecting ${location}, by clicking
                    on list icon <br> <span><i class="fas fa-list"></i></span><br> and selecting ${location} from the list!</p>
                        <hr>
                    <span class=" gl_button" onclick="swal.close()">OK</span>`
    }
})
})();





