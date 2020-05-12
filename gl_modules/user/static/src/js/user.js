(function () {
    /*removing last _*/

    var days = $('#days').data('days').slice(0, -1).split('_');
    var feelings = $('#feelings').data('feelings').slice(0, -1).split('_');
    //rendering users progress
    new Chart(document.getElementById("user_chart"), {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                data: feelings,

                borderColor: "#3e95cd",
                fill: false
            }
            ]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: 'Your progress'
            }
        }
    });


    $('.feelist').on('click', function () {

        var f_name = $(this).data('f_name')
        $.getJSON('/_my_feelist', {
                f_name: f_name

            },

            function (response) {
                var f_actions = response.f_actions
                $('.user_interaction').addClass('d-none')
                var feelist = $('#feelists')
                feelist.removeClass('d-none').html('')
                var counter = 0
                feelist.append(`<h4 class="feelist_title" >${f_name} 
                <small  class="float-right delete_feelist" title="Delete feelist?" data-f_name="${f_name}">
                 <i class="far fa-trash-alt"></i></small></h4>    `)
                for (var action of f_actions) {
                    counter++

                    feelist.append(` <div class="card mb-3 mt-3 feelist_action " id="${action.post_id}" style="max-width: 540px;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4 ">
                                            <img class="avatar" src="assets/dist/images/avatars/${counter % 12}.png"/>
                                            <div class="d-flex justify-content-center"><a href="#" class="user">${action.name}</a></div>
                                        </div>
                                        <div class="col-md-8 p-1">

                                            <div class="card-body  m-0">
                                                <p class="card-text m-1 blue">
                                                    
                                                    When I feel/feel like... <span class="i_feel text-secondary">${action.i_feel}</span></p>

                                                <p class="card-text m-1">Because...<span class="because">${action.because}</span></p>

                                                <p class="card-text m-1">I ...  <span class="card-text">${action.action}</span></p>

                                                <p class="card-text float-right">
                                                    <small class="delete_action" title="Remove from list?"
                                                    data-post_id="${action.post_id}">
                                                    <i class="far fa-trash-alt"></i>
                                                   </small>
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>`)
                }

                $('.delete_action').on('click', function () {
                    var post_id = $(this).data('post_id')

                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.value) {
                            $.getJSON('/delete_action', {post_id: post_id},
                        function (response) {
                                console.log('response is '+response.deleted)
                                if(response.deleted === 'deleted')
                                {

                                    $( '#'+post_id ).remove()

                                }

                        },function (error) {
                                    console.log(error)
                                }
                        )
                        }
                    })



                })
                 $('.delete_feelist').on('click', function () {
                    var f_name = $(this).data('f_name')

                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.value) {
                            $.getJSON('/delete_feelist', {f_name: f_name},
                        function (response) {
                                console.log('response is '+response.deleted)
                                if(response.deleted === 'deleted')
                                {

                                    window.location.reload()

                                }

                        },function (error) {
                                    console.log(error)
                                }
                        )
                        }
                    })



                })
            },
            function () {
                console.log('error, please try later')
            });
        // $.ajax({
        //     url: '/_my_feelist',
        //     data: {f_name: f_name},
        //     type: 'POST',
        //
        //     success: function (response) {
        //         var u_actions = response.u_actions
        //         console.log(u_actions)
        //         // $.each(u_actions, function (key,name) {
        //         //     console.log('feelists '+key+' - '+name)
        //         //
        //         // })
        //     },
        //     error: function (error) {
        //         console.log(error)
        //     }
        // });
    })
})()



