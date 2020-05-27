/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./gl_modules/posts/static/js/posts.js":
/*!*********************************************!*\
  !*** ./gl_modules/posts/static/js/posts.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shared_static_js_swal_toast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/static/js/swal_toast */ \"./gl_modules/shared/static/js/swal_toast.js\");\n\n\n\n/*FUNCTIONS FOR SEARCH AND INTERACTION WITH POSTS\n*\n* USER CAN:\n*           1. LIKE  ACTIONS\n*           2. ADD ANY OF THE ACTIONS TO HIS FEELIST\n*           3. FLAG ACTION AS INAPPROPRIATE\n*           4. SEARCH FOR POSTS\n* */\n$(function () {\n\n    /*GETTING LATEST POSTS ON INITIAL PAGE LOAD,\n    * IF WE ARE ON COUNTRY PAGE, WE WILL RENDER\n    * POSTS FROM THAT COUNTRY, IF ON LANDING PAGE\n    * POSTS FROM THE WORLD\n    *\n    * TO DO: GET POSTS ACCORDING TO BROWSER LANGUAGE,\n    *       ADD LANGUAGE TO USER OBJECT AND POST ITSELF*/\n\n\n    $('#search,#c_search').on('click', function () {\n\n        /*AJAX REQUEST TO GET RESULTS*/\n        $.getJSON('/_search', {\n                q: $('input[name=\"search_field\"]').val(),\n                cc: $(this).data('cc')\n\n            },\n\n            function (data) {\n\n\n                var results = $(\"#search_results\").html('');\n                if (screen.width < 768) results.get(0).scrollIntoView();\n\n                /*WE HAVE NO RESULTS*/\n                if (data.result.length === 0) {\n\n                    results.prepend(` \n                <p class=\" feelist_title text-center\"> There are no results for how you feeling now! <br>\n                Be first to write post about : <br>\n                    <span class=\"blue\">${$('input[name=\"search_field\"]').val()}</span>  \n                    \n                    </p>\n                        `)\n\n                    $('.first_post').removeClass('d-none')\n\n                }\n                /*WE HAVE RESULTS*/\n                else {\n                    $('.first_post').addClass('d-none')\n\n                    render_posts(data.result)\n                }\n\n\n                /*APPENDING EVENT LISTENERS AFTER RENDERING SEARCH RESULTS\n                * AFTER AJAX CALL*/\n                add_listeners(data.authorized_user, data.feelists)\n\n\n            });\n\n\n    });\n\n\n    /*APPENDING EVENT LISTENERS ON PUBLIC USER PAGE\n               * NOT AJAX CALL*/\n    if (window.location.pathname.includes('/user/')) {\n        $.getJSON('/is_authorized', {}, function (is_authorized) {\n            var authorized_user = is_authorized.user\n            var feelists = is_authorized.feelists\n\n            $('.add_to_feelist').on('click', function () {\n\n                add_to_feelist($(this), authorized_user, Object.keys(feelists))\n            })\n\n            /*BY CLICKING ON HEARTH ICON TO LIKE OR FLAG ICON TO FLAG\n            * ACTION AS INAPPROPRIATE WE WILL UPDATE DB*/\n            $('.gl_action').on('click', function () {\n\n                post_action($(this), authorized_user);\n            })\n\n            /*USER CAN ADD ANOTHER USER INTO HIS GLOB TO SEE POSTS FROM THIS USER*/\n            $('.add_to_glob,.remove_from_glob').on('click', function () {\n\n                globe_action($(this), authorized_user)\n            })\n        })\n\n\n    }\n\n\n    /*ADDING OR REMOVING USER FROM MyGlobe*/\n    function globe_action($_this, authorized_user) {\n        var user_id = $_this.data('user_id')\n        var user_name = $_this.data('user_name')\n        var user_action = $_this.data('user_action')\n        if (!authorized_user) {\n            please_login()\n        } else {\n            $.getJSON('/glob_action',\n                {\n                    user_id: user_id,\n                    user_action: user_action\n                },\n                function (response) {\n\n                    if (response.text === 'success' && user_action === 'added_to_glob') {\n                        $('.added_to_glob' + user_id).addClass('d-none')\n                        $('.removed_from_glob' + user_id).removeClass('d-none')\n\n                        happy_toast(`${user_name} was added!`)\n\n                    } else if (response.text === 'success' && user_action === 'removed_from_glob') {\n                        $('.added_to_glob' + user_id).removeClass('d-none')\n                        $('.removed_from_glob' + user_id).addClass('d-none')\n\n                        sad_toast(`${user_name} was removed!`)\n\n                    }\n\n                })\n        }\n    }\n\n    function please_login() {\n        swal.fire({\n            html: `\n                                Please \n                                <a class=\"\" href=\"/sign_in\">Sign in </a>\n                                or\n                                <a class=\"\" href=\"/sign_up\">Sign up </a>\n                                to continue.\n                                <hr class=\"bg_blue\">\n                                <button class=\"gl_button smaller_h\" onclick=\"swal.close();\">ok</button>\n                            `,\n            showConfirmButton: false\n        })\n    }\n\n    /*SENDING AJAX REQUEST TO SERVER TO UPDATE USER'S LIKES,FLAGS,FEELISTS...*/\n    function post_action($_this, authorized_user) {\n\n        var post_id = $_this.data('id')\n        var action = $_this.data('action')\n\n        var checked_feelist = $(\"input[name='feelist']:checked\")\n        var feelist_name = checked_feelist.data('feelist');\n        var new_feelist = checked_feelist.data('new_feelist');\n\n\n\n        if (!authorized_user) please_login()\n\n        /*WHEN USER ADDING ACTION TO HIS FEELIST AND HE DOESN'T SELECT ANY FEELIST\n        * OR HE CHECKS NEW FEELIST BUT DOESN'T TYPE IN NEW FEELIST NAME\n        * WE WILL NOT PROCEED , BUT NOTIFY HIM THAT HE NEEDS TO SELECT FEELIST*/\n        else if (action === 'additions' && (feelist_name === undefined || feelist_name.length === 0)) {\n            $(\"#no_feelist\").removeClass('d-none')\n        }\n        /*ALL GOOD => FEELIST SELECTED*/\n        else {\n            /*CLOSING ALERT WITH USER'S FEELISTS*/\n            $('#feelist_saved').text('saved').addClass('gl_button')\n            $('.save_feelist').addClass('d-none')\n\n            /*AJAX REQUEST TO PERFORM THE ACTION*/\n            $.getJSON(\n                '/_actions',\n                {\n                    post_id: post_id,\n                    action: action,\n                    feelist_name: feelist_name,\n                    new_feelist: new_feelist\n\n                },\n                function (data) {\n\n                    /*IF USER IS NOT AUTHORIZED*/\n                    if (data.result === \"not_authorized\") {\n                        please_login()\n                    }\n                    /*IF USER ALREADY LIKED OR ADDED ACTION\n                    * WE WILL NOTIFY HIM*/\n                    else if (data.result === \"already_added\") {\n                        swal.fire({\n                            html: `\n                               \n                               \n                               <span class=\"smaller_h\">pssst.... you already ${action === 'likes'\n                                ? `liked` : `${action === 'flags' ? `flagged` : `added`}`\n                            } it ...;)</span>\n                                <hr class=\"bg_purple\">\n                                <button class=\"gl_button smaller_h bg_purple\" onclick=\"swal.close();\">ok</button>\n                            `,\n                            showConfirmButton: false\n                        })\n                    }\n                    /*ELSE WE WILL INCREASE THE NUMBER ON LIKES /ADDITIONS ON THE\n                    * PAGE, TO GIVE USER INSTANT FEEDBACK*/\n                    else {\n\n                        var action_el = $('#' + action + '_' + post_id)\n                        if (action === 'likes') {\n                            action_el.text(parseInt(action_el.text()) + 1)\n                                .addClass('blue bg-warning p-1')\n                                .prop('disabled', 'disabled')\n                        }\n\n\n                        happy_toast(`${action === 'likes'\n                            ? `liked` : `${action === 'flags' ? `flagged` : `added`}`\n                        }!`)\n\n                    }\n\n                });\n        /*USER FEEDBACK ON CHOOSING THE ACTION*/\n        if (action === 'flags') $_this.addClass('text-warning')\n        if (action === 'likes') $_this.addClass('text-danger')\n        if (action === 'additions') window.location.reload()\n        }\n\n\n    }\n\n    /*ACTION TO ADD POST TO FEELIST, SHOWING USERS FEELISTS IN POPUP, SO HE CAN CHOOSE ONE OF EXISTING\n    * FEELISTS OR CREATE NEW ONE*/\n    function add_to_feelist($_this, authorized_user, feelists) {\n\n        var post_id = $_this.data('id')\n\n        var action = $_this.data('action')\n\n        if (!authorized_user) {\n            please_login()\n\n        } else {\n\n            /*creating list with user's feelists, so he can choose\n            * where to add new action to*/\n            var feelist_div = \"\"\n            if (feelists.length) {\n                for (var list in feelists) {\n                    feelist_div += `<div class=\"input-group mb-3\">\n                                            <div class=\"input-group-prepend\">\n                                                <div class=\"input-group-text bg-transparent border_bottom_only\">\n                                                    <input type=\"radio\" name=\"feelist\" class=\"feelist_check\"\n                                                           value=\"${feelists[list]}\" data-feelist=\"${feelists[list].replace(/ /g, '_')}\">\n                                                </div>\n                                            </div>\n                                            <label class=\"feelist form-control border_bottom_only ${feelists[list].replace(/ /g, '_')}\"\n                                             for=\"${feelists[list]}\" >${feelists[list]}</label>\n                                        </div>`\n                }\n            }\n\n\n            swal.fire({\n                width: 200,\n                showConfirmButton: false,\n                html: `\n                           <div class=\"row\">\n                           <div class=\"col-md-12\">\n                           <h4 class=\"smaller_h\" id=\"add_to\">add to</h4>\n                           \n                                <small>one of your feelists or create new one</small> <hr>\n                           <h4 class=\"smaller_h d-none bg_purple text-light\" id=\"no_feelist\">feelist ?</h4>\n                     \n                            </div>\n                                <ul class=\"list-group\">\n            \n                                       ${feelist_div}\n                                        \n                                        <!-- user can create new feelist-->\n                                        <div class=\"input-group mb-3\">\n                                            <div class=\"input-group-prepend\">\n                                                <div class=\"input-group-text bg-transparent border_bottom_only\">\n                                                    <input type=\"radio\" data-new_feelist=\"true\" data-cy=\"new_feelist_check\"\n                                                           name=\"feelist\" id=\"new\" data-feelist=\"\" >\n                                                </div>\n                                            </div>\n                                           <input type=\"text\" class=\"form-control border_bottom_only  form_label\"  data-cy=\"new_feelist_name\"\n                                            id=\"new_feelist\" name=\"new_feelist\"    placeholder=\"create new\">\n                                        </div>\n            \n                                    \n                                </ul>\n                                <button class=\"gl_button gl_action save_feelist\" data-cy=\"new_feelist_save\"\n                                data-id=\"${post_id}\" data-action=${action}\n                                \n                                >save</button>\n                                <span id=\"feelist_saved\" class=\"text-center\" onclick=\"swal.close()\" ></span>\n                                \n                            </div>\n                            `\n            })\n\n        }\n\n        /*USER COLOR FEEDBACK ON SELECTING FEELISTS*/\n        $('#new').on('click', function () {\n            $('.feelist').removeClass('bg_blue text-light')\n            $('#new_feelist').addClass('border_purple')\n            $('#no_feelist').addClass('d-none')\n        })\n        $('.feelist_check').on('click', function () {\n            $('.feelist').removeClass('bg_blue text-light')\n            $('#new_feelist').removeClass('border_purple')\n            $('#no_feelist').addClass('d-none')\n            $('.' + $(this).data('feelist')).addClass('bg_blue text-light')\n        })\n        /*BY CLICKING ON save BUTTON HE CAN SAVE ACTION TO HIS FEELIST*/\n        $('.save_feelist').on('click', function () {\n            post_action($(this), authorized_user);\n\n\n        })\n\n        /*WHEN GLOBBER IS CREATING NEW FEELIST, WE ARE APPENDING NAME OF THE FEELIST TO data-feelist\n        * ATTRIBUTE ON RADIO BUTTON SO THAT WE CAN RETRIEVE IT IN perform_action()\n        * FUNCTION AND SAVE ACTION TO NEWLY CREATED FEELIST*/\n        $('#new_feelist').on('input', function () {\n            $('#new').data(\"feelist\", $(this).val())\n        })\n    }\n\n    function happy_toast(message) {\n        _shared_static_js_swal_toast__WEBPACK_IMPORTED_MODULE_0__[\"Toast\"].fire({\n            html: ` <img  src=\"/assets/dist/images/happy.png\"/>\n                                                    <p class=\"text-success\">${message}</h4> `\n        })\n    }\n\n    function sad_toast(message) {\n        _shared_static_js_swal_toast__WEBPACK_IMPORTED_MODULE_0__[\"Toast\"].fire({\n            html: ` <img  src=\"/assets/dist/images/sad.png\"/>\n                                                    <p class=\"text-danger\">${message}</h4> `\n        })\n    }\n\n    function render_posts(posts) {\n        var counter = 1\n\n        $.each(posts, function (key, post) {\n\n\n            $(\"#search_results\").append(`\n\n                    <div class=\"row mb-2 border_blue_l pt-2\">\n                     \n                     <div class=\"col-md-8 pb-2\">\n                      <span >(When) I feel :</span>  \n                               <span class=\"text-info\" >${post.i_feel.join(' ')}  </span>\n                               <span >because :</span>\n                               <span  class=\"text-info\">${post.because.join(' ')}  </span> <br>\n                        \n                              <span>${post.action}</span> \n                            <br>\n                     ${post.flags === 0 ? ` \n                               \n                            \n                            <i  data-id=\"${post.id}\"  data-action=\"likes\"\n                            class=\"fas fa-heart float-right ml-3 gl_action\" title=\"like it!\" >\n                            <span id=\"likes_${post.id}\" data-cy=\"like_post${counter}\">&nbsp;${post.likes}</span> </i> \n          \n                            <i   data-id=\"${post.id}\"  data-action=\"additions\" data-cy=\"add_post${counter}\"\n                            class=\"fas fa-plus float-right ml-3 add_to_feelist\" title=\"add to your feelist!\">\n                            <span id=\"additions_${post.id}\" ></span>\n                            </i>\n                            <i  data-id=\"${post.id}\"  data-action=\"flags\" data-cy=\"flag_post${counter}\"\n                            class=\"far fa-flag float-right ml-3 gl_action\" title=\"report as inappropriate\">\n                             <span id=\"flags_${post.id}\" ></span>\n                                    </i>\n                        ` : ` <i class=\"fas fa-exclamation-circle float-right ml-3 text-warning\" title=\"like it!\" >\n                            <span id=\"likes_${post.id}\" >under review</span> </i> `}\n                     </div>\n                      \n                            <!--INFO ABOUT GLOBBER-->\n                        <div class=\"col-md-4 \">\n                        \n                            <img class=\"avatar\" src=\"assets/dist/images/avatars/${post.image_id}.png\"/>\n                            <a href=\"/user/${post.user_id}\" class=\"user\">\n                           <span > ${post.name}</span>   <span class=\"user_heart post p-2 m-1\">${post.user_feel}</span>  \n                             </a> \n                              <span class=\"float-right remove_from_glob blue removed_from_glob${post.user_id}\n                             ${post.in_my_glob === 1 ? '' : 'd-none'}\" \n                             data-cy=\"remove_user${counter}\"\n                             data-user_id=\"${post.user_id}\" \n                             data-user_name=\"${post.name}\"\n                             data-user_action=\"removed_from_glob\"\n                             title=\"Remove me from your glob !\">\n                             <i class=\"fas fa-user-minus\"></i>\n                             </span>\n                             <span class=\"float-right add_to_glob blue added_to_glob${post.user_id}\n                            ${post.in_my_glob !== 1 ? '' : 'd-none'}\" \n                             data-user_id=\"${post.user_id}\" \n                             data-cy=\"add_user${counter}\"\n                             data-user_name=\"${post.name}\"\n                              data-user_action=\"added_to_glob\"\n                             title=\"Add me to your glob !\">\n                             <i class=\"fas fa-user-plus\"></i>\n                             </span>\n                             <br>\n                             <span >${post.created_at}</span>\n                              <span ></span>\n                              <hr class=\"p-0 m-1\">\n                        </div>\n                    </div>\n\n\n                `)\n\n\n            counter++\n        })\n    }\n\n    function latest_posts(cc) {\n\n        $('#post_search').removeClass('d-none');\n        $.getJSON('/_search',\n            {\n                q: '',\n                cc: cc\n            },\n            function (latest) {\n\n                render_posts(latest.result)\n                add_listeners(latest.authorized_user, latest.feelists)\n            })\n    }\n\n    /*APPENDING EVENT LISTENERS AFTER RENDERING SEARCH RESULTS\n    * AFTER AJAX CALL*/\n    function add_listeners(authorized_user, feelists) {\n        /*BUTTON + WHEN USER WANTS TO ADD ACTION TO HIS FEELIST WE WILL\n               * FIRE ALERT WITH HIS FEELISTS INTO WHICH HE CAN ADD\n               * THIS ACTION, OR HE HAS OPTION OF CREATING NEW FEELIST\n               * AND ADD ACTION TO NEW FEELIST*/\n        $('.add_to_feelist').on('click', function () {\n\n            add_to_feelist($(this), authorized_user, Object.keys(feelists))\n        })\n\n        /*BY CLICKING ON HEARTH ICON TO LIKE OR FLAG ICON TO FLAG\n        * ACTION AS INAPPROPRIATE WE WILL UPDATE DB*/\n        $('.gl_action').on('click', function () {\n\n            post_action($(this), authorized_user);\n        })\n\n        /*USER CAN ADD ANOTHER USER INTO HIS GLOB TO SEE POSTS FROM THIS USER*/\n        $('.add_to_glob,.remove_from_glob').on('click', function () {\n\n\n            globe_action($(this), authorized_user)\n        })\n    }\n\n    latest_posts($('#c_search').data('cc') ? $('#c_search').data('cc') : '')\n});\n\n\n\n\n//# sourceURL=webpack:///./gl_modules/posts/static/js/posts.js?");

