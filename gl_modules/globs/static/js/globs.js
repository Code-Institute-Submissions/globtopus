/*FUNCTIONS FOR SEARCH AND INTERACTION WITH POSTS
*
* USER CAN:
*           1. LIKE  ACTIONS
*           2. ADD ANY OF THE ACTIONS TO HIS FEELIST
*           3. FLAG ACTION AS INAPPROPRIATE
*           4. SEARCH FOR POSTS
* */
$(function () {

    var authorized_user
    $('#get_results').on('click', function () {

        /*AJAX REQUEST TO GET RESULTS*/
        $.getJSON('/_search', {
                q: $('input[name="search"]').val(),

            },

            function (data) {

                var search_results = data.result
                var feelists = Object.keys(data.feelists)
                console.log("feelists"+feelists)
                authorized_user = data.authorized_user


                var results = $("#results").html('');

                results.get(0).scrollIntoView();

                /*WE HAVE NO RESULTS*/
                if (search_results.length == 0) {

                    results.append(` 
                <h4 class="smaller_h"> There are no actions for how you feeling now :
                    <span class="blue">${$('input[name="search"]').val()}</span>  
                    
                    </h4>`)
                }
                /*WE HAVE RESULTS*/
                else {


                    $.each(search_results, function (key, value) {


                        results.append(`

                    <div class="row mb-2 border_blue pt-2">
                     <!--APPENDING  ACTION,-->
                        <div class="col-md-8">

                         <span class="smaller_h">1.</span>
                            ${value.action}
                            ${actions(value.likes, value.additions, value.flags, value.id)} 
                             
                            
                      
                           

                        </div>
                            <!--INFO ABOUT GLOBBER-->
                        <div class="col-md-4 border_blue">
                             ${value.user_name}  ${value.user_feel}  ${value.id}
                              <hr class="p-0 m-1">
                              <span class="float-left">I feel :</span>  <br>  
                               <span class=" smaller_h  text-info">${value.i_feel}  </span>
                               <hr class="p-0 m-1">
                               <span>because :</span><br>
                                ${value.because}

                        </div>
                        
                    </div>


                `)

                    })
                }

                /*BUTTON + WHEN USER WANTS TO ADD ACTION TO HIS FEELIST WE WILL
                * FIRE ALERT WITH HIS FEELISTS INTO WHICH HE CAN ADD
                * THIS ACTION, OR HE HAS OPTION OF CREATING NEW FEELIST
                * AND ADD ACTION TO NEW FEELIST*/
                $('.add_to_feelist').on('click', function () {

                    var post_id = $(this).data('id')

                    var action = $(this).data('action')

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
                        perform_action($(this));
                    })

                    /*WHEN GLOBBER IS CREATING NEW FEELIST, WE ARE APPENDING NAME OF THE FEELIST TO data-feelist
                    * ATTRIBUTE ON RADIO BUTTON SO THAT WE CAN RETRIEVE IT IN perform_action()
                    * FUNCTION AND SAVE ACTION TO NEWLY CREATED FEELIST*/
                    $('#new_feelist').on('input', function () {


                        $('#new').data("feelist", $(this).val())
                    })
                })

                /*BY CLICKING ON HEARTH ICON TO LIKE OR FLAG ICON TO FLAG
                * ACTION AS INAPPROPRIATE WE WILL UPDATE DB*/
                $('.gl_action').on('click', function () {

                    perform_action($(this));
                })

            });


        return false;
    });

    /*SENDING AJAX REQUEST TO SERVER TO UPDATE USER AND GLOB'S ACTIONS*/
    function perform_action($_this) {

        var post_id = $_this.data('id')
        var action = $_this.data('action')

        var feelist_name = $("input[name='feelist']:checked").data('feelist');
         var new_feelist = $("input[name='feelist']:checked").data('new_feelist');


        /*WHEN USER ADDING ACTION TO HIS FEELIST AND HE DOESN'T SELECT ANY FEELIST
        * OR HE CHECKS NEW FEELIST BUT DOESN'T TYPE IN NEW FEELIST NAME
        * WE WILL NOT PROCEED , BUT NOTIFY HIM THAT HE NEEDS TO SELECT FEELIST*/
        if (action === 'additions' && (feelist_name === undefined || feelist_name.length === 0)) {
            $("#no_feelist").removeClass('d-none')
        }
        /*ALL GOOD => FEELIST SELECTED*/
        else {
            /*CLOSING ALERT WITH USER'S FEELISTS*/
            swal.close();

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
                        console.log(data.dumps)
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

                        var action_el = $('#' + action +'_'+ post_id)
                        action_el.text(parseInt(action_el.text()) + 1)
                            .addClass('blue bg-warning p-1')
                            .prop('disabled','disabled')

                    }

                });
        }


    }

    /*HELPER FUNCTION TO APPEND ACTIONS FOR EVERY GLOB(POST)
    * WITH DATA ABOUT EVERY ACTION
    * post_id => WHICH GLOB DOES ACTION BELONGS TO (ObjectId)
    * action => WHICH ACTION IS IT (likes, feelist, flag)
    *           SO THAT WE CAN TAKE APPROPRIATE ACTION*/
    function actions(likes, additions, flags, post_id) {

        return `       
                            <i  data-id="${post_id}"  data-action="likes"
                            class="fas fa-heart float-right ml-3 gl_action" title="like it!" >
                            <span id="likes_${post_id}" >&nbsp;${likes}</span> </i> 
          
                            <i   data-id="${post_id}"  data-action="additions"
                            class="fas fa-plus float-right ml-3 add_to_feelist" title="add to your feelist!">
                            <span id="additions_${post_id}" >&nbsp;${additions}</span>
                            </i>
                            <i  data-id="${post_id}"  data-action="flags"
                            class="far fa-flag float-right ml-3 gl_action" title="report as inappropriate">
                             <span id="flags_${post_id}" >&nbsp;${flags}</span>
                                    </i>
                             <hr >
                           `

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


});