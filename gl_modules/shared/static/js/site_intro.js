(function () {
     var current_page = $('.current_page').data('current_page')


    //localStorage.removeItem(current_page+'_intro')
    if((localStorage.getItem(current_page+'_intro') !== 'done'
        && window.location.pathname !== '/user')    && window.location.pathname !== '/sign_in' )
    {
        swal.fire({
            html:`<img  src="/assets/dist/images/happy.png"/>
                    <h4>Hi there !</h4>
                    <p>It looks like it is your first visit to this page We are very happy to have you! 
                    We hope that you will have a great experience using this site, and we prepared a little tour for you!
                   </p>
                   <hr>
                   For the best user experience, we recommend these browsers : Google Chrome, Edge or Opera.
                    <hr>
                    <!--desktop-->
                     <a class="btn feelist_title text-center text-light flash_success  p-3 d-none d-md-block"
                     href="javascript:void(0);" onclick="javascript:introJs().start();swal.close();">Take a tour</a>
                     <!--mobile-->
                      <a class="btn feelist_title text-center text-light flash_success  p-3 d-md-none"
                     href="javascript:void(0);" onclick=user_nav();>Take a tour</a>
                     
                     
                        `,
                    showConfirmButton:false
        })



        localStorage.setItem(current_page+'_intro','done')

    }
})()

