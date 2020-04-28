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


            $.each(search_results, function (key, value) {


                results.append(`

                    <div class="row mb-2 border_blue pt-2">
                     
                        <div class="col-md-8">

                          ${value.action_1 !== '' ?
                    `<span class="smaller_h">1.</span>`
                    + value.action_1
                    + actions(value.action_1_likes, 1, value.id) : ''}
                             
                            
                          
                          ${value.action_2 !== '' ?
                    `<span class="smaller_h">2.</span>`
                    + value.action_2
                    + actions(value.action_2_likes, 2, value.id) : ''}
                              
                         ${value.action_3 !== '' ?
                    `<span class="smaller_h">3.</span>`
                    + value.action_3
                    + actions(value.action_3_likes, 3, value.id) : ''}
                         
                           

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

            $(function () {
                $('.gl_action').on('click', function () {
                    var glob_id = $(this).attr('id')
                    var action_num = $(this).data('action_num')

                    $.getJSON('/_like_action', {
                        glob_id: glob_id,
                        action_num: action_num

                    }, function (data) {
                        var action = $('#like_' + data.result + '_' + action_num)
                        /*user can only like the action once*/
                        if (liked_actions.indexOf(data.result + '_' + action_num) === -1) {

                            action.text(parseInt(action.text()) + 1).addClass('blue')

                            liked_actions.push(data.result + '_' + action_num)

                        }

                    });
                })
            });

            $('#feelist_search').get(0).scrollIntoView();
        });

        return false;
    });

    function actions(likes, action_num, id) {

        return `       
                            <i  id="${id}" data-action_num="${action_num}"
                            class="fas fa-heart float-right ml-3 gl_action" title="like it!" >
                            <span id="like_${id}_${action_num}" >&nbsp;${likes}</span> </i> 
          
                            <i   id="${id}"  data-action_num="${action_num}"
                            class="fas fa-plus float-right ml-3 gl_action" title="add to your feelist!"></i>
                            <i  id="${id}" data-action_num="${action_num}"
                            class="far fa-flag float-right ml-3 gl_action" title="report as inappropriate"></i>
                             <hr >
                           `

    }


});

