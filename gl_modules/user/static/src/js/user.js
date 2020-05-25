import {Toast} from "../../../../shared/static/js/swal_toast";

(function () {




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

    $('.my_feelist').on('click', function () {


        if ($('#list_of_feelists').text().replace(/\s/g, "") === '') {
            $('.user_interaction').addClass('d-none')
            $('#feelists').removeClass('d-none')
            $('#globber_list_mobile').removeClass('collapse')
        }
    })
    $('.feelist').on('click', function () {
        scroll_to_top()
        var f_name = $(this).data('f_name')
        $.getJSON('/_my_feelist', {
                f_name: f_name

            },

            function (response) {

                if (response.f_actions) {

                    render_posts($('#feelists'),
                        response.f_actions,
                        "My Feelist :" + f_name,
                        true, ['delete'],
                        'delete_action',
                        f_name)
                }


                $('.delete_action').on('click', function () {
                    var post_id = $(this).data('post_id')

                    Swal.fire({
                        html: `    <img  src="assets/dist/images/sad.png"/>
                                    <h4 class="danger_title">Delete post?</h4>
                                    `,

                        showCancelButton: true,
                        buttonsStyling: false,
                        cancelButtonColor: 'red',
                        confirmButtonText: 'Yes!',
                        cancelButtonText: 'No!',
                        customClass: {
                            confirmButton: 'gl_button',
                            cancelButton: 'gl_button danger'
                        },
                    }).then((result) => {
                        if (result.value) {
                            $.getJSON('/delete_action', {post_id: post_id},
                                function (response) {
                                    console.log('response is ' + response.deleted)
                                    if (response.deleted === 'deleted') {

                                        $('#' + post_id).remove()

                                        Toast.fire({

                                            html: `<img  src="assets/dist/images/happy.png"/><p class="text-success">Post was deleted!</h4> 
                                       `,
                                        })

                                    }

                                }, function (error) {
                                    Toast.fire({
                                        html: ` <img  src="assets/dist/images/sad.png"/>
                                                    <p class="text-danger">Something is wrong. <br> Please try later!</h4> 
                                       `,
                                    })
                                }
                            )
                        }
                    })


                })


                $('.delete_feelist').on('click', function () {
                    var f_name = $(this).data('f_name')

                    Swal.fire({
                        html: `     <img  src="assets/dist/images/sad.png"/>
                                    <h4 class="danger_title">Delete feelist ${f_name}?</h4>
                                    `,

                        showCancelButton: true,
                        buttonsStyling: false,
                        cancelButtonColor: 'red',
                        confirmButtonText: 'Yes!',
                        cancelButtonText: 'No!',
                        customClass: {
                            confirmButton: 'gl_button',
                            cancelButton: 'gl_button danger'
                        },

                    }).then((result) => {
                        if (result.value) {
                            $.getJSON('/delete_feelist', {f_name: f_name},
                                function (response) {
                                    console.log('response is ' + response.deleted)
                                    if (response.deleted === 'deleted') {

                                        window.location.reload()
                                        Toast.fire({

                                            html: ` <img  src="assets/dist/images/happy.png"/>
                                                    <p class="text-success">Your feelist was deleted!</h4> 
                                       `,
                                        })

                                    }

                                }, function (error) {
                                    Toast.fire({

                                        html: ` <img  src="assets/dist/images/sad.png"/>
                                                    <p class="text-danger">Something is wrong. <br> Please try later!</h4> 
                                       `,
                                    })
                                }
                            )
                        }
                    })


                })
            },
            function () {
                console.log('error, please try later')
            });

    })

    $('.my_glob').on('click', function () {

        var glober_list = $('.list_of_globers')


        $.getJSON('/my_glob',
            {},
            function (data) {

                if (data.my_glob.length === 0) {
                    $('.user_interaction').addClass('d-none')
                    $('#glob').removeClass('d-none')
                }
                glober_list.html('')
                $.each(data.my_glob, function (key, glober) {
                    glober_list.append(`<li class="list-group-item no_border glober" 
                                            data-glober_id="${glober.id}" data-glober_name="${glober.name}">${glober.name}</li>`)
                })

                glober_list.prepend(`
                    <span class="p-1 text-light"><i class="fas fa-user-friends"></i> &nbsp;My globe</span>`)
                glober_list.append(` <br>`)
                $('.glober').on('click', function () {

                    var glober_name = $(this).data('glober_name')
                    var glober_id = $(this).data('glober_id')
                    sessionStorage.setItem('glober_id', glober_id)

                    $.getJSON('/user_posts',
                        {
                            user_id: glober_id
                        },
                        function (response) {
                            if (response.user_posts) {

                                render_posts($('#glob'),
                                    response.user_posts,
                                    "My Glob : " + glober_name,
                                    true,
                                    [],
                                    ''
                                )
                            }

                            $('#remove_from_globe').on('click', function () {

                                Swal.fire({
                                    html: `     <img  src="assets/dist/images/sad.png"/>
                                            <h4 class="danger_title">Remove ${glober_name} from your globe?</h4>
                                           `,

                                    showCancelButton: true,
                                    buttonsStyling: false,
                                    cancelButtonColor: 'red',
                                    confirmButtonText: 'Yes!',
                                    cancelButtonText: 'No!',
                                    customClass: {
                                        confirmButton: 'gl_button',
                                        cancelButton: 'gl_button danger'
                                    },
                                }).then((result) => {
                                    if (result.value) {
                                        $.getJSON('/glob_action',
                                            {
                                                user_id: $(this).data('glober_id'),
                                                user_action: 'removed_from_glob'
                                            },
                                            function (response) {
                                                if (response.text === 'success') {
                                                    $('#glob').html('')
                                                    Toast.fire({
                                                        html: ` <img  src="assets/dist/images/happy.png"/>
                                                            <p class="text-success">${glober_name} was removed !</h4> `
                                                    })

                                                }
                                            })
                                    }
                                })

                            })
                        })

                     scroll_to_top()
                })
            })


    })

    $('.my_posts').on('click', function () {


        $.getJSON('/user_posts',
            {user_id: $(this).data('user_id')},
            function (response) {
                if (response.user_posts.length === 0) {
                    $('.user_interaction').addClass('d-none')
                    $('#posts').removeClass('d-none')
                } else if (response.user_posts) {
                    render_posts($('#posts'),
                        response.user_posts,
                        "My Posts",
                        true,
                        ['delete', 'edit'],
                        'delete_post')
                }


                $('.delete_post').on('click', function () {
                    var post_id = $(this).data('post_id')

                    Swal.fire({
                        html: `     <img  src="assets/dist/images/sad.png"/>
                                    <h4 class="danger_title">Delete post?</h4>
                                   `,

                        showCancelButton: true,
                        buttonsStyling: false,
                        cancelButtonColor: 'red',
                        confirmButtonText: 'Yes!',
                        cancelButtonText: 'No!',
                        customClass: {
                            confirmButton: 'gl_button',
                            cancelButton: 'gl_button danger'
                        },
                    }).then((result) => {
                        if (result.value) {
                            $.getJSON('/delete_post', {post_id: post_id},
                                function (response) {
                                    console.log('response is ' + response.deleted)
                                    if (response.deleted === 'deleted') {

                                        $('#' + post_id).remove()
                                        Toast.fire({

                                            html: ` <img  src="assets/dist/images/happy.png"/>
                                                    <p class="text-success">Your post was deleted!</h4> 
                                       `,
                                        })

                                    }

                                }, function (error) {
                                    console.log(error)
                                }
                            )
                        }
                    })

                })

                $('.edit_post').on('click', function () {
                    var post_id = $(this).data('post_id')
                    var i_feel = $('.i_feel_' + post_id).text()
                    var because = $('.because_' + post_id).text()
                    var action = $('.action_' + post_id).text()

                    Swal.fire(
                        {
                            title:post_id,
                            html: post_action('edit', i_feel, because, action, post_id),
                            showConfirmButton: false

                        }
                    )
                    $('#update_post').on('click', function () {
                        var post_id = $(this).data('post_id')
                        var i_feel_u = $('#i_feel').val()
                        var because_u = $('#because').val()
                        var action_u = $('#action').val()
                        swal.close()

                        $.getJSON('/update_post',
                            {
                                post_id: post_id,
                                i_feel: i_feel_u,
                                because: because_u,
                                action: action_u
                            },
                            function (response) {

                                if (response.updated === 'updated') {


                                    Toast.fire({


                                        html: ` <img  src="assets/dist/images/happy.png"/>
                                                <p class="text-success">Your post was succesfully updated!</h4> 
                                       `,
                                    })


                                    $('.i_feel_' + post_id).text(i_feel_u).addClass('bg_green')
                                    $('.because_' + post_id).text(because_u).addClass('bg_green')
                                    $('.action_' + post_id).text(action_u).addClass('bg_green')
                                    $('#after_update').on('click', function () {
                                        swal.close()

                                    })

                                } else {


                                    Toast.fire({

                                        html: ` <img  src="assets/dist/images/sad.png"/>
                                                    <p class="text-danger">Your post was not updated, please try later!</h4> 
                                       `,
                                    })
                                }

                            })

                    })
                })

                $('#new_post').on('click', function () {
                    Swal.fire(
                        {
                            html: post_action('create'),
                            showConfirmButton: false

                        }
                    )
                    $('#create_post').on('click', function () {

                        if($('#i_feel').val() ==='' || $('#because').val() === '' || $('#action').val() === '')
                        {
                            $('#post_error').removeClass('d-none')
                        }
                        else
                        {
                           $.getJSON('/new_post',
                            {

                                i_feel: $('#i_feel').val(),
                                because: $('#because').val(),
                                action: $('#action').val(),
                            },
                            function (response) {

                                if (response.created === 'created') {
                                    swal.close()

                                    Toast.fire({


                                        html: ` <img  src="assets/dist/images/happy.png"/>
                                                <p class="text-success">Your post was succesfully created!</h4> 
                                       `,
                                    })
                                    window.location.reload()

                                } else {


                                    Toast.fire({

                                        html: ` <img  src="assets/dist/images/sad.png"/>
                                                    <p class="text-danger">Your post was not created, please try later!</h4> 
                                       `,
                                    })

                                }

                            })
                        }


                    })
                })

            })
    })


    $('.my_fav').on('click', function () {

        scroll_to_top()

        $.getJSON('/my_fav_posts',
            {},
            function (response) {
                if (response.my_favs.length === 0) {
                    $('.user_interaction').addClass('d-none')
                    $('#favourites').removeClass('d-none')
                } else if (response.my_favs) {
                    render_posts($('#favourites'),
                        response.my_favs,
                        "My Favourites",
                        false,
                        ['delete'],
                        'delete_fav')
                } else {
                    console.log('some error')
                }

                $('.delete_fav').on('click', function () {
                    var post_id = $(this).data('post_id')

                    Swal.fire({
                        html: `     <img  src="assets/dist/images/sad.png"/>
                                    <h4 class="danger_title">Delete post? </h4>
                                   `,

                        showCancelButton: true,
                        buttonsStyling: false,
                        cancelButtonColor: 'red',
                        confirmButtonText: 'Yes!',
                        cancelButtonText: 'No!',
                        customClass: {
                            confirmButton: 'gl_button',
                            cancelButton: 'gl_button danger'
                        },
                    }).then((result) => {
                        if (result.value) {
                            $.getJSON('/remove_from_likes', {post_id: post_id},
                                function (response) {
                                    console.log('response is ' + response.deleted)
                                    if (response.deleted === 'deleted') {

                                        $('#' + post_id).remove()
                                        Toast.fire({

                                            html: ` <img  src="assets/dist/images/happy.png"/>
                                                    <p class="text-success">One of your favourites was deleted!</h4> 
                                       `,
                                        })

                                    }

                                }, function (error) {
                                    console.log(error)
                                }
                            )
                        }
                    })


                })
            })
    })

    function post_action(what, i_feel, because, action, post_id) {
        return ` <div class="col-md-12"><h4 class="smaller_h text-center blue">${what === 'edit' ? 'Edit' : 'Create'}   your post</h4></div>
                                    <hr class="bg_blue">
                                    <div class="col-md-12">
                                        <label for="i_feel" ><small>I feel/feel like</small></label>
                                        <input type="text" class="form-control border_bottom_only mb-1 form_label" form="user_feel" id="i_feel"
                                               name="i_feel" required
                                               placeholder="I feel/ I feel like"
                                               data-cy="description"
                                               value="${what === 'edit' ? i_feel : ''}">
                                   
                                    <label for="because" ><small>Because...</small></label>
                                    <textarea class="form-control border_bottom_only form_label" form="user_feel" id="because"
                                      maxlength="200"
                                      name="because" required
                                      placeholder="Because..."
                                      data-cy="description" >${what === 'edit' ? because : ''}</textarea>

                                        <label for="action" ><small>One thing that you do...</small></label>
                                        <textarea form="user_feel"
                                                  rows="5"
                                                  name="action"
                                                  id="action"
                                                  class="form-control ___ mb-2 border_bottom_only form_label"
                                                  placeholder="One thing that you do..."
                                                  required
                                                 
                                        >${what === 'edit' ? action : ''}</textarea>
                                       
                                        <div class="border-danger text-danger d-none" id="post_error">All fields must be filled!</div>
                                        <button class="gl_button col-md-12 p-2 bg_blue" 
                                        id="${what === 'edit' ? 'update_post' : 'create_post'}"
                                        data-post_id="${what === 'edit' ? post_id : ''}"
                                        >${what === 'edit' ? 'Update post' : 'Create post'}</button>
                                        </div> <button class="gl_button danger" onclick="swal.close()">cancel</button>
                                        `
    }

    function render_posts(div, posts, title, single_user, controls, delete_class, f_name = null) {

        $('.user_interaction').addClass('d-none')
        div.removeClass('d-none').html('').append(`<span class="feelist_title">${title} 

        ${delete_class === 'delete_action' ? `<small  class="float-right delete_feelist" title="Delete feelist?" data-f_name="${f_name}">
                 <i class="far fa-trash-alt"></i></small>` :
            
            `${delete_class === '' ?
            `<small  class="float-right " id="remove_from_globe" title="Remove from globe?" 
                    data-glober_id="${sessionStorage.getItem('glober_id')}">
                 <i class="far fa-trash-alt"></i></small>` : 
                
                `${delete_class === 'delete_post' ? `<small class="float-right new_post" id="new_post">
                    <i class="fas fa-pen-alt"></i>&nbsp;new</small>`:`` }`}`}</span>`)



        $.each(posts, function (key, post) {

            div.append(`<div class="row mb-1" id="${post.post_id}">
                                <div class="col-md-4 border_blue_l p-2 d-flex justify-content-around">
                                    <img class="avatar" src="assets/dist/images/avatars/${post.image_id}.png"/>
                                    <div>
                                        <div class="d-flex justify-content-center"><a href="/user/${post.user_id}" class="user">${post.name}</a></div>
                                        <div class="d-flex justify-content-center"><small class="text-muted">${post.created_at}</small></div>
                                    </div>
                                </div>
                                <div class="col-md-8 border_blue_l p-2">
                                    <p class="card-text m-1 blue">
                                        When I feel/feel like... <span class="i_feel_${post.post_id} text-secondary">${post.i_feel.join(' ')}</span>
                                    </p>
                                    <p class="card-text m-1 blue">Because...<span class="because_${post.post_id}">${post.because.join(' ')}</span>
                                    </p>
                                    <p class="card-text m-1 blue">I ... <span class="card-text action_${post.post_id}">${post.action}</span></p>
                                    <p class="card-text ">
                                    
                                        ${controls.indexOf('delete') !== -1 ? `<small class=" ${delete_class} r-2 float-right" title="Delete?"
                                               data-post_id="${post.post_id}">
                                            <i class="far fa-trash-alt"></i>
                                        </small>` : ``}
                                        
                                        ${controls.indexOf('edit') !== -1 ? `<small class="edit_post float-right mr-2" title="Edit post?"
                                                    data-post_id="${post.post_id}">
                                                   <i class="far fa-edit"></i>
                                                    
                                        </small>` : ``}  
                                        
                                         <small class=" mr-2 float-left" title="likes"
                                               data-post_id="${post.post_id}">
                                            <i class="fas fa-heart " >
                                                <span>&nbsp; ${post.likes}</span> </i>
                                        </small>
                                        
                                    </p>
                                </div>
                            </div>`)
        })
    }

    function scroll_to_top()
    {
        $('#user').get(0).scrollIntoView()
    }

    $('.user_heart').on('click', function () {
       swal.fire({

           html:`
            <div class="form-group ">
                <div class="col-auto">
                    <label for="feeling_holder">Select how you feel</label>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text bg-transparent no_border" >
                                <i class="fas fa-heart text-danger"></i>
                            </div>
                        </div>

                        <input type="text" class="form-control  border_bottom_only bg-transparent  text-center text-wrap"
                               id="feeling_holder" name="user_feel"
                               placeholder="?" readonly required>
                        <div class="input-group-prepend">
                            <div class="input-group-text bg-transparent no_border p-4" id="slider_result">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="">
                    <label class="sr-only" for="feeling">feeling</label>
                    <div class="input-group mb-2 d-flex  justify-content-between align-items-center border_blue_l p-2 ">

                        <input type="range" min="1" max="100"
                               class="custom-range slider" id="feeling">

                    </div>
                </div>
            </div>
            <span class="gl_button" id="update_feeling">update</span><button class="gl_button danger" onclick="swal.close()">cancel</button>
           `,
           showConfirmButton:false
       })
      $('#feeling').on('change', function () {

        var feelings = this.value;

        $('#feeling_holder').val(feelings);

        if(feelings > 51){

            $('#slider_result')
                .css('background',"url('assets/dist/images/happy.png')")
                .css('background-repeat', 'no-repeat')
        }
        else{
             $('#slider_result')
                .css('background',"url('assets/dist/images/sad.png')")
                .css('background-repeat', 'no-repeat')
        }
    })
        $('#update_feeling').on('click', function () {
            $.getJSON('/update_user_feeling',{
                feeling:$('#feeling_holder').val()
            },
                function (response) {

                    if(response.updated === 'updated'){
                         Toast.fire({
                            html: `<img  src="assets/dist/images/happy.png"/><p class="text-success">You're updated!</h4> 
                                       `,
                                        })
                        window.location.reload()
                    }
                    else
                    {
                         Toast.fire({
                            html: `<img  src="assets/dist/images/sad.png"/><p class="text-success">You're not updated!</h4> 
                                       `,
                                        })
                    }

                })

        })
    })

})()



