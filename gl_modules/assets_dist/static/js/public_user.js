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
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*FUNCTIONS FOR SEARCH AND INTERACTION WITH POSTS\r\n*\r\n* USER CAN:\r\n*           1. LIKE  ACTIONS\r\n*           2. ADD ANY OF THE ACTIONS TO HIS FEELIST\r\n*           3. FLAG ACTION AS INAPPROPRIATE\r\n*           4. SEARCH FOR POSTS\r\n* */\r\n$(function () {\r\n const Toast = Swal.mixin({\r\n        toast: true,\r\n        position: 'middle-end',\r\n        showConfirmButton: false,\r\n        timer: 2000,\r\n        timerProgressBar: true,\r\n\r\n    })\r\n    var authorized_user\r\n    $('#get_results').on('click', function () {\r\n\r\n        /*AJAX REQUEST TO GET RESULTS*/\r\n        $.getJSON('/_search', {\r\n                q: $('input[name=\"search\"]').val(),\r\n\r\n            },\r\n\r\n            function (data) {\r\n\r\n                var search_results = data.result\r\n                var feelists = Object.keys(data.feelists)\r\n                console.log(\"feelists\" + feelists)\r\n                authorized_user = data.authorized_user\r\n\r\n\r\n                var results = $(\"#results\").html('');\r\n\r\n                results.get(0).scrollIntoView();\r\n\r\n                /*WE HAVE NO RESULTS*/\r\n                if (search_results.length == 0) {\r\n\r\n                    results.append(` \r\n                <h4 class=\"smaller_h\"> There are no actions for how you feeling now :\r\n                    <span class=\"blue\">${$('input[name=\"search\"]').val()}</span>  \r\n                    \r\n                    </h4>`)\r\n                }\r\n                /*WE HAVE RESULTS*/\r\n                else {\r\n\r\n                    var counter = 1\r\n\r\n                    $.each(search_results, function (key, value) {\r\n\r\n\r\n                        results.append(`\r\n\r\n                    <div class=\"row mb-2 border_blue_l pt-2\">\r\n                     <!--APPENDING  ACTION,-->\r\n                        <div class=\"col-md-8\">\r\n\r\n                         <span class=\"smaller_h\">1.</span>\r\n                            ${value.action}\r\n                            ${actions(value.likes, value.additions, value.flags, value.id)} \r\n                        </div>\r\n                            <!--INFO ABOUT GLOBBER-->\r\n                        <div class=\"col-md-4 \">\r\n                         <img class=\"avatar\" src=\"assets/dist/images/avatars/${counter % 12}.png\"/>\r\n                             ${value.name}  ${value.user_feel}  \r\n                              <span class=\"float-right remove_from_glob blue removed_from_glob${value.user_id}\r\n                             ${value.in_my_glob === 1 ? '' : 'd-none'}\" \r\n                             data-user_id=\"${value.user_id}\" \r\n                             data-user_name=\"${value.name}\"\r\n                             data-user_action=\"removed_from_glob\"\r\n                             title=\"Remove me from your glob !\">\r\n                             <i class=\"fas fa-user-minus\"></i>\r\n                             </span>\r\n                             <span class=\"float-right add_to_glob blue added_to_glob${value.user_id}\r\n                            ${value.in_my_glob !== 1 ? '' : 'd-none'}\" \r\n                             data-user_id=\"${value.user_id}\" \r\n                             data-user_name=\"${value.name}\"\r\n                              data-user_action=\"added_to_glob\"\r\n                             title=\"Add me to your glob !\">\r\n                             <i class=\"fas fa-user-plus\"></i>\r\n                             </span>\r\n                             <br>\r\n                             <span class=\"action_response_r${value.user_id}\"></span>\r\n                              <span class=\"action_response_a${value.user_id}\"></span>\r\n                              <hr class=\"p-0 m-1\">\r\n                              <span class=\"float-left\">I feel :</span>  <br>  \r\n                               <span class=\"text-info\">${value.i_feel.join(' ')}  </span>\r\n                               <hr class=\"p-0 m-1\">\r\n                               <span>because :</span><br>\r\n                               <span class=\"text-info\">${value.because.join(' ')}  </span>\r\n                                \r\n\r\n                        </div>\r\n                        \r\n                    </div>\r\n\r\n\r\n                `)\r\n                        counter++\r\n                    })\r\n                }\r\n\r\n                /*BUTTON + WHEN USER WANTS TO ADD ACTION TO HIS FEELIST WE WILL\r\n                * FIRE ALERT WITH HIS FEELISTS INTO WHICH HE CAN ADD\r\n                * THIS ACTION, OR HE HAS OPTION OF CREATING NEW FEELIST\r\n                * AND ADD ACTION TO NEW FEELIST*/\r\n                $('.add_to_feelist').on('click', function () {\r\n\r\n                    var post_id = $(this).data('id')\r\n\r\n                    var action = $(this).data('action')\r\n\r\n                    if (!authorized_user) {\r\n                        please_login()\r\n\r\n                    } else {\r\n\r\n                        /*creating list with user's feelists, so he can choose\r\n                        * where to add new action to*/\r\n                        var feelist_div = \"\"\r\n                        if (feelists.length) {\r\n                            for (var list in feelists) {\r\n                                feelist_div += `<div class=\"input-group mb-3\">\r\n                                            <div class=\"input-group-prepend\">\r\n                                                <div class=\"input-group-text bg-transparent border_bottom_only\">\r\n                                                    <input type=\"radio\" name=\"feelist\" class=\"feelist_check\"\r\n                                                           value=\"${feelists[list]}\" data-feelist=\"${feelists[list].replace(/ /g, '_')}\">\r\n                                                </div>\r\n                                            </div>\r\n                                            <label class=\"feelist form-control border_bottom_only ${feelists[list].replace(/ /g, '_')}\"\r\n                                             for=\"${feelists[list]}\" >${feelists[list]}</label>\r\n                                        </div>`\r\n                            }\r\n                        }\r\n\r\n\r\n                        swal.fire({\r\n                            width: 200,\r\n                            showConfirmButton: false,\r\n                            html: `\r\n                           <div class=\"row\">\r\n                           <div class=\"col-md-12\">\r\n                           <h4 class=\"smaller_h\" id=\"add_to\">add to</h4>\r\n                           <h4 class=\"smaller_h d-none bg_purple text-light\" id=\"no_feelist\">feelist ?</h4>\r\n                     \r\n                            </div>\r\n                                <ul class=\"list-group\">\r\n            \r\n                                       ${feelist_div}\r\n                                        \r\n                                        <!-- user can create new feelist-->\r\n                                        <div class=\"input-group mb-3\">\r\n                                            <div class=\"input-group-prepend\">\r\n                                                <div class=\"input-group-text bg-transparent border_bottom_only\">\r\n                                                    <input type=\"radio\" data-new_feelist=\"true\"\r\n                                                           name=\"feelist\" id=\"new\" data-feelist=\"\" >\r\n                                                </div>\r\n                                            </div>\r\n                                           <input type=\"text\" class=\"form-control border_bottom_only  form_label\" \r\n                                            id=\"new_feelist\" name=\"new_feelist\"    placeholder=\"create new\">\r\n                                        </div>\r\n            \r\n                                    \r\n                                </ul>\r\n                                <button class=\"gl_button gl_action save_feelist\" \r\n                                data-id=\"${post_id}\" data-action=${action}\r\n                                \r\n                                >save</button>\r\n                                <span id=\"feelist_saved\" class=\"text-center\" onclick=\"swal.close()\" ></span>\r\n                            </div>\r\n                            `\r\n                        })\r\n\r\n                    }\r\n\r\n                    /*USER COLOR FEEDBACK ON SELECTING FEELISTS*/\r\n                    $('#new').on('click', function () {\r\n                        $('.feelist').removeClass('bg_blue text-light')\r\n                        $('#new_feelist').addClass('border_purple')\r\n                        $('#no_feelist').addClass('d-none')\r\n                    })\r\n                    $('.feelist_check').on('click', function () {\r\n                        $('.feelist').removeClass('bg_blue text-light')\r\n                        $('#new_feelist').removeClass('border_purple')\r\n                        $('#no_feelist').addClass('d-none')\r\n                        $('.' + $(this).data('feelist')).addClass('bg_blue text-light')\r\n                    })\r\n                    /*BY CLICKING ON save BUTTON HE CAN SAVE ACTION TO HIS FEELIST*/\r\n                    $('.save_feelist').on('click', function () {\r\n                        perform_action($(this));\r\n\r\n                    })\r\n\r\n                    /*WHEN GLOBBER IS CREATING NEW FEELIST, WE ARE APPENDING NAME OF THE FEELIST TO data-feelist\r\n                    * ATTRIBUTE ON RADIO BUTTON SO THAT WE CAN RETRIEVE IT IN perform_action()\r\n                    * FUNCTION AND SAVE ACTION TO NEWLY CREATED FEELIST*/\r\n                    $('#new_feelist').on('input', function () {\r\n\r\n\r\n                        $('#new').data(\"feelist\", $(this).val())\r\n                    })\r\n                })\r\n\r\n                /*BY CLICKING ON HEARTH ICON TO LIKE OR FLAG ICON TO FLAG\r\n                * ACTION AS INAPPROPRIATE WE WILL UPDATE DB*/\r\n                $('.gl_action').on('click', function () {\r\n\r\n                    perform_action($(this));\r\n                })\r\n\r\n                /*USER CAN ADD ANOTHER USER INTO HIS GLOB TO SEE POSTS FROM THIS USER*/\r\n                $('.add_to_glob,.remove_from_glob').on('click', function () {\r\n                    var user_id = $(this).data('user_id')\r\n                    var user_name = $(this).data('user_name')\r\n                    var user_action = $(this).data('user_action')\r\n\r\n                    $.getJSON('/glob_action',\r\n                        {\r\n                            user_id: user_id,\r\n                            user_action: user_action\r\n                        },\r\n                        function (response) {\r\n\r\n                            if (response.text === 'success' && user_action === 'added_to_glob') {\r\n                                $('.added_to_glob' + user_id).addClass('d-none')\r\n                                $('.removed_from_glob' + user_id).removeClass('d-none')\r\n                                 Toast.fire({html: ` <img  src=\"assets/dist/images/happy.png\"/>\r\n                                                    <p class=\"text-success\">${user_name} was added !</h4> `})\r\n\r\n                            } else if (response.text === 'success' && user_action === 'removed_from_glob') {\r\n                                $('.added_to_glob' + user_id).removeClass('d-none')\r\n                                $('.removed_from_glob' + user_id).addClass('d-none')\r\n                                 Toast.fire({html: ` <img  src=\"assets/dist/images/sad.png\"/>\r\n                                                    <p class=\"text-danger\">${user_name} was removed !</h4> `})\r\n\r\n                            }\r\n\r\n                        })\r\n\r\n                })\r\n\r\n            });\r\n\r\n\r\n        return false;\r\n    });\r\n\r\n    /*SENDING AJAX REQUEST TO SERVER TO UPDATE USER AND GLOB'S ACTIONS*/\r\n    function perform_action($_this) {\r\n\r\n        var post_id = $_this.data('id')\r\n        var action = $_this.data('action')\r\n\r\n        var feelist_name = $(\"input[name='feelist']:checked\").data('feelist');\r\n        var new_feelist = $(\"input[name='feelist']:checked\").data('new_feelist');\r\n\r\n\r\n        /*WHEN USER ADDING ACTION TO HIS FEELIST AND HE DOESN'T SELECT ANY FEELIST\r\n        * OR HE CHECKS NEW FEELIST BUT DOESN'T TYPE IN NEW FEELIST NAME\r\n        * WE WILL NOT PROCEED , BUT NOTIFY HIM THAT HE NEEDS TO SELECT FEELIST*/\r\n        if (action === 'additions' && (feelist_name === undefined || feelist_name.length === 0)) {\r\n            $(\"#no_feelist\").removeClass('d-none')\r\n        }\r\n        /*ALL GOOD => FEELIST SELECTED*/\r\n        else {\r\n            /*CLOSING ALERT WITH USER'S FEELISTS*/\r\n            $('#feelist_saved').text('saved').addClass('gl_button')\r\n            $('.save_feelist').addClass('d-none')\r\n\r\n            /*AJAX REQUEST TO PERFORM THE ACTION*/\r\n            $.getJSON(\r\n                '/_actions',\r\n                {\r\n                    post_id: post_id,\r\n                    action: action,\r\n                    feelist_name: feelist_name,\r\n                    new_feelist: new_feelist\r\n\r\n                },\r\n                function (data) {\r\n\r\n                    /*IF USER IS NOT AUTHORIZED*/\r\n                    if (data.result === \"not_authorized\") {\r\n                        please_login()\r\n                    }\r\n                    /*IF USER ALREADY LIKED OR ADDED ACTION\r\n                    * WE WILL NOTIFY HIM*/\r\n                    else if (data.result === \"already_added\") {\r\n                        swal.fire({\r\n                            html: `\r\n                               \r\n                               \r\n                               <span class=\"smaller_h\">pssst.... you already ${action === 'likes'\r\n                                ? `liked` : `${action === 'flags' ? `flagged` : `added`}`\r\n                            } it ...;)</span>\r\n                                <hr class=\"bg_purple\">\r\n                                <button class=\"gl_button smaller_h bg_purple\" onclick=\"swal.close();\">ok</button>\r\n                            `,\r\n                            showConfirmButton: false\r\n                        })\r\n                    }\r\n                    /*ELSE WE WILL INCREASE THE NUMBER ON LIKES /ADDITIONS ON THE\r\n                    * PAGE, TO GIVE USER INSTANT FEEDBACK*/\r\n                    else {\r\n\r\n                        var action_el = $('#' + action + '_' + post_id)\r\n                        action_el.text(parseInt(action_el.text()) + 1)\r\n                            .addClass('blue bg-warning p-1')\r\n                            .prop('disabled', 'disabled')\r\n\r\n                        Toast.fire({html: ` <img  src=\"assets/dist/images/happy.png\"/>\r\n                                                    <p class=\"feelist_title\">${action === 'likes'\r\n                                ? `liked` : `${action === 'flags' ? `flagged` : `added`}`\r\n                            }!</h4> `})\r\n\r\n                    }\r\n\r\n                });\r\n        }\r\n\r\n\r\n    }\r\n\r\n    /*HELPER FUNCTION TO APPEND ACTIONS FOR EVERY GLOB(POST)\r\n    * WITH DATA ABOUT EVERY ACTION\r\n    * post_id => WHICH GLOB DOES ACTION BELONGS TO (ObjectId)\r\n    * action => WHICH ACTION IS IT (likes, feelist, flag)\r\n    *           SO THAT WE CAN TAKE APPROPRIATE ACTION*/\r\n    function actions(likes, additions, flags, post_id) {\r\n\r\n        return `       \r\n                            <i  data-id=\"${post_id}\"  data-action=\"likes\"\r\n                            class=\"fas fa-heart float-right ml-3 gl_action\" title=\"like it!\" >\r\n                            <span id=\"likes_${post_id}\" >&nbsp;${likes}</span> </i> \r\n          \r\n                            <i   data-id=\"${post_id}\"  data-action=\"additions\"\r\n                            class=\"fas fa-plus float-right ml-3 add_to_feelist\" title=\"add to your feelist!\">\r\n                            <span id=\"additions_${post_id}\" >&nbsp;${additions}</span>\r\n                            </i>\r\n                            <i  data-id=\"${post_id}\"  data-action=\"flags\"\r\n                            class=\"far fa-flag float-right ml-3 gl_action\" title=\"report as inappropriate\">\r\n                             <span id=\"flags_${post_id}\" >&nbsp;${flags}</span>\r\n                                    </i>\r\n                             <hr >\r\n                           `\r\n\r\n    }\r\n\r\n    function please_login() {\r\n        swal.fire({\r\n            html: `\r\n                                Please \r\n                                <a class=\"\" href=\"/sign_in\">Sign in </a>\r\n                                or\r\n                                <a class=\"\" href=\"/sign_up\">Sign up </a>\r\n                                to continue.\r\n                                <hr class=\"bg_blue\">\r\n                                <button class=\"gl_button smaller_h\" onclick=\"swal.close();\">ok</button>\r\n                            `,\r\n            showConfirmButton: false\r\n        })\r\n    }\r\n\r\n\r\n});\n\n//# sourceURL=webpack:///./gl_modules/posts/static/js/posts.js?");

/***/ }),

/***/ "./gl_modules/user/static/src/js/public_user.js":
/*!******************************************************!*\
  !*** ./gl_modules/user/static/src/js/public_user.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open 'C:\\\\Users\\\\Marcel Kolarcik\\\\code\\\\globtopus\\\\gl_modules\\\\user\\\\static\\\\src\\\\js\\\\public_user.js'\");\n\n//# sourceURL=webpack:///./gl_modules/user/static/src/js/public_user.js?");

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