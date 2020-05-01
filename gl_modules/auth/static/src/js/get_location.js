/*GETTING LOCATION DETAILS ON sign_up.html
 *
 * USING nominatim.openstreetmap.org/reverse API
 *
 * */


(function () {

    /*INITIAL COORDINATES OF THE MAP WITH ZOOM 1 */
    var mymap = L.map('map_sign_up').setView([23.757195, -17.226563], 1);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 9,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11'
    }).addTo(mymap);

    var popup = L.popup({
        /*CUSTOM CLASS FOR POPUP*/
        className: 'popup_class'

    });

    mymap.on('click', getCoordinates);

//WHEN USER CLICKS ON THE MAP WHEN SELECTING THE LOCATION
// POPUP WILL SHOW WITH COORDINATES AND get_address BUTTON*/

    function getCoordinates(e) {


        var coordinates = e.latlng.toString()
            .replace('LatLng(', '')
            .replace(')', '')
            .replace(' ', '')
            .split(',');

        popup
            .setLatLng(e.latlng)
            .setContent(` <i class = "fas fa-map-marker-alt" >  ${coordinates[0]} , ${coordinates[1]}
					              <br><button type="submit" id="get_address"
										class="bg-warning  btn btn-sm p-0 float-right ___"
										data-title="click to get location details"
										data-text="get details"
										data-cy="get_details">get details</button>`)
            .openOn(mymap);


        /*USING nominatim API FROM openstreetmap TO DO REVERSE SEARCH AND
         *WHEN USER CLICKS ON get details WE'LL
         * TAKE THE this.responseText AND TAKE address   FROM IT
         * TO DISPLAY LOCATION DETAILS TO OWNER WITH
         * render_location_details() FUNCTION*/

        var url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates[0]}&lon=${coordinates[1]}`;

        $('#get_address').removeClass('d-none').on('click', function () {

            getAddress(url, coordinates);

            // swal.fire ( {
            // 	            html              : `<img src="assets/src/images/loader.gif" alt="loader">`,
            // 	            showConfirmButton : false,
            // 	            position          : 'top',
            // 	            width             : 100
            //             } );


//				TO PREVENT PAGE FROM RELOADING AND CLEARING LOCATION DETAILS FROM THE FORM

					/*ON MOBILE DEVICES USER WOULDN'T SEE ADDRESS DIV , WHERE HE NEEDS TO INPUT PROPERTY NAME
					 * SO TO MAKE IT EASIER WE WILL SCROLL TO THAT DIV*/
					$ ( '#location_n' ).get ( 0 ).scrollIntoView ();
            return false;

        });


    }


    /*GETTING ADDRESS DETAILS FORM nominatim.openstreetmap.org/reverse API */
    function getAddress(url) {


        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {


                /*TO HIDE get_address, BECAUSE USER ALREADY GOT DETAILS FORM API
                 * TO PREVENT MULTIPLE CLICKS FOR THE SAME LOCATION
                 *
                 * THERE IS ALSO LIMIT OF MAX 1 REQUEST PER SECOND FROM
                 * nominatim.openstreetmap.org/reverse API AT THE MOMENT*/
                $('#get_address').addClass('d-none');

                var address_data = JSON.parse(this.responseText).address;

                render_location_details(address_data);

                /*CLOSING LOADER GIF ALERT*/
                swal.close();
            }

        };

        xhr.open("GET", url);
        xhr.send();

        /*THERE IS ERR_CONNECTION_TIMED_OUT HAPPENING SOMETIMES,
         * SO WE WILL NOTIFY USER TO TRY AGAIN LATER */
        xhr.onerror = function () {
            swal.fire({
                html: `<h4>Server error!</h4>
																<hr class="bg-danger">
																<code>net::ERR_CONNECTION_TIMED_OUT</code>
																<hr class="bg-danger">
																<p>Please try again later!</p>`,
                showConfirmButton: true,
                confirmButtonColor: '#0fbeba',

                confirmButtonText: `<i class="fas fa-check-circle"></i>`
            });
        };

    }

})();


/*APPENDING ADDRESS DETAILS TO THE FORM
 * WE MAKE COUNTRY, COUNTY OR STATE*/
function render_location_details(address_data) {

   /*if user selects part of the map without location data ( sea , mountain range ...)
   * we will inform him to try again and add text-danger to bring his attention to it*/
    if (address_data === undefined) {
        $('#location_n').text('Please try again!Could not get your location.').addClass('text-danger')
    } else {
        $('#country').val(address_data['country'])

        /*in data coming in from nominatim there could be state or county missing, but always at least one
        * of them so we need to check for it and display one of them in order : first state, then
        * available county*/
        var county = address_data ['state'] !== undefined ? address_data ['state'] :
            address_data ['county'] !== undefined ?  address_data ['county'] : "";

        $('#county').val(county)
        $('#country_code').val(address_data['country_code'])

        $('#location_n').text(address_data['country'] + ' - ' +   county)
            .removeClass('text-danger')
    }


}



