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

/***/ "./gl_modules/authorize/static/src/js/form_check.js":
/*!**********************************************************!*\
  !*** ./gl_modules/authorize/static/src/js/form_check.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open 'C:\\\\Users\\\\Marcel Kolarcik\\\\code\\\\globtopus\\\\gl_modules\\\\authorize\\\\static\\\\src\\\\js\\\\form_check.js'\");\n\n//# sourceURL=webpack:///./gl_modules/authorize/static/src/js/form_check.js?");

/***/ }),

/***/ "./gl_modules/map/static/src/js/map_loader.js":
/*!****************************************************!*\
  !*** ./gl_modules/map/static/src/js/map_loader.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\r\n(function () {\r\n\r\n    var country_feels\r\n    var people\r\n    var paths = $('path')\r\n\r\n    $.ajax({\r\n        url: '/_world_feel',\r\n        // data: $('form').serialize(),\r\n        type: 'POST',\r\n        success: function (response) {\r\n\r\n\r\n            country_feels = response.feels\r\n            people = response.total_people\r\n\r\n            var fill = '#ffffff'\r\n            $.each(paths, function (key, value) {\r\n\r\n                $(this).data('people', people[$(this).attr('id')]);\r\n\r\n                var feel = country_feels[$(this).attr('id')]\r\n                var c_name = $(this).data('cn2') ? $(this).data('cn2'): $(this).data('cn')\r\n                var cc = $(this).attr('id')\r\n                $(this).data('feel', feel)\r\n\r\n                if (feel < 20) {\r\n                    $(this).attr('fill', \"#006400\")\r\n                     $('#r_20').append(chart_link (c_name,feel,cc))\r\n                }\r\n\r\n\r\n                else if (feel < 40) {\r\n                    $(this).attr('fill', '#20B2AA')\r\n                    $('#r_40').append(chart_link (c_name,feel))\r\n                }\r\n\r\n\r\n                else if (feel < 60) {\r\n                    $(this).attr('fill', '#66FF00')\r\n                     $('#r_60').append(chart_link (c_name,feel))\r\n                }\r\n\r\n\r\n                else if (feel < 80) {\r\n                    $(this).attr('fill', '#40E0D0')\r\n                     $('#r_80').append(chart_link (c_name,feel))\r\n                }\r\n\r\n\r\n                else if (feel <= 100) {\r\n                    $(this).attr('fill', '#FFFF00')\r\n                     $('#r_100').append(chart_link (c_name,feel))\r\n                }\r\n\r\n                else {\r\n                    $(this).attr('fill', '#eeeeee')\r\n\r\n                }\r\n\r\n                 $('#r_all').append(chart_link (c_name,feel))\r\n            });\r\n\r\n            $('#map').on('click', function () {\r\n                /*HIDE ANY PREVIOUSLY OPEN DIVS ( CHARTS, MAPS)*/\r\n                $('.landing_interaction').addClass('d-none')\r\n\r\n                var map_search = $('#map_search')\r\n                map_search.removeClass('d-none')\r\n\r\n                 if (screen.width < 768)  map_search.get(0).scrollIntoView(1,'slow')\r\n\r\n            })\r\n\r\n            var current_fill\r\n            $('path').on('mouseenter',\r\n                function () {\r\n\r\n                    $(this).attr('stroke', \"red\").attr('stroke-width', 2)\r\n                    $('#current').html(country_name($(this)))\r\n                })\r\n                .on('mouseleave',\r\n                    function () {\r\n                       $(this).attr('stroke', \"#177199\").attr('stroke-width', 0.25)\r\n\r\n\r\n                    }\r\n                ).on('click',\r\n                function () {\r\n                    $('#map_info').removeClass('d-flex align-content-around flex-wrap')\r\n                    $('#current_info').html(`\r\n                   \r\n                   <span class=\"blue\">country :</span> <br><span class=\"smaller_h text-wrap\"> ${country_name($(this))} </span><br>\r\n                \r\n                    <span class=\"blue\"> total globers : </span> <span class=\"smaller_h\"> \r\n                      ${new Intl.NumberFormat(navigator.language).format($(this).data('people'))} \r\n                     </span>\r\n                    <hr>\r\n                     <span class=\"smaller_h user_heart country d-flex justify-content-center align-items-center\"> \r\n                        ${new Intl.NumberFormat(navigator.language).format($(this).data('feel'))} </span>\r\n                      \r\n                        <hr>\r\n                         <a  href=\"/${$(this).attr('id')}\" id='${$(this).attr('id')}' class=\"gl_button green text-center p-3 text-wrap\" >\r\n                        <span class=\"smaller_h\">EXPLORE MORE</span>\r\n                       \r\n                        </a>\r\n                `)\r\n                });\r\n\r\n            function country_name(_this) {\r\n                if (_this.data('cn2')) return _this.data(\"cn2\")\r\n                else if (_this.data('cn')) return _this.data(\"cn\")\r\n            }\r\n\r\n            var MapControl = new SVGPanZoom(document.getElementById('world'), {\r\n                eventMagnet: null,\r\n                // zoom options\r\n                zoom: {\r\n                    factor: 0.25,\r\n                    minZoom: 1,\r\n                    maxZoom: 20,\r\n                    events: {\r\n                        mouseWheel: true,\r\n                        doubleClick: true,\r\n                        pinch: true\r\n                    },\r\n                    callback: function callback(multiplier) {\r\n                    }\r\n                },\r\n            });\r\n            $('.map_controls').on('click', function () {\r\n\r\n                var action = $(this).data('action')\r\n                if (action === 'zoomIn') MapControl.zoomIn()\r\n                if (action === 'zoomOut') MapControl.zoomOut()\r\n                if (action === 'panLeft') MapControl.panLeft()\r\n                if (action === 'panRight') MapControl.panRight()\r\n                if (action === 'panUp') MapControl.panUp()\r\n                if (action === 'panDown') MapControl.panDown()\r\n                if (action === 'reset') MapControl.reset() })\r\n\r\n\r\n\r\n        },\r\n        error: function (error) {\r\n            console.log('we could not load data');\r\n        }\r\n    });\r\n\r\n function chart_link (county,feel,cc){\r\n\r\n              return  `<span class=\"list-group-item no_padding\">\r\n                             <a id=\"${county}\" \r\n                             href=\"/${cc}\"\r\n                                data-chart_for=\"county\" \r\n                                data-num_of_days=\"10\" \r\n                                class=\"chart map_chart\" \r\n                                data-county_name=\"${county}\">\r\n                                ${parseFloat(feel) .toFixed(2) } - ${county.replace(/\\__/g, ' | ').replace(/\\_/g, ' ')}</a><br>\r\n\r\n                        </span>  `\r\n            }\r\n})()\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./gl_modules/map/static/src/js/map_loader.js?");

/***/ }),

