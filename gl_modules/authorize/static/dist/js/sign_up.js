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

/***/ "./gl_modules/authorize/static/src/js/get_location.js":
/*!************************************************************!*\
  !*** ./gl_modules/authorize/static/src/js/get_location.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*GETTING LOCATION DETAILS ON sign_up.html\r\n *\r\n * USING nominatim.openstreetmap.org/reverse API\r\n *\r\n * */\r\n\r\n\r\n(function () {\r\n\r\n    /*INITIAL COORDINATES OF THE MAP WITH ZOOM 1 */\r\n    var mymap = L.map('map_sign_up').setView([23.757195, -17.226563], 1);\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        maxZoom: 9,\r\n        attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, ' +\r\n            '<a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, ' +\r\n            'Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',\r\n        id: 'mapbox/streets-v11'\r\n    }).addTo(mymap);\r\n\r\n    var popup = L.popup({\r\n        /*CUSTOM CLASS FOR POPUP*/\r\n        className: 'popup_class'\r\n\r\n    });\r\n\r\n    mymap.on('click', getCoordinates);\r\n\r\n//WHEN USER CLICKS ON THE MAP WHEN SELECTING THE LOCATION\r\n// POPUP WILL SHOW WITH COORDINATES AND get_address BUTTON*/\r\n\r\n    function getCoordinates(e) {\r\n\r\n\r\n        var coordinates = e.latlng.toString()\r\n            .replace('LatLng(', '')\r\n            .replace(')', '')\r\n            .replace(' ', '')\r\n            .split(',');\r\n\r\n        popup\r\n            .setLatLng(e.latlng)\r\n            .setContent(` <i class = \"fas fa-map-marker-alt\" >  ${coordinates[0]} , ${coordinates[1]}\r\n\t\t\t\t\t              <br><button type=\"submit\" id=\"get_address\"\r\n\t\t\t\t\t\t\t\t\t\tclass=\"bg-warning  btn btn-sm p-0 float-right ___\"\r\n\t\t\t\t\t\t\t\t\t\tdata-title=\"click to get location details\"\r\n\t\t\t\t\t\t\t\t\t\tdata-text=\"get details\"\r\n\t\t\t\t\t\t\t\t\t\tdata-cy=\"get_details\">get details</button>`)\r\n            .openOn(mymap);\r\n\r\n\r\n        /*USING nominatim API FROM openstreetmap TO DO REVERSE SEARCH AND\r\n         *WHEN USER CLICKS ON get details WE'LL\r\n         * TAKE THE this.responseText AND TAKE address   FROM IT\r\n         * TO DISPLAY LOCATION DETAILS TO OWNER WITH\r\n         * render_location_details() FUNCTION*/\r\n\r\n        var url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates[0]}&lon=${coordinates[1]}`;\r\n\r\n        $('#get_address').removeClass('d-none').on('click', function () {\r\n\r\n            getAddress(url, coordinates);\r\n\r\n            // swal.fire ( {\r\n            // \t            html              : `<img src=\"assets/src/images/loader.gif\" alt=\"loader\">`,\r\n            // \t            showConfirmButton : false,\r\n            // \t            position          : 'top',\r\n            // \t            width             : 100\r\n            //             } );\r\n\r\n\r\n//\t\t\t\tTO PREVENT PAGE FROM RELOADING AND CLEARING LOCATION DETAILS FROM THE FORM\r\n\r\n\t\t\t\t\t/*ON MOBILE DEVICES USER WOULDN'T SEE ADDRESS DIV , WHERE HE NEEDS TO INPUT PROPERTY NAME\r\n\t\t\t\t\t * SO TO MAKE IT EASIER WE WILL SCROLL TO THAT DIV*/\r\n\t\t\t\t\t$ ( '#location_n' ).get ( 0 ).scrollIntoView ();\r\n            return false;\r\n\r\n        });\r\n\r\n\r\n    }\r\n\r\n\r\n    /*GETTING ADDRESS DETAILS FORM nominatim.openstreetmap.org/reverse API */\r\n    function getAddress(url) {\r\n\r\n\r\n        var xhr = new XMLHttpRequest();\r\n\r\n        xhr.onreadystatechange = function () {\r\n            if (this.readyState === 4 && this.status === 200) {\r\n\r\n\r\n                /*TO HIDE get_address, BECAUSE USER ALREADY GOT DETAILS FORM API\r\n                 * TO PREVENT MULTIPLE CLICKS FOR THE SAME LOCATION\r\n                 *\r\n                 * THERE IS ALSO LIMIT OF MAX 1 REQUEST PER SECOND FROM\r\n                 * nominatim.openstreetmap.org/reverse API AT THE MOMENT*/\r\n                $('#get_address').addClass('d-none');\r\n\r\n                var address_data = JSON.parse(this.responseText).address;\r\n\r\n                render_location_details(address_data);\r\n\r\n                /*CLOSING LOADER GIF ALERT*/\r\n                swal.close();\r\n            }\r\n\r\n        };\r\n\r\n        xhr.open(\"GET\", url);\r\n        xhr.send();\r\n\r\n        /*THERE IS ERR_CONNECTION_TIMED_OUT HAPPENING SOMETIMES,\r\n         * SO WE WILL NOTIFY USER TO TRY AGAIN LATER */\r\n        xhr.onerror = function () {\r\n            swal.fire({\r\n                html: `<h4>Server error!</h4>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<hr class=\"bg-danger\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<code>net::ERR_CONNECTION_TIMED_OUT</code>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<hr class=\"bg-danger\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>Please try again later!</p>`,\r\n                showConfirmButton: true,\r\n                confirmButtonColor: '#0fbeba',\r\n\r\n                confirmButtonText: `<i class=\"fas fa-check-circle\"></i>`\r\n            });\r\n        };\r\n\r\n    }\r\n\r\n})();\r\n\r\n\r\n/*APPENDING ADDRESS DETAILS TO THE FORM\r\n * WE MAKE COUNTRY, COUNTY OR STATE*/\r\nfunction render_location_details(address_data) {\r\n\r\n   /*if user selects part of the map without location data ( sea , mountain range ...)\r\n   * we will inform him to try again and add text-danger to bring his attention to it*/\r\n    if (address_data === undefined) {\r\n        $('#location_n').text('Please try again!Could not get your location.').addClass('text-danger')\r\n    } else {\r\n        $('#country').val(address_data['country'])\r\n\r\n        /*in data coming in from nominatim there could be state or county missing, but always at least one\r\n        * of them so we need to check for it and display one of them in order : first state, then\r\n        * available county*/\r\n        var county = address_data ['state'] !== undefined ? address_data ['state'] :\r\n            address_data ['county'] !== undefined ?  address_data ['county'] : \"\";\r\n\r\n        $('#county').val(county)\r\n        $('#country_code').val(address_data['country_code'])\r\n\r\n        $('#location_n').text(address_data['country'] + ' - ' +   county)\r\n            .removeClass('text-danger')\r\n    }\r\n\r\n\r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./gl_modules/authorize/static/src/js/get_location.js?");

