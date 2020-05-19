

$('.map_color_legend').on('click', function () {

    var range = $(this).data('range')
    var range_countries = $('#range_countries')
    range_countries.html('')
    $.getJSON('/_range_countries', {range: range, },

        function (data) {


            if(screen.width <768) $('#range_countries').get(0).scrollIntoView(1,'slow')
            countries = data.countries
            size = data.size
            var counter = 1


            $('#country_range').html('').prepend(`<h3>Countries in range : ${range}</h3>`)
            $('#table_holder').addClass('dashed_border')
            $.each(countries, function (cc, c_data) {


                $('#range_countries').append(`
                 <td class="mr-1 p-1 ">   
                      <strong >${c_data[0]}</strong>&nbsp;<span class="text-wrap"> ${c_data[1]} </span> 
                 </td>`)

            if(counter % 4 === 0 )$('#range_countries').append(` <tr></tr> `)


                counter++
            })
            $('#range_countries').append(`</tr></table>`)

        }),
        function (error) {
            console.log('our error')
        };


})