/***/ }),

/***/ "./gl_modules/shared/static/js/swal_toast.js":
/*!***************************************************!*\
  !*** ./gl_modules/shared/static/js/swal_toast.js ***!
  \***************************************************/
/*! exports provided: Toast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Toast\", function() { return Toast; });\n const Toast = Swal.mixin({\n        toast: true,\n        position: 'top-end',\n        showConfirmButton: false,\n        timer: 2000,\n        timerProgressBar: true,\n\n    })\n\n//# sourceURL=webpack:///./gl_modules/shared/static/js/swal_toast.js?");

/***/ }),

/***/ "./gl_modules/user/static/src/js/public_user.js":
/*!******************************************************!*\
  !*** ./gl_modules/user/static/src/js/public_user.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n\n\n\n\n//# sourceURL=webpack:///./gl_modules/user/static/src/js/public_user.js?");

/***/ }),

/***/ 0:
/*!**************************************************************************************************!*\
  !*** multi ./gl_modules/posts/static/js/posts.js ./gl_modules/user/static/src/js/public_user.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./gl_modules/posts/static/js/posts.js */\"./gl_modules/posts/static/js/posts.js\");\nmodule.exports = __webpack_require__(/*! ./gl_modules/user/static/src/js/public_user.js */\"./gl_modules/user/static/src/js/public_user.js\");\n\n\n//# sourceURL=webpack:///multi_./gl_modules/posts/static/js/posts.js_./gl_modules/user/static/src/js/public_user.js?");

/***/ })

/******/ });