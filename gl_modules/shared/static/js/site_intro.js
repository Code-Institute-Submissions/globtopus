/*SITE INTRO
*
* WHEN USER IS VISITING PAGE FOR THE FIRST TIME, WE WILL WELCOME HIM AND OFFER TOUR OF THE PAGE
* AND SET   sessionStorage VARIABLE OF THE PAGE AS DONE, SO WE WONT
* FIRE POPUP AGAIN, USER HAS OPTION OF SEEING TOUR BY CLICKING ON THE TAKE TOUR BUTTON NEXT TO THE LOGO
*
* PAGES ARE landing.html, country.html, user.html, public_user.html, sign_up.html,tests.html*/

(function () {
     var current_page = $('.current_page').data('current_page')

    //localStorage.removeItem(current_page+'_intro')

    if((localStorage.getItem(current_page+'_intro') !== 'done'
        && window.location.pathname !== '/user')    && window.location.pathname !== '/sign_in' )
    {
        swal.fire({
            html:`<img  src="/assets/dist/images/happy.png"/>
                    <h4>Hi there !</h4>
                    <p>It looks like it is your first visit to ${current_page} page. We are very happy to have you! </p>
                    <p>Globtopus was created for you to feel better or to share your experience on how to feel better!</p>
                   
                  
                   For the best user experience, we recommend these browsers : Google Chrome, Edge or Opera.
                    <hr>
                    <!--desktop-->
                     <a class="btn feelist_title text-center text-light flash_success  p-3 m-3 d-none d-md-block"
                     href="javascript:void(0);" onclick="javascript:introJs().start();swal.close();">Take a tour</a>
                     <!--mobile showing post from for intro, because on mobile devices it is hidden-->
                      <a class="btn feelist_title text-center text-light flash_success p-3 m-3  p-3 d-md-none"
                     href="javascript:void(0);" onclick=introJs().start();swal.close();$('.feel_form').removeClass('d-none')>Take a tour</a>
                     
                     <a href="#" class="btn feelist_title text-center text-light flash_error p-3" onclick="swal.close();">Skip tour</a>
                        `,
                    showConfirmButton:false
        })



        localStorage.setItem(current_page+'_intro','done')

    }
})()

