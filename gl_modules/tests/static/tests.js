(function () {
    $('#run_tests').on('click', function () {

        var form_data_arr = $('#test_form').serializeArray()

        var missing_fields = ''
        var form_data = {}
        $.each(form_data_arr, function (key, input) {
            form_data[input.name] = input.value
            if (input.value === '')
                missing_fields += `${input.name}<br>`


        })
        if (missing_fields !== '') {
            swal.fire({
                title: "Missing fields",
                html: missing_fields
            })
        } else {
            console.log(form_data)
            $.getJSON('/run_tests',
                {
                    action_1: form_data['action_1'],
                    action_2: form_data['action_2'],
                    because_1: form_data['because_1'],
                    because_2: form_data['because_2'],
                    i_feel_1: form_data['i_feel_1'],
                    i_feel_2: form_data['i_feel_2'],
                    password_1: form_data['password_1'],
                    password_2: form_data['password_2'],
                    useremail_1: form_data['useremail_1'],
                    useremail_2: form_data['useremail_2'],
                    username_1: form_data['username_1'],
                    username_2: form_data['username_2'],
                },
                function (response) {

                    if (response.error) {
                        swal.fire({
                            html: `<p class="flash_error text-light">${response.results}</p>`
                        })
                    } else {
                        var pass = true
                        $.each(response.results, function (key, value) {
                            if (value === 'pass')
                                $('#' + key).addClass('flash_success text-light').html(value)
                            else {
                                $('#' + key).addClass('flash_error text-light').html(value)
                                pass = false
                            }

                        })

                        if (pass) $('#testing').html('').append(`
                                        <hr>
                                        EMAIL : ${form_data['useremail_1']} <br>
                                        PASSWORD : ${form_data['password_1']} <br><br><br>
                                        <a href="/sign_in"  class="gl_button p-3">Sign in</a>
                                    <hr> <p class="flash_success text-light">Sign in as first user to check it</p> <hr> or see
                                posts live <br><br><br><a href="/"  class="gl_button p-3 ">Your first post on globtopus...;-)</a>`)

                            $('#test').get(0).scrollIntoView()
                    }


                })
        }

    })
})()