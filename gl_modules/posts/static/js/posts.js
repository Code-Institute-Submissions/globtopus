import {Toast} from "../../../shared/static/js/swal_toast";


/*FUNCTIONS FOR SEARCH AND INTERACTION WITH POSTS
*
* USER CAN:
*           1. LIKE  ACTIONS
*           2. ADD ANY OF THE ACTIONS TO HIS FEELIST
*           3. FLAG ACTION AS INAPPROPRIATE
*           4. SEARCH FOR POSTS
* */
$(function () {

    /*GETTING LATEST POSTS ON INITIAL PAGE LOAD,
    * IF WE ARE ON COUNTRY PAGE, WE WILL RENDER
    * POSTS FROM THAT COUNTRY, IF ON LANDING PAGE
    * POSTS FROM THE WORLD
    *
    * TO DO: GET POSTS ACCORDING TO BROWSER LANGUAGE,
    *       ADD LANGUAGE TO USER OBJECT AND POST ITSELF*/




    $('#search,#c_search').on('click', function () {

        /*AJAX REQUEST TO GET RESULTS*/
        $.getJSON('/_search', {
                q: $('input[name="search_field"]').val(),
                cc: $(this).data('cc')

            },

            function (data) {


                var results = $("#search_results").html('');
                if (screen.width < 768) results.get(0).scrollIntoView();

                /*WE HAVE NO RESULTS*/
                if (data.result.length === 0) {

                    results.append(` 
                <h4 class="smaller_h"> There are no actions for how you feeling now :
                    <span class="blue">${$('input[name="search_field"]').val()}</span>  
                    
                    </h4>`)
                }
                /*WE HAVE RESULTS*/
                else {


                    render_posts(data.result)
                }


                /*APPENDING EVENT LISTENERS AFTER RENDERING SEARCH RESULTS
                * AFTER AJAX CALL*/
                add_listeners(data.authorized_user,data.feelists)


            });


    });


    /*APPENDING EVENT LISTENERS ON PUBLIC USER PAGE
               * NOT AJAX CALL*/
    if (window.location.pathname.includes('/user/')) {
        $.getJSON('/is_authorized', {}, function (is_authorized) {
            var authorized_user = is_authorized.user
            var feelists = is_authorized.feelists

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

                        happy_toast(`${user_name} was added!`)

                    } else if (response.text === 'success' && user_action === 'removed_from_glob') {
                        $('.added_to_glob' + user_id).removeClass('d-none')
                        $('.removed_from_glob' + user_id).addClass('d-none')

                        sad_toast(`${user_name} was removed!`)

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

        var checked_feelist = $("input[name='feelist']:checked")
        var feelist_name = checked_feelist.data('feelist');
        var new_feelist = checked_feelist.data('new_feelist');

        /*USER FEEDBACK ON CHOOSING THE ACTION*/
        if(action === 'flags')  $_this.addClass('text-warning')
        if(action === 'likes') $_this.addClass('text-danger')

        if (!authorized_user)  please_login()

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
                        if (action === 'likes') {
                            action_el.text(parseInt(action_el.text()) + 1)
                                .addClass('blue bg-warning p-1')
                                .prop('disabled', 'disabled')
                        }


                        happy_toast(`${action === 'likes'
                            ? `liked` : `${action === 'flags' ? `flagged` : `added`}`
                        }!`)

                    }

                });

             window.location.reload()
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
            post_action($(this), authorized_user);


        })

        /*WHEN GLOBBER IS CREATING NEW FEELIST, WE ARE APPENDING NAME OF THE FEELIST TO data-feelist
        * ATTRIBUTE ON RADIO BUTTON SO THAT WE CAN RETRIEVE IT IN perform_action()
        * FUNCTION AND SAVE ACTION TO NEWLY CREATED FEELIST*/
        $('#new_feelist').on('input', function () {
            $('#new').data("feelist", $(this).val())
        })
    }

    function happy_toast(message) {
        Toast.fire({
            html: ` <img  src="/assets/dist/images/happy.png"/>
                                                    <p class="text-success">${message}</h4> `
        })
    }

    function sad_toast(message) {
        Toast.fire({
            html: ` <img  src="/assets/dist/images/sad.png"/>
                                                    <p class="text-danger">${message}</h4> `
        })
    }

    function render_posts(posts) {
        var counter = 1

        $.each(posts, function (key, post) {


                $("#search_results").append(`

                    <div class="row mb-2 border_blue_l pt-2">
                     
                     <div class="col-md-8 pb-2">
                      <span >(When) I feel :</span>  
                               <span class="text-info" >${post.i_feel.join(' ')}  </span>
                               <span >because :</span>
                               <span  class="text-info">${post.because.join(' ')}  </span> <br>
                        
                              <span>${post.action}</span> 
                            <br>
                     ${post.flags === 0 ? ` 
                               
                            
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
                        `:` <i class="fas fa-exclamation-circle float-right ml-3 text-warning" title="like it!" >
                            <span id="likes_${post.id}" >under review</span> </i> ` }
                     </div>
                      
                            <!--INFO ABOUT GLOBBER-->
                        <div class="col-md-4 ">
                        
                            <img class="avatar" src="assets/dist/images/avatars/${counter % 38}.png"/>
                            <a href="/user/${post.user_id}" class="user">
                           <span > ${post.name}</span>   <span class="user_heart post p-2 m-1">${post.user_feel}</span>  
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
                             <span >${post.created_at}</span>
                              <span ></span>
                              <hr class="p-0 m-1">
                        </div>
                    </div>


                `)



            counter++
        })
    }

    function latest_posts(cc) {

        $('#post_search').removeClass('d-none');
        $.getJSON('/_search',
            {
                q: '',
                cc: cc
            },
            function (latest) {

                render_posts(latest.result)
                add_listeners(latest.authorized_user,latest.feelists)
            })
    }

    /*APPENDING EVENT LISTENERS AFTER RENDERING SEARCH RESULTS
    * AFTER AJAX CALL*/
    function add_listeners(authorized_user, feelists) {
        /*BUTTON + WHEN USER WANTS TO ADD ACTION TO HIS FEELIST WE WILL
               * FIRE ALERT WITH HIS FEELISTS INTO WHICH HE CAN ADD
               * THIS ACTION, OR HE HAS OPTION OF CREATING NEW FEELIST
               * AND ADD ACTION TO NEW FEELIST*/
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
    }

     latest_posts($('#c_search').data('cc') ? $('#c_search').data('cc') : '')
});