/***/ }),

/***/ "./gl_modules/shared/static/js/feelometer.js":
/*!***************************************************!*\
  !*** ./gl_modules/shared/static/js/feelometer.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*FUNCTIONALITY TO SHOW USER FEELINGS ON SLIDE RANGE\r\n* AND TO CHANGE TEXT ABOVE ACTIONS PART OF THE FORM\r\n* IF FEELINGS < 51 OR >= 51*/\r\n\r\n(function () {\r\n\r\n\r\n\r\n    $('#feeling').on('change', function () {\r\n\r\n        var feelings = this.value;\r\n\r\n        $('#feeling_holder').val(feelings);\r\n\r\n        if(feelings > 51){\r\n            $('#this_or_better').removeClass('d-none');\r\n            $('#better').addClass('d-none');\r\n        }\r\n        else{\r\n             $('#this_or_better').addClass('d-none');\r\n             $('#better').removeClass('d-none');\r\n        }\r\n    });\r\n})();\r\n\r\n\n\n//# sourceURL=webpack:///./gl_modules/shared/static/js/feelometer.js?");

/***/ }),

/***/ "./gl_modules/shared/static/js/form.js":
/*!*********************************************!*\
  !*** ./gl_modules/shared/static/js/form.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\r\n    $('.form_label').on(('click','focus'), function () {\r\n\r\n        var element_id = $(this).attr('id')\r\n        var placeholder_text = $(this).prop('placeholder')\r\n        if($(this).data('label')) {\r\n            var div = element_id+'_label'\r\n        }\r\n        else\r\n        {\r\n            div = element_id\r\n        }\r\n\r\n\r\n        if (placeholder_text !== '' &&  $(\"label[for='\" + element_id + \"']\").text().length === 0) {\r\n\r\n            sessionStorage.setItem(element_id,placeholder_text)\r\n            $(this).prop('placeholder', '')\r\n            $('#' + div).before(` <label for=${element_id} ><small>${placeholder_text}</small></label>`)\r\n        }\r\n\r\n\r\n    }).on('input', function () {\r\n        var element_id = $(this).attr('id')\r\n\r\n        var input_field = $('#' + element_id)\r\n        var label = $(\"label[for='\" + element_id + \"']\")\r\n\r\n        if (input_field.val() === '') {\r\n            input_field.prop('placeholder', sessionStorage.getItem(element_id))\r\n            label.html('')\r\n        }\r\n        else if(input_field.val().length === 1)\r\n        {\r\n            label.html(`<small>${sessionStorage.getItem(element_id)}</small>`)\r\n        }\r\n\r\n\r\n    })\r\n})()\n\n//# sourceURL=webpack:///./gl_modules/shared/static/js/form.js?");

/***/ }),

/***/ 0:
/*!****************************************************************************************************************************************************!*\
  !*** multi ./gl_modules/authorize/static/src/js/get_location.js ./gl_modules/shared/static/js/feelometer.js ./gl_modules/shared/static/js/form.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./gl_modules/authorize/static/src/js/get_location.js */\"./gl_modules/authorize/static/src/js/get_location.js\");\n__webpack_require__(/*! ./gl_modules/shared/static/js/feelometer.js */\"./gl_modules/shared/static/js/feelometer.js\");\nmodule.exports = __webpack_require__(/*! ./gl_modules/shared/static/js/form.js */\"./gl_modules/shared/static/js/form.js\");\n\n\n//# sourceURL=webpack:///multi_./gl_modules/authorize/static/src/js/get_location.js_./gl_modules/shared/static/js/feelometer.js_./gl_modules/shared/static/js/form.js?");

/***/ })

/******/ });