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

/***/ "./gl_modules/shared/static/js/feel_meter.js":
/*!***************************************************!*\
  !*** ./gl_modules/shared/static/js/feel_meter.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*FUNCTIONALITY TO SHOW USER FEELINGS ON SLIDE RANGE\r\n* AND TO CHANGE TEXT ABOVE ACTIONS PART OF THE FORM\r\n* IF FEELINGS < 51 OR >= 51*/\r\n $('#slider_result')\r\n                .css('background',\"url('assets/dist/images/happy.png')\")\r\n                .css('background-repeat', 'no-repeat')\r\nfunction feelometer () {\r\n\r\n\r\n\r\n    $('#feeling').on('change', function () {\r\n\r\n        var feelings = this.value;\r\n\r\n        $('#feeling_holder').val(feelings);\r\n\r\n        if(feelings > 50){\r\n            $('#this_or_better').removeClass('d-none');\r\n            $('#better').addClass('d-none');\r\n            $('#slider_result').html('')\r\n                .css('background',\"url('assets/dist/images/happy.png')\")\r\n                .css('background-repeat', 'no-repeat')\r\n\r\n\r\n        }\r\n        else{\r\n             $('#this_or_better').addClass('d-none');\r\n             $('#better').removeClass('d-none');\r\n             $('#slider_result').html('')\r\n                .css('background',\"url('assets/dist/images/sad.png')\")\r\n                .css('background-repeat', 'no-repeat')\r\n        }\r\n    })\r\n\r\n }\r\n feelometer ()\r\n/*assets/dist/images/avatars/${counter % 38}.png*/\n\n//# sourceURL=webpack:///./gl_modules/shared/static/js/feel_meter.js?");

/***/ }),

/***/ "./gl_modules/shared/static/js/form_label.js":
/*!***************************************************!*\
  !*** ./gl_modules/shared/static/js/form_label.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*FUNCTION TO ADD LABEL TO FORM\n* ONCE FORM FIELD HAS FOCUS\n*\n* LABEL WILL BE SAME AS PLACEHOLDER TEXT*/\n\n(function () {\n    $('.form_label').on(('click','focus'), function () {\n\n        var element_id = $(this).attr('id')\n        var placeholder_text = $(this).prop('placeholder')\n        if($(this).data('label')) {\n            var div = element_id+'_label'\n        }\n        else\n        {\n            div = element_id\n        }\n\n\n        if (placeholder_text !== '' &&  $(\"label[for='\" + element_id + \"']\").text().length === 0) {\n\n            sessionStorage.setItem(element_id,placeholder_text)\n            $(this).prop('placeholder', '')\n            $('#' + div).before(` <label for=${element_id} ><small>${placeholder_text}</small></label>`)\n        }\n\n\n    }).on('input', function () {\n        var element_id = $(this).attr('id')\n\n        var input_field = $('#' + element_id)\n        var label = $(\"label[for='\" + element_id + \"']\")\n\n        if (input_field.val() === '') {\n            input_field.prop('placeholder', sessionStorage.getItem(element_id))\n            label.html('')\n        }\n        else if(input_field.val().length === 1)\n        {\n            label.html(`<small>${sessionStorage.getItem(element_id)}</small>`)\n        }\n\n\n    })\n})()\n\n//# sourceURL=webpack:///./gl_modules/shared/static/js/form_label.js?");

/***/ }),

/***/ "./gl_modules/shared/static/js/site_intro.js":
/*!***************************************************!*\
  !*** ./gl_modules/shared/static/js/site_intro.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*SITE INTRO\r\n*\r\n* WHEN USER IS VISITING PAGE FOR THE FIRST TIME, WE WILL WELCOME HIM AND OFFER TOUR OF THE PAGE\r\n* AND SET   sessionStorage VARIABLE OF THE PAGE AS DONE, SO WE WONT\r\n* FIRE POPUP AGAIN, USER HAS OPTION OF SEEING TOUR BY CLICKING ON THE TAKE TOUR BUTTON NEXT TO THE LOGO\r\n*\r\n* PAGES ARE landing.html, country.html, user.html, public_user.html, sign_up.html,tests.html*/\r\n\r\n(function () {\r\n     var current_page = $('.current_page').data('current_page')\r\n\r\n    //localStorage.removeItem(current_page+'_intro')\r\n\r\n    if((localStorage.getItem(current_page+'_intro') !== 'done'\r\n        && window.location.pathname !== '/user')    && window.location.pathname !== '/sign_in' )\r\n    {\r\n        swal.fire({\r\n            html:`<img  src=\"/assets/dist/images/happy.png\"/>\r\n                    <h4>Hi there !</h4>\r\n                    <p>It looks like it is your first visit to ${current_page} page. We are very happy to have you! </p>\r\n                    <p>Globtopus was created for you to feel better or to share your experience on how to feel better!</p>\r\n                   \r\n                  \r\n                   For the best user experience, we recommend these browsers : Google Chrome, Edge or Opera.\r\n                    <hr>\r\n                    <!--desktop-->\r\n                     <a class=\"btn feelist_title text-center text-light flash_success  p-3 m-3 d-none d-md-block\"\r\n                     href=\"javascript:void(0);\" onclick=\"javascript:introJs().start();swal.close();\">Take a tour</a>\r\n                     <!--mobile showing post from for intro, because on mobile devices it is hidden-->\r\n                      <a class=\"btn feelist_title text-center text-light flash_success p-3 m-3  p-3 d-md-none\"\r\n                     href=\"javascript:void(0);\" onclick=introJs().start();swal.close();$('.feel_form').removeClass('d-none')>Take a tour</a>\r\n                     \r\n                     <a href=\"#\" class=\"btn feelist_title text-center text-light flash_error p-3\" onclick=\"swal.close();\">Skip tour</a>\r\n                        `,\r\n                    showConfirmButton:false\r\n        })\r\n\r\n\r\n\r\n        localStorage.setItem(current_page+'_intro','done')\r\n\r\n    }\r\n})()\r\n\r\n\n\n//# sourceURL=webpack:///./gl_modules/shared/static/js/site_intro.js?");

/***/ }),

/***/ 0:
/*!*************************************************************************************************************************************************!*\
  !*** multi ./gl_modules/shared/static/js/feel_meter.js ./gl_modules/shared/static/js/form_label.js ./gl_modules/shared/static/js/site_intro.js ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./gl_modules/shared/static/js/feel_meter.js */\"./gl_modules/shared/static/js/feel_meter.js\");\n__webpack_require__(/*! ./gl_modules/shared/static/js/form_label.js */\"./gl_modules/shared/static/js/form_label.js\");\nmodule.exports = __webpack_require__(/*! ./gl_modules/shared/static/js/site_intro.js */\"./gl_modules/shared/static/js/site_intro.js\");\n\n\n//# sourceURL=webpack:///multi_./gl_modules/shared/static/js/feel_meter.js_./gl_modules/shared/static/js/form_label.js_./gl_modules/shared/static/js/site_intro.js?");

/***/ })

/******/ });