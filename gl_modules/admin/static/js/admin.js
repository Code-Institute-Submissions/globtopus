import {Toast} from "../../../shared/static/js/swal_toast.js";

(function () {


    $('.flaged').on('click', function () {


        var action = $(this).data('action')
        var post_id = $(this).data('post_id')
        var user_id = $(this).data('user_id')

        Swal.fire({
            html: `    <img  src="assets/dist/images/sad.png"/>
                                    <h4 class="danger_title">${action} post?</h4>
                                    `,

            showCancelButton: true,
            buttonsStyling: false,
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!',
            customClass: {
                confirmButton: 'gl_button cy-confirm',
                cancelButton: 'gl_button danger'
            },
        }).then((result) => {
            if (result.value) {
                $.getJSON(action === 'delete' ? '/delete_flaged_post' : '/return_flaged_post',
                    {post_id: post_id, user_id: user_id},
                    function (response) {

                        if (response.deleted === 'deleted' || response.returned_back === 'returned') {

                            $('#' + post_id).remove()

                            Toast.fire({

                                html: `<img  src="assets/dist/images/happy.png"/><p class="text-success">${action} succesful!</h4> 
                                       `,
                            })

                        }

                    }, function (error) {
                        Toast.fire({
                            html: ` <img  src="assets/dist/images/sad.png"/>
                                                    <p class="text-danger">Something is wrong. <br> Please try later!</h4> 
                                       `,
                        })
                    })
                 window.location.reload()
            }
        })


    })
})()