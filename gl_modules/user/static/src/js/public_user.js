(function () {
   const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

    })







    function render_posts(div, posts, title, single_user, controls, delete_class, f_name = null) {

        // $('.user_interaction').addClass('d-none')
        // div.removeClass('d-none').html('').append(`<h4 class="feelist_title">${title}
        // ${delete_class === 'delete_action' ? `<small  class="float-right delete_feelist" title="Delete feelist?" data-f_name="${f_name}">
        //          <i class="far fa-trash-alt"></i></small>` : `${delete_class === '' ?
        //     `<small  class="float-right " id="remove_from_globe" title="Remove from globe?" data-glober_id="${sessionStorage.getItem('glober_id')}">
        //          <i class="far fa-trash-alt"></i></small>` : ``}`}</h4>`)

        $.each(posts, function (key, post) {
            div.append(`<div class="row mb-1" id="${post.post_id}">
                                <div class="col-md-4 border_blue_l p-2 d-flex justify-content-around">
                                    <img class="avatar" src="assets/dist/images/avatars/${single_user ? 1 : Math.ceil(Math.random() * 10)}.png"/>
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

})()



