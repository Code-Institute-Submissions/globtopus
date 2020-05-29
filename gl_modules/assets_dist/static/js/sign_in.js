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

eval("/*FUNCTIONALITY TO SHOW USER FEELINGS ON SLIDE RANGE\n* AND TO CHANGE TEXT ABOVE ACTIONS PART OF THE FORM\n* IF FEELINGS < 51 OR >= 51*/\n $('#slider_result')\n                .css('background',\"url('assets/dist/images/happy.png')\")\n                .css('background-repeat', 'no-repeat')\nfunction feelometer () {\n\n\n\n    $('#feeling').on('change', function () {\n\n        var feelings = this.value;\n\n        $('#feeling_holder').val(feelings);\n\n        if(feelings > 50){\n            $('#this_or_better').removeClass('d-none');\n            $('#better').addClass('d-none');\n            $('#slider_result').html('')\n                .css('background',\"url('assets/dist/images/happy.png')\")\n                .css('background-repeat', 'no-repeat')\n\n\n        }\n        else{\n             $('#this_or_better').addClass('d-none');\n             $('#better').removeClass('d-none');\n             $('#slider_result').html('')\n                .css('background',\"url('assets/dist/images/sad.png')\")\n                .css('background-repeat', 'no-repeat')\n        }\n    })\n\n }\n feelometer ()\n/*assets/dist/images/avatars/${counter % 38}.png*/\n\n//# sourceURL=webpack:///./gl_modules/shared/static/js/feel_meter.js?");

/***/ }),

/***/ "./gl_modules/shared/static/js/form_label.js":
/*!***************************************************!*\
  !*** ./gl_modules/shared/static/js/form_label.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\n    $('.form_label').on(('click','focus'), function () {\n\n        var element_id = $(this).attr('id')\n        var placeholder_text = $(this).prop('placeholder')\n        if($(this).data('label')) {\n            var div = element_id+'_label'\n        }\n        else\n        {\n            div = element_id\n        }\n\n\n        if (placeholder_text !== '' &&  $(\"label[for='\" + element_id + \"']\").text().length === 0) {\n\n            sessionStorage.setItem(element_id,placeholder_text)\n            $(this).prop('placeholder', '')\n            $('#' + div).before(` <label for=${element_id} ><small>${placeholder_text}</small></label>`)\n        }\n\n\n    }).on('input', function () {\n        var element_id = $(this).attr('id')\n\n        var input_field = $('#' + element_id)\n        var label = $(\"label[for='\" + element_id + \"']\")\n\n        if (input_field.val() === '') {\n            input_field.prop('placeholder', sessionStorage.getItem(element_id))\n            label.html('')\n        }\n        else if(input_field.val().length === 1)\n        {\n            label.html(`<small>${sessionStorage.getItem(element_id)}</small>`)\n        }\n\n\n    })\n})()\n\n//# sourceURL=webpack:///./gl_modules/shared/static/js/form_label.js?");

/***/ }),

/***/ "./gl_modules/shared/static/js/site_intro.js":
/*!***************************************************!*\
  !*** ./gl_modules/shared/static/js/site_intro.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\r\n     var current_page = $('.current_page').data('current_page')\r\n\r\n\r\n    //localStorage.removeItem(current_page+'_intro')\r\n    if((localStorage.getItem(current_page+'_intro') !== 'done'\r\n        && window.location.pathname !== '/user')    && window.location.pathname !== '/sign_in' )\r\n    {\r\n        swal.fire({\r\n            html:`<img  src=\"/assets/dist/images/happy.png\"/>\r\n                    <h4>Hi there !</h4>\r\n                    <p>It looks like it is your first visit to this page We are very happy to have you! \r\n                    We hope that you will have a great experience using this site, and we prepared a little tour for you!\r\n                   </p>\r\n                   <hr>\r\n                   For the best user experience, we recommend these browsers : Google Chrome, Edge or Opera.\r\n                    <hr>\r\n                    <!--desktop-->\r\n                     <a class=\"btn feelist_title text-center text-light flash_success  p-3 d-none d-md-block\"\r\n                     href=\"javascript:void(0);\" onclick=\"javascript:introJs().start();swal.close();\">Take a tour</a>\r\n                     <!--mobile-->\r\n                      <a class=\"btn feelist_title text-center text-light flash_success  p-3 d-md-none\"\r\n                     href=\"javascript:void(0);\" onclick=user_nav();>Take a tour</a>\r\n                     \r\n                     \r\n                        `,\r\n                    showConfirmButton:false\r\n        })\r\n\r\n\r\n\r\n        localStorage.setItem(current_page+'_intro','done')\r\n\r\n    }\r\n})()\r\n\r\n\n\n//# sourceURL=webpack:///./gl_modules/shared/static/js/site_intro.js?");

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