/***/ "./gl_modules/shared/static/js/feel_meter.js":
/*!***************************************************!*\
  !*** ./gl_modules/shared/static/js/feel_meter.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*FUNCTIONALITY TO SHOW USER FEELINGS ON SLIDE RANGE\r\n* AND TO CHANGE TEXT ABOVE ACTIONS PART OF THE FORM\r\n* IF FEELINGS < 51 OR >= 51*/\r\n\r\n(function () {\r\n\r\n\r\n\r\n    $('#feeling').on('change', function () {\r\n\r\n        var feelings = this.value;\r\n\r\n        $('#feeling_holder').val(feelings);\r\n\r\n        if(feelings > 51){\r\n            $('#this_or_better').removeClass('d-none');\r\n            $('#better').addClass('d-none');\r\n        }\r\n        else{\r\n             $('#this_or_better').addClass('d-none');\r\n             $('#better').removeClass('d-none');\r\n        }\r\n    });\r\n})();\r\n\r\n\n\n//# sourceURL=webpack:///./gl_modules/shared/static/js/feel_meter.js?");

/***/ }),

/***/ "./gl_modules/shared/static/js/form_label.js":
/*!***************************************************!*\
  !*** ./gl_modules/shared/static/js/form_label.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\r\n    $('.form_label').on(('click','focus'), function () {\r\n\r\n        var element_id = $(this).attr('id')\r\n        var placeholder_text = $(this).prop('placeholder')\r\n        if($(this).data('label')) {\r\n            var div = element_id+'_label'\r\n        }\r\n        else\r\n        {\r\n            div = element_id\r\n        }\r\n\r\n\r\n        if (placeholder_text !== '' &&  $(\"label[for='\" + element_id + \"']\").text().length === 0) {\r\n\r\n            sessionStorage.setItem(element_id,placeholder_text)\r\n            $(this).prop('placeholder', '')\r\n            $('#' + div).before(` <label for=${element_id} ><small>${placeholder_text}</small></label>`)\r\n        }\r\n\r\n\r\n    }).on('input', function () {\r\n        var element_id = $(this).attr('id')\r\n\r\n        var input_field = $('#' + element_id)\r\n        var label = $(\"label[for='\" + element_id + \"']\")\r\n\r\n        if (input_field.val() === '') {\r\n            input_field.prop('placeholder', sessionStorage.getItem(element_id))\r\n            label.html('')\r\n        }\r\n        else if(input_field.val().length === 1)\r\n        {\r\n            label.html(`<small>${sessionStorage.getItem(element_id)}</small>`)\r\n        }\r\n\r\n\r\n    })\r\n})()\n\n//# sourceURL=webpack:///./gl_modules/shared/static/js/form_label.js?");

/***/ }),

/***/ 0:
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** multi ./gl_modules/authorize/static/src/js/form_check.js ./gl_modules/shared/static/js/feel_meter.js ./gl_modules/shared/static/js/form_label.js ./gl_modules/map/static/src/js/map_loader.js ***!
  \*****************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./gl_modules/authorize/static/src/js/form_check.js */\"./gl_modules/authorize/static/src/js/form_check.js\");\n__webpack_require__(/*! ./gl_modules/shared/static/js/feel_meter.js */\"./gl_modules/shared/static/js/feel_meter.js\");\n__webpack_require__(/*! ./gl_modules/shared/static/js/form_label.js */\"./gl_modules/shared/static/js/form_label.js\");\nmodule.exports = __webpack_require__(/*! ./gl_modules/map/static/src/js/map_loader.js */\"./gl_modules/map/static/src/js/map_loader.js\");\n\n\n//# sourceURL=webpack:///multi_./gl_modules/authorize/static/src/js/form_check.js_./gl_modules/shared/static/js/feel_meter.js_./gl_modules/shared/static/js/form_label.js_./gl_modules/map/static/src/js/map_loader.js?");

/***/ })

/******/ });