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

/***/ "./static/src/js/index/feelist.js":
/*!****************************************!*\
  !*** ./static/src/js/index/feelist.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\r\n    $('#feelist').on('click', function () {\r\n        $('#feelist_search').toggleClass('d-none')\r\n\r\n        $('#feelist_search').get(0).scrollIntoView();\r\n\r\n    })\r\n\r\n\r\n})()\r\n\r\n\r\n$(function () {\r\n\r\n    var liked_actions = []\r\n    $('#get_results').on('click', function () {\r\n\r\n\r\n        $.getJSON('/_search', {\r\n            q: $('input[name=\"search\"]').val(),\r\n\r\n        }, function (data) {\r\n            var search_results = data.result\r\n            var results = $(\"#results\").html('')\r\n\r\n\r\n            if(search_results.length == 0)\r\n            {\r\n                results.append(` \r\n                <h4 class=\"smaller_h\"> There are no actions for how you feeling now :\r\n                    <span class=\"blue\">${$('input[name=\"search\"]').val()}</span>  \r\n                    \r\n                    </h4>`)\r\n            }\r\n            else\r\n            {\r\n                 $.each(search_results, function (key, value) {\r\n\r\n\r\n                results.append(`\r\n\r\n                    <div class=\"row mb-2 border_blue pt-2\">\r\n                     \r\n                        <div class=\"col-md-8\">\r\n\r\n                          ${value.action_1 !== '' ?\r\n                    `<span class=\"smaller_h\">1.</span>`\r\n                    + value.action_1\r\n                    + actions(value.action_1_likes,value.action_1_likes, 1, value.id) : ''}\r\n                             \r\n                            \r\n                          \r\n                          ${value.action_2 !== '' ?\r\n                    `<span class=\"smaller_h\">2.</span>`\r\n                    + value.action_2\r\n                    + actions(value.action_2_likes,value.action_2_feelist, 2, value.id) : ''}\r\n                              \r\n                         ${value.action_3 !== '' ?\r\n                    `<span class=\"smaller_h\">3.</span>`\r\n                    + value.action_3\r\n                    + actions(value.action_3_likes,value.action_3_likes, 3, value.id) : ''}\r\n                         \r\n                           \r\n\r\n                        </div>\r\n\r\n                        <div class=\"col-md-4 border_blue\">\r\n                             ${value.user_name}  ${value.user_feel}  ${value.id}\r\n                              <hr class=\"p-0 m-1\">\r\n                              <span class=\"float-left\">I feel :</span>  <br>   <span class=\" smaller_h  text-info\">${value.feelings}  </span>\r\n                               <hr class=\"p-0 m-1\">\r\n                               <span>because :</span><br>\r\n                                ${value.because}\r\n\r\n                        </div>\r\n                        \r\n                    </div>\r\n\r\n\r\n                `)\r\n\r\n            })\r\n            }\r\n\r\n\r\n\r\n            $(function () {\r\n                $('.gl_action').on('click', function () {\r\n\r\n                    var glob_id = $(this).attr('id')\r\n                    var action_num = $(this).data('action_num')\r\n                    var action = $(this).data('action')\r\n\r\n\r\n                    $.getJSON('/_actions', {\r\n                        glob_id: glob_id,\r\n                        action_num: action_num,\r\n                        action: action\r\n\r\n                    }, function (data) {\r\n                        /*if user already likes the action we will\r\n                        * show feedback that he already liked it*/\r\n\r\n                        if (data.result === 0) {\r\n                            swal.fire('you already ' + action + ' it')\r\n                        } else {\r\n\r\n                            var action_el = $('#'+action+'_' + data.result + '_' + action_num)\r\n\r\n\r\n                            /*user can only like the action once*/\r\n                            if (liked_actions.indexOf(action+'_'+ data.result + '_' + action_num) === -1) {\r\n                                /*update count of likes on the screen for user to see*/\r\n                                action_el.text(parseInt(action_el.text()) + 1).addClass('blue')\r\n\r\n                                liked_actions.push(action+'_' +data.result + '_' + action_num)\r\n                            }\r\n\r\n\r\n                        }\r\n\r\n                    });\r\n                })\r\n            });\r\n\r\n            $('#feelist_search').get(0).scrollIntoView();\r\n        });\r\n\r\n        return false;\r\n    });\r\n\r\n    function actions(likes,feelist, action_num, id) {\r\n\r\n        return `       \r\n                            <i  id=\"${id}\" data-action_num=\"${action_num}\" data-action=\"likes\"\r\n                            class=\"fas fa-heart float-right ml-3 gl_action\" title=\"like it!\" >\r\n                            <span id=\"likes_${id}_${action_num}\" >&nbsp;${likes}</span> </i> \r\n          \r\n                            <i   id=\"${id}\"  data-action_num=\"${action_num}\" data-action=\"feelist\"\r\n                            class=\"fas fa-plus float-right ml-3 gl_action\" title=\"add to your feelist!\">\r\n                            <span id=\"feelist_${id}_${action_num}\" >&nbsp;${feelist}</span>\r\n                            </i>\r\n                            <i  id=\"${id}\" data-action_num=\"${action_num}\" data-action=\"flag\"\r\n                            class=\"far fa-flag float-right ml-3 gl_action\" title=\"report as inappropriate\"></i>\r\n                             <hr >\r\n                           `\r\n\r\n    }\r\n\r\n\r\n});\r\n\r\n\n\n//# sourceURL=webpack:///./static/src/js/index/feelist.js?");

