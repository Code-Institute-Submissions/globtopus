(function () {
    $('.form_label').on(('click','focus'), function () {

        var element_id = $(this).attr('id')
        var placeholder_text = $(this).prop('placeholder')
        if($(this).data('label')) {
            var div = element_id+'_label'
        }
        else
        {
            div = element_id
        }


        if (placeholder_text !== '' &&  $("label[for='" + element_id + "']").text().length === 0) {

            sessionStorage.setItem(element_id,placeholder_text)
            console.log('WE HAVE PLACEHOLDER : ' + placeholder_text)
            $(this).prop('placeholder', '')
            $('#' + div).before(` <label for=${element_id} ><small>${placeholder_text}</small></label>`)
        }


    }).on('input', function () {
        var element_id = $(this).attr('id')

        var input_field = $('#' + element_id)
        var label = $("label[for='" + element_id + "']")

        if (input_field.val() === '') {
            input_field.prop('placeholder', sessionStorage.getItem(element_id))
            label.html('')
        }
        else if(input_field.val().length === 1)
        {
            label.html(`<small>${sessionStorage.getItem(element_id)}</small>`)
        }


    })
})()