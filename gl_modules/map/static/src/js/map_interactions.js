$('.map_color_legend').on('click', function () {



    var list_of_locations = $('#r_' + $(this).data('range'))
    $('.' + $(this).data('range')).remove()
    list_of_locations.append(`

                    <span class="gl_button mt-2 d-print-none ${$(this).data('range')}" 
                    onclick="swal.close()" title="close"> close</span>
                    
                    <span class="gl_button save_list d-print-none ${$(this).data('range')}" 
                    title="save list" onclick="window.print()"><i class="fas fa-save"></i></span>
                    
                    <hr class="${$(this).data('range')} d-print-none">
                    
                    <small class="blue ${$(this).data('range')} d-print-none">
                    click on link to see country </small>`)


    list_of_locations.prepend(`<img  class="d-none d-print-block" src="assets/dist/images/gloptopus_logo.gif"/>`)

    Swal.fire({

        html: list_of_locations.html(),
        showConfirmButton: false
    })
    // $.getJSON('/_range_countries', {range: range, },
    //
    //     function (data) {
    //
    //
    //         if(screen.width <768) $('#range_countries').get(0).scrollIntoView(1,'slow')
    //         var countries = data.countries
    //         var size = data.size
    //         var counter = 1
    //
    //
    //         $('#country_range').html('').prepend(`<h3>Countries in range : ${range}</h3>`)
    //         $('#table_holder').addClass('dashed_border')
    //
    //         $.each(countries, function (cc, c_data) {
    //
    //
    //             $('#range_countries').append(`
    //              <td class="mr-1 p-1 ">
    //                   <strong >${c_data[0]}</strong>&nbsp;<span class="text-wrap"> ${c_data[1]} </span>
    //              </td>`)
    //
    //         if(counter % 4 === 0 )$('#range_countries').append(` <tr></tr> `)
    //
    //
    //             counter++
    //         })
    //         $('#range_countries').append(`</tr>`)
    //
    //     }),
    //     function (error) {
    //         console.log('our error')
    //     };


})