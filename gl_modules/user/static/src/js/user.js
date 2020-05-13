(function () {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

    })

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
                feelist.append(`<h4 class="feelist_title" >My Feelist : ${f_name} 
                <small  class="float-right delete_feelist" title="Delete feelist?" data-f_name="${f_name}">
                 <i class="far fa-trash-alt"></i></small></h4>    `)
                for (var action of f_actions) {
                    counter++

                    feelist.append(` 
 <div class="card mb-3 mt-3 feelist_action " id="${action.post_id}" style="max-width: 540px;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4 ">
                                            <img class="avatar" src="assets/dist/images/avatars/${counter % 12}.png"/>
                                            <div class="d-flex justify-content-center"><a href="#" class="user">${action.name}</a></div>
                                             <div class="d-flex justify-content-center"><small class="text-muted">${action.created_at}</small></div>
                                           
                                        </div>
                                        <div class="col-md-8 p-1">

                                            <div class="card-body  m-0">
                                            
                                                <p class="card-text m-1 blue">
                                                    
                                                    When I feel/feel like... <span class="i_feel text-secondary">${action.i_feel.join(' ')}</span></p>

                                                <p class="card-text m-1 blue">Because...<span class="because">${action.because.join(' ')}</span></p>

                                                <p class="card-text m-1 blue">I ...  <span class="card-text">${action.action}</span></p>
                                                
                                                <p class="card-text float-right">
                                                    <small class="delete_action" title="Remove from list?"
                                                    data-post_id="${action.post_id}">
                                                    <i class="far fa-trash-alt"></i>
                                                    
                                                   </small>
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                

`)
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

                                            html: `<img  src="assets/dist/images/happy.png"/><p class="feelist_title">Post was deleted!</h4> 
                                       `,
                                        })

                                    }

                                }, function (error) {
                                    Toast.fire({
                                        html: ` <img  src="assets/dist/images/sad.png"/>
                                                    <p class="feelist_title">Something is wrong. <br> Please try later!</h4> 
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
                                                    <p class="feelist_title">Your feelist was deleted!</h4> 
                                       `,
                                        })

                                    }

                                }, function (error) {
                                    Toast.fire({

                                        html: ` <img  src="assets/dist/images/sad.png"/>
                                                    <p class="feelist_title">Something is wrong. <br> Please try later!</h4> 
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

    $('#my_glob').on('click', function () {

        var glober_list = $('#list_of_globers')


        $.getJSON('/my_glob',
            {},
            function (data) {
                glober_list.html('')
                $.each(data.my_glob, function (key, glober) {
                    glober_list.append(`<li class="list-group-item no_border glober" 
                                            data-glober_id="${glober.id}" data-glober_name="${glober.name}">${glober.name}</li>`)
                })


                $('.glober').on('click', function () {

                    $('.user_interaction').addClass('d-none')

                    var glober_id = $(this).data('glober_id')
                    var glober_name = $(this).data('glober_name')
                    var glob = $('#glob')
                    var img = Math.floor(Math.random() * 10)

                    glob.removeClass('d-none').html('')
                        .append(`<h4 class="feelist_title">My Glob : ${glober_name}</h4>`)

                    $.getJSON('/user_posts',
                        {
                            user_id: glober_id
                        },
                        function (response) {

                            $.each(response.user_posts, function (key, action) {

                                glob.append(`<div class="card mb-3 mt-3 feelist_action " id="${action.post_id}" style="max-width: 540px;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4 ">
                                            <img class="avatar" src="assets/dist/images/avatars/${img}.png"/>
                                            <div class="d-flex justify-content-center"><a href="#" class="user">${glober_name}</a></div>
                                             <div class="d-flex justify-content-center"><small class="text-muted">${action.created_at}</small></div>
                                           
                                        </div>
                                        <div class="col-md-8 p-1">

                                            <div class="card-body  m-0">
                                            
                                                <p class="card-text m-1 blue">
                                                    
                                                    When I feel/feel like... <span class="i_feel text-secondary">${action.i_feel.join(' ')}</span></p>

                                                <p class="card-text m-1 blue">Because...<span class="because">${action.because.join(' ')}</span></p>

                                                <p class="card-text m-1 blue">I ...  <span class="card-text">${action.action}</span></p>
                                                
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

                            })
                        })
                })
            })


    })

    $('#my_posts').on('click', function () {

        var user_id = $(this).data('user_id')
        var user_name = $(this).data('user_name')
        var posts = $('#posts')

        $('.user_interaction').addClass('d-none')
        posts.html('').removeClass('d-none')


        $.getJSON('/user_posts',
            {user_id: user_id},
            function (response) {
                posts.append(`<h4 class="feelist_title">My posts</h4>`)
                $.each(response.user_posts, function (key, action) {

                    posts.append(`
<div class="card mb-3 mt-3 feelist_action " id="${action.post_id}" style="max-width: 540px;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4 ">
                                            <img class="avatar" src="assets/dist/images/avatars/2.png"/>
                                            <div class="d-flex justify-content-center"><a href="#" class="user">${user_name}</a></div>
                                             <div class="d-flex justify-content-center"><small class="text-muted">${action.created_at}</small></div>
                                           
                                        </div>
                                        <div class="col-md-8 p-1">

                                            <div class="card-body  m-0">
                                            
                                                <p class="card-text m-1 blue">
                                                    
                                                    When I feel/feel like... <span class="i_feel_${action.post_id} text-secondary">${action.i_feel.join(' ')}</span></p>

                                                <p class="card-text m-1 blue">Because...<span class="because_${action.post_id}">${action.because.join(' ')}</span></p>

                                                <p class="card-text m-1 blue">I ...  <span class="card-text action_${action.post_id}">${action.action}</span></p>
                                                
                                                <p class="card-text float-right">
                                                    <small class="delete_post mr-2" title="Delete post?"
                                                    data-post_id="${action.post_id}">
                                                    <i class="far fa-trash-alt"></i>
                                                    
                                                   </small>
                                                    <small class="edit_post" title="Edit post?"
                                                    data-post_id="${action.post_id}">
                                                   <i class="far fa-edit"></i>
                                                    
                                                   </small>
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>`)

                })


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
                                                    <p class="feelist_title">Your post was deleted!</h4> 
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
                            html: ` <div class="col-md-12"><h4 class="smaller_h text-center blue">Edit your post</h4></div>
                                    <hr class="bg_blue">
                                    <div class="col-md-12">
                                        <label for="i_feel" ><small>I feel/feel like</small></label>
                                        <input type="text" class="form-control border_bottom_only mb-1 form_label" form="user_feel" id="i_feel"
                                               name="i_feel" required
                                               placeholder="I feel/ I feel like"
                                               data-cy="description"
                                               value="${i_feel}">
                                   
                                    <label for="because" ><small>Because...</small></label>
                                    <textarea class="form-control border_bottom_only form_label" form="user_feel" id="because"
                                      maxlength="200"
                                      name="because" required
                                      placeholder="Because..."
                                      data-cy="description" >${because}</textarea>

                                        <label for="action" ><small>One thing that you do...</small></label>
                                        <textarea form="user_feel"
                                                  rows="5"
                                                  name="action"
                                                  id="action"
                                                  class="form-control ___ mb-2 border_bottom_only form_label"
                                                  placeholder="One thing that you do..."
                                                  required
                                                 
                                        >${action}</textarea>
                                       
                                        
                                        <button class="gl_button col-md-12 p-2 bg_blue" 
                                        id="update_post"
                                        data-post_id="${post_id}"
                                        >Update post</button>
                                        </div>
                                        `,
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
                                                <p class="feelist_title">Your post was succesfully updated!</h4> 
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
                                                    <p class="feelist_title">Your post was not updated, please try later!</h4> 
                                       `,
                                    })
                                }

                            })

                    })
                })


            })
    })

    $('#my_fav').on('click', function () {

        var favourites = $('#favourites')

        $('.user_interaction').addClass('d-none')
        favourites.removeClass('d-none')

        $.getJSON('/my_fav_posts',
            {},
            function (response) {
                    if(response.my_favs)
                    {
                        favourites.html('').append(`<h4 class="feelist_title">My Favourites</h4>`)
                        $.each(response.my_favs, function (key, post) {
                        favourites.append(`
                           <div class="row mb-1">
                                <div class="col-md-4 border_blue_l p-2 d-flex justify-content-around">
                                    <img class="avatar" src="assets/dist/images/avatars/${Math.ceil(Math.random() * 10)}.png"/>
                                    <div>
                                        <div class="d-flex justify-content-center"><a href="#" class="user">${post.name}</a></div>
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
                                        <small class="remove_fav mr-2 float-right" title="Remove from favourites?"
                                               data-post_id="${post.post_id}">
                                            <i class="far fa-trash-alt"></i>
                                        </small>
                                        <small class="remove_fav mr-2 float-left" title="Remove from favourites?"
                                               data-post_id="${post.post_id}">
                                            <i class="fas fa-heart " title="likes">
                                                <span>&nbsp; ${post.likes}</span> </i>
                                        </small>
                                    </p>
                                </div>
                            </div>`)
                        })
                    }
                    else
                    {
                        console.log('some error')
                    }
            })
    })


})()



