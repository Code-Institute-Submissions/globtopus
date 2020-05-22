/*FUNCTIONS FOR SEARCH AND INTERACTION WITH POSTS
*
* USER CAN:
*           1. LIKE  ACTIONS
*           2. ADD ANY OF THE ACTIONS TO HIS FEELIST
*           3. FLAG ACTION AS INAPPROPRIATE
*           4. SEARCH FOR POSTS
* */
$(function () {


    $('#search,#c_search').on('click', function () {

        /*AJAX REQUEST TO GET RESULTS*/
        $.getJSON('/_search', {
                q: $('input[name="search_field"]').val(),
                cc: $(this).data('cc')

            },

            function (data) {

                var search_results = data.result
                var authorized_user = data.authorized_user

                var results = $("#search_results").html('');
                if (screen.width < 768) results.get(0).scrollIntoView();

                /*WE HAVE NO RESULTS*/
                if (search_results.length === 0) {

                    results.append(` 
                <h4 class="smaller_h"> There are no actions for how you feeling now :
                    <span class="blue">${$('input[name="search_field"]').val()}</span>  
                    
                    </h4>`)
                }
                /*WE HAVE RESULTS*/
                else {

                    var counter = 1
                    /*APPENDING SEARCH RESULTS*/
                    $.each(search_results, function (key, post) {


                        results.append(`

                    <div class="row mb-2 border_blue_l pt-2">
                     <!--APPENDING  ACTION,-->
                        <div class="col-md-8 pb-2">
                                <span >I feel :</span>  
                               <span class="text-info" >${post.i_feel.join(' ')}  </span>
                               <span >because :</span>
                               <span  class="text-info">${post.because.join(' ')}  </span> <br>
                        
                              <span>${post.action}</span> 
                            <br>
                            <i  data-id="${post.id}"  data-action="likes"
                            class="fas fa-heart float-right ml-3 gl_action" title="like it!" >
                            <span id="likes_${post.id}" >&nbsp;${post.likes}</span> </i> 
          
                            <i   data-id="${post.id}"  data-action="additions"
                            class="fas fa-plus float-right ml-3 add_to_feelist" title="add to your feelist!">
                            <span id="additions_${post.id}" ></span>
                            </i>
                            <i  data-id="${post.id}"  data-action="flags"
                            class="far fa-flag float-right ml-3 gl_action" title="report as inappropriate">
                             <span id="flags_${post.id}" ></span>
                                    </i>
                        </div>
                            <!--INFO ABOUT GLOBBER-->
                        <div class="col-md-4 ">
                        
                            <img class="avatar" src="assets/dist/images/avatars/${counter % 38}.png"/>
                            <a href="/user/${post.user_id}" class="user">
                             ${post.name}  ${post.user_feel} 
                             </a> 
                              <span class="float-right remove_from_glob blue removed_from_glob${post.user_id}
                             ${post.in_my_glob === 1 ? '' : 'd-none'}" 
                             data-user_id="${post.user_id}" 
                             data-user_name="${post.name}"
                             data-user_action="removed_from_glob"
                             title="Remove me from your glob !">
                             <i class="fas fa-user-minus"></i>
                             </span>
                             <span class="float-right add_to_glob blue added_to_glob${post.user_id}
                            ${post.in_my_glob !== 1 ? '' : 'd-none'}" 
                             data-user_id="${post.user_id}" 
                             data-user_name="${post.name}"
                              data-user_action="added_to_glob"
                             title="Add me to your glob !">
                             <i class="fas fa-user-plus"></i>
                             </span>
                             <br>
                             <span class="action_response_r${post.user_id}">${post.created_at}</span>
                              <span class="action_response_a${post.user_id}"></span>
                              <hr class="p-0 m-1">
                              
                                

                        </div>
                        
                    </div>


                `)
                        counter++
                    })
                }


                /*APPENDING EVENT LISTENERS AFTER RENDERING SEARCH RESULTS
                * AFTER AJAX CALL*/

                /*BUTTON + WHEN USER WANTS TO ADD ACTION TO HIS FEELIST WE WILL
                * FIRE ALERT WITH HIS FEELISTS INTO WHICH HE CAN ADD
                * THIS ACTION, OR HE HAS OPTION OF CREATING NEW FEELIST
                * AND ADD ACTION TO NEW FEELIST*/
                $('.add_to_feelist').on('click', function () {

                    add_to_feelist($(this), authorized_user, Object.keys(data.feelists))
                })

                /*BY CLICKING ON HEARTH ICON TO LIKE OR FLAG ICON TO FLAG
                * ACTION AS INAPPROPRIATE WE WILL UPDATE DB*/
                $('.gl_action').on('click', function () {

                    post_action($(this), authorized_user);
                })

                /*USER CAN ADD ANOTHER USER INTO HIS GLOB TO SEE POSTS FROM THIS USER*/
                $('.add_to_glob,.remove_from_glob').on('click', function () {


                    globe_action($(this), authorized_user)
                })

            });


    });

    /*APPENDING EVENT LISTENERS ON PUBLIC USER PAGE
               * NOT AJAX CALL*/
    if (window.location.pathname.includes('/user/')) {
         $.getJSON('/is_authorized',{},function (is_authorized) {
              var authorized_user = is_authorized.user
             var feelists = is_authorized.feelists
             console.log(authorized_user)
        $('.add_to_feelist').on('click', function () {

            add_to_feelist($(this), authorized_user, Object.keys(feelists))
        })

        /*BY CLICKING ON HEARTH ICON TO LIKE OR FLAG ICON TO FLAG
        * ACTION AS INAPPROPRIATE WE WILL UPDATE DB*/
        $('.gl_action').on('click', function () {

            post_action($(this), authorized_user);
        })

        /*USER CAN ADD ANOTHER USER INTO HIS GLOB TO SEE POSTS FROM THIS USER*/
        $('.add_to_glob,.remove_from_glob').on('click', function () {

            globe_action($(this), authorized_user)
        })
        })


    }


    const Toast = Swal.mixin({
        toast: true,
        position: 'middle-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,

    })

    /*ADDING OR REMOVING USER FROM MyGlobe*/
    function globe_action($_this, authorized_user) {
        var user_id = $_this.data('user_id')
        var user_name = $_this.data('user_name')
        var user_action = $_this.data('user_action')
        if (!authorized_user) {
            please_login()
        } else {
            $.getJSON('/glob_action',
                {
                    user_id: user_id,
                    user_action: user_action
                },
                function (response) {

                    if (response.text === 'success' && user_action === 'added_to_glob') {
                        $('.added_to_glob' + user_id).addClass('d-none')
                        $('.removed_from_glob' + user_id).removeClass('d-none')

                        happy_toast( `${user_name} was added!`)

                    } else if (response.text === 'success' && user_action === 'removed_from_glob') {
                        $('.added_to_glob' + user_id).removeClass('d-none')
                        $('.removed_from_glob' + user_id).addClass('d-none')

                         sad_toast( `${user_name} was removed!`)

                    }

                })
        }
    }

    function please_login() {
        swal.fire({
            html: `
                                Please 
                                <a class="" href="/sign_in">Sign in </a>
                                or
                                <a class="" href="/sign_up">Sign up </a>
                                to continue.
                                <hr class="bg_blue">
                                <button class="gl_button smaller_h" onclick="swal.close();">ok</button>
                            `,
            showConfirmButton: false
        })
    }

    /*SENDING AJAX REQUEST TO SERVER TO UPDATE USER'S LIKES,FLAGS,FEELISTS...*/
    function post_action($_this, authorized_user) {

        var post_id = $_this.data('id')
        var action = $_this.data('action')

        var feelist_name = $("input[name='feelist']:checked").data('feelist');
        var new_feelist = $("input[name='feelist']:checked").data('new_feelist');

        if (!authorized_user) {
            please_login()
        }
        /*WHEN USER ADDING ACTION TO HIS FEELIST AND HE DOESN'T SELECT ANY FEELIST
        * OR HE CHECKS NEW FEELIST BUT DOESN'T TYPE IN NEW FEELIST NAME
        * WE WILL NOT PROCEED , BUT NOTIFY HIM THAT HE NEEDS TO SELECT FEELIST*/
        else if (action === 'additions' && (feelist_name === undefined || feelist_name.length === 0)) {
            $("#no_feelist").removeClass('d-none')
        }
        /*ALL GOOD => FEELIST SELECTED*/
        else {
            /*CLOSING ALERT WITH USER'S FEELISTS*/
            $('#feelist_saved').text('saved').addClass('gl_button')
            $('.save_feelist').addClass('d-none')

            /*AJAX REQUEST TO PERFORM THE ACTION*/
            $.getJSON(
                '/_actions',
                {
                    post_id: post_id,
                    action: action,
                    feelist_name: feelist_name,
                    new_feelist: new_feelist

                },
                function (data) {

                    /*IF USER IS NOT AUTHORIZED*/
                    if (data.result === "not_authorized") {
                        please_login()
                    }
                    /*IF USER ALREADY LIKED OR ADDED ACTION
                    * WE WILL NOTIFY HIM*/
                    else if (data.result === "already_added") {
                        swal.fire({
                            html: `
                               
                               
                               <span class="smaller_h">pssst.... you already ${action === 'likes'
                                ? `liked` : `${action === 'flags' ? `flagged` : `added`}`
                            } it ...;)</span>
                                <hr class="bg_purple">
                                <button class="gl_button smaller_h bg_purple" onclick="swal.close();">ok</button>
                            `,
                            showConfirmButton: false
                        })
                    }
                    /*ELSE WE WILL INCREASE THE NUMBER ON LIKES /ADDITIONS ON THE
                    * PAGE, TO GIVE USER INSTANT FEEDBACK*/
                    else {

                        var action_el = $('#' + action + '_' + post_id)
                        if(action === 'likes'){
                             action_el.text(parseInt(action_el.text()) + 1)
                            .addClass('blue bg-warning p-1')
                            .prop('disabled', 'disabled')
                        }




                         happy_toast( `${action === 'likes'
                                ? `liked` : `${action === 'flags' ? `flagged` : `added`}`
                            }!`)

                    }

                });
        }


    }

    /*ACTION TO ADD POST TO FEELIST, SHOWING USERS FEELISTS IN POPUP, SO HE CAN CHOOSE ONE OF EXISTING
    * FEELISTS OR CREATE NEW ONE*/
    function add_to_feelist($_this, authorized_user, feelists) {

        var post_id = $_this.data('id')

        var action = $_this.data('action')

        if (!authorized_user) {
            please_login()

        } else {

            /*creating list with user's feelists, so he can choose
            * where to add new action to*/
            var feelist_div = ""
            if (feelists.length) {
                for (var list in feelists) {
                    feelist_div += `<div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text bg-transparent border_bottom_only">
                                                    <input type="radio" name="feelist" class="feelist_check"
                                                           value="${feelists[list]}" data-feelist="${feelists[list].replace(/ /g, '_')}">
                                                </div>
                                            </div>
                                            <label class="feelist form-control border_bottom_only ${feelists[list].replace(/ /g, '_')}"
                                             for="${feelists[list]}" >${feelists[list]}</label>
                                        </div>`
                }
            }


            swal.fire({
                width: 200,
                showConfirmButton: false,
                html: `
                           <div class="row">
                           <div class="col-md-12">
                           <h4 class="smaller_h" id="add_to">add to</h4>
                           
                                <small>one of your feelists or create new one</small> <hr>
                           <h4 class="smaller_h d-none bg_purple text-light" id="no_feelist">feelist ?</h4>
                     
                            </div>
                                <ul class="list-group">
            
                                       ${feelist_div}
                                        
                                        <!-- user can create new feelist-->
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text bg-transparent border_bottom_only">
                                                    <input type="radio" data-new_feelist="true"
                                                           name="feelist" id="new" data-feelist="" >
                                                </div>
                                            </div>
                                           <input type="text" class="form-control border_bottom_only  form_label" 
                                            id="new_feelist" name="new_feelist"    placeholder="create new">
                                        </div>
            
                                    
                                </ul>
                                <button class="gl_button gl_action save_feelist" 
                                data-id="${post_id}" data-action=${action}
                                
                                >save</button>
                                <span id="feelist_saved" class="text-center" onclick="swal.close()" ></span>
                                
                            </div>
                            `
            })

        }

        /*USER COLOR FEEDBACK ON SELECTING FEELISTS*/
        $('#new').on('click', function () {
            $('.feelist').removeClass('bg_blue text-light')
            $('#new_feelist').addClass('border_purple')
            $('#no_feelist').addClass('d-none')
        })
        $('.feelist_check').on('click', function () {
            $('.feelist').removeClass('bg_blue text-light')
            $('#new_feelist').removeClass('border_purple')
            $('#no_feelist').addClass('d-none')
            $('.' + $(this).data('feelist')).addClass('bg_blue text-light')
        })
        /*BY CLICKING ON save BUTTON HE CAN SAVE ACTION TO HIS FEELIST*/
        $('.save_feelist').on('click', function () {
            post_action($(this),authorized_user);

        })

        /*WHEN GLOBBER IS CREATING NEW FEELIST, WE ARE APPENDING NAME OF THE FEELIST TO data-feelist
        * ATTRIBUTE ON RADIO BUTTON SO THAT WE CAN RETRIEVE IT IN perform_action()
        * FUNCTION AND SAVE ACTION TO NEWLY CREATED FEELIST*/
        $('#new_feelist').on('input', function () {
            $('#new').data("feelist", $(this).val())
        })
    }

    function happy_toast(message)
    {
         Toast.fire({
                            html: ` <img  src="/assets/dist/images/happy.png"/>
                                                    <p class="text-success">${message}</h4> `
                        })
    }

    function sad_toast(message)
    {
         Toast.fire({
                            html: ` <img  src="/assets/dist/images/sad.png"/>
                                                    <p class="text-danger">${message}</h4> `
                        })
    }
});