/***/ }),

/***/ "./static/src/js/index/index.js":
/*!**************************************!*\
  !*** ./static/src/js/index/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*FUNCTIONALITY TO SHOW USER FEELINGS ON SLIDE RANGE\r\n* AND TO CHANGE TEXT ABOVE ACTIONS PART OF THE FORM\r\n* IF FEELINGS < 51 OR >= 51*/\r\n\r\n(function () {\r\n\r\n\r\n\r\n    $('#feeling').on('change', function () {\r\n\r\n        var feelings = this.value;\r\n\r\n        $('#feeling_holder').val(feelings);\r\n\r\n        if(feelings > 51){\r\n            $('#this_or_better').removeClass('d-none');\r\n            $('#better').addClass('d-none');\r\n        }\r\n        else{\r\n             $('#this_or_better').addClass('d-none');\r\n             $('#better').removeClass('d-none');\r\n        }\r\n    });\r\n})();\r\n\r\n\n\n//# sourceURL=webpack:///./static/src/js/index/index.js?");

/***/ }),

/***/ "./static/src/js/shared/form.js":
/*!**************************************!*\
  !*** ./static/src/js/shared/form.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\r\n    $('.form_label').on(('click','focus'), function () {\r\n\r\n        var element_id = $(this).attr('id')\r\n        var placeholder_text = $(this).prop('placeholder')\r\n        if($(this).data('label')) {\r\n            var div = element_id+'_label'\r\n        }\r\n        else\r\n        {\r\n            div = element_id\r\n        }\r\n\r\n\r\n        if (placeholder_text !== '' &&  $(\"label[for='\" + element_id + \"']\").text().length === 0) {\r\n\r\n            sessionStorage.setItem(element_id,placeholder_text)\r\n            $(this).prop('placeholder', '')\r\n            $('#' + div).before(` <label for=${element_id} ><small>${placeholder_text}</small></label>`)\r\n        }\r\n\r\n\r\n    }).on('input', function () {\r\n        var element_id = $(this).attr('id')\r\n\r\n        var input_field = $('#' + element_id)\r\n        var label = $(\"label[for='\" + element_id + \"']\")\r\n\r\n        if (input_field.val() === '') {\r\n            input_field.prop('placeholder', sessionStorage.getItem(element_id))\r\n            label.html('')\r\n        }\r\n        else if(input_field.val().length === 1)\r\n        {\r\n            label.html(`<small>${sessionStorage.getItem(element_id)}</small>`)\r\n        }\r\n\r\n\r\n    })\r\n})()\n\n//# sourceURL=webpack:///./static/src/js/shared/form.js?");

/***/ }),

/***/ 0:
/*!************************************************************************************************************!*\
  !*** multi ./static/src/js/index/index.js ./static/src/js/index/feelist.js ./static/src/js/shared/form.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./static/src/js/index/index.js */\"./static/src/js/index/index.js\");\n__webpack_require__(/*! ./static/src/js/index/feelist.js */\"./static/src/js/index/feelist.js\");\nmodule.exports = __webpack_require__(/*! ./static/src/js/shared/form.js */\"./static/src/js/shared/form.js\");\n\n\n//# sourceURL=webpack:///multi_./static/src/js/index/index.js_./static/src/js/index/feelist.js_./static/src/js/shared/form.js?");

/***/ })

/******/ });