(function () {
    $('#feelist').on('click', function () {
        $('#feelist_search').toggleClass('d-none')

        $('#feelist_search').get(0).scrollIntoView();

    })


})()


$(function () {

    var liked_actions = []
    $('#get_results').on('click', function () {


        $.getJSON('/_search', {
            q: $('input[name="search"]').val(),

        }, function (data) {
            var search_results = data.result
            var results = $("#results").html('')


            if(search_results.length == 0)
            {
                results.append(` 
                <h4 class="smaller_h"> There are no actions for how you feeling now :
                    <span class="blue">${$('input[name="search"]').val()}</span>  
                    
                    </h4>`)
            }
            else
            {
                 $.each(search_results, function (key, value) {


                results.append(`

                    <div class="row mb-2 border_blue pt-2">
                     
                        <div class="col-md-8">

                          ${value.action_1 !== '' ?
                    `<span class="smaller_h">1.</span>`
                    + value.action_1
                    + actions(value.action_1_likes,value.action_1_likes, 1, value.id) : ''}
                             
                            
                          
                          ${value.action_2 !== '' ?
                    `<span class="smaller_h">2.</span>`
                    + value.action_2
                    + actions(value.action_2_likes,value.action_2_feelist, 2, value.id) : ''}
                              
                         ${value.action_3 !== '' ?
                    `<span class="smaller_h">3.</span>`
                    + value.action_3
                    + actions(value.action_3_likes,value.action_3_likes, 3, value.id) : ''}
                         
                           

                        </div>

                        <div class="col-md-4 border_blue">
                             ${value.user_name}  ${value.user_feel}  ${value.id}
                              <hr class="p-0 m-1">
                              <span class="float-left">I feel :</span>  <br>   <span class=" smaller_h  text-info">${value.feelings}  </span>
                               <hr class="p-0 m-1">
                               <span>because :</span><br>
                                ${value.because}

                        </div>
                        
                    </div>


                `)

            })
            }



            $(function () {
                $('.gl_action').on('click', function () {

                    var glob_id = $(this).attr('id')
                    var action_num = $(this).data('action_num')
                    var action = $(this).data('action')


                    $.getJSON('/_actions', {
                        glob_id: glob_id,
                        action_num: action_num,
                        action: action

                    }, function (data) {
                        /*if user already likes the action we will
                        * show feedback that he already liked it*/

                        if (data.result === 0) {
                            swal.fire('you already ' + action + ' it')
                        } else {

                            var action_el = $('#'+action+'_' + data.result + '_' + action_num)


                            /*user can only like the action once*/
                            if (liked_actions.indexOf(action+'_'+ data.result + '_' + action_num) === -1) {
                                /*update count of likes on the screen for user to see*/
                                action_el.text(parseInt(action_el.text()) + 1).addClass('blue')

                                liked_actions.push(action+'_' +data.result + '_' + action_num)
                            }


                        }

                    });
                })
            });

            $('#feelist_search').get(0).scrollIntoView();
        });

        return false;
    });

    function actions(likes,feelist, action_num, id) {

        return `       
                            <i  id="${id}" data-action_num="${action_num}" data-action="likes"
                            class="fas fa-heart float-right ml-3 gl_action" title="like it!" >
                            <span id="likes_${id}_${action_num}" >&nbsp;${likes}</span> </i> 
          
                            <i   id="${id}"  data-action_num="${action_num}" data-action="feelist"
                            class="fas fa-plus float-right ml-3 gl_action" title="add to your feelist!">
                            <span id="feelist_${id}_${action_num}" >&nbsp;${feelist}</span>
                            </i>
                            <i  id="${id}" data-action_num="${action_num}" data-action="flag"
                            class="far fa-flag float-right ml-3 gl_action" title="report as inappropriate"></i>
                             <hr >
                           `

    }


});

