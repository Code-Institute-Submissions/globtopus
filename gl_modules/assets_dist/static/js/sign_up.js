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

eval("\n\n\n(function () {\n/*scrolling into the view on mobile devices when user clicks on form fields of country or county\n* when signing-up we will scroll map into the view*/\n$('#country_name,#county_name').on('click', function () {\n if (screen.width < 768 && $('#country_name').val() === '' && $('#county_name').val() === '') {\n     $('#svg_map').get(0).scrollIntoView(1, 'slow')\n }\n})\n\n    /*IF USER DIDN'T SELECT COUNTRY OR COUNTY WE WILL ALERT HIM ABOUT IT\n    * AND WON'T PROCEED WITH SIGN-UP*/\n$('#sign_up').on('click', function (e) {\n    console.log('country',$('#country_name').html(), 'county', $('#county_name').val())\n    if ($('#country_name').val() === '')\n    {\n        e.preventDefault()\n        swal.fire({\n            html:form_message('country'),\n            showConfirmButton:false\n        })\n    }\n  else  if ($('#county_name').val() === '')\n    {\n        e.preventDefault()\n        swal.fire({\n            html:form_message('county'),\n            showConfirmButton:false\n        })\n    }\n\n    function form_message(location){\n        return `<p class=\"border_blue_l text-danger p-2\">Please select ${location} by clicking on the map, or by selecting ${location}, by clicking\n                    on list icon <br> <span><i class=\"fas fa-list\"></i></span><br> and selecting ${location} from the list!</p>\n                        <hr>\n                    <span class=\" gl_button\" onclick=\"swal.close()\">OK</span>`\n    }\n})\n})();\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./gl_modules/authorize/static/src/js/form_check.js?");

/***/ }),

/***/ "./gl_modules/map/static/src/js/map_loader.js":
/*!****************************************************!*\
  !*** ./gl_modules/map/static/src/js/map_loader.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\r\n\r\n\r\n        var country_feels\r\n        var people\r\n        var paths = $('path')\r\n        var svg_map = 'world'\r\n       var countries=[]\r\n        var counter = 0\r\n        /*IF WE ARE ON LANDING PAGE, WE WILL LOAD FEELINGS DATA INTO\r\n        * #THE MAP , AND APPLY DIFFERENT COLOR TO COUNTRIES,\r\n        * ACCORDING TO THEIR FEELING RATING. OTHERWISE, WE ARE ON SIGN UP PAGE AND WE DON'T NEED\r\n        * COLORFUL MAP*/\r\n        if (window.location.pathname === '/') {\r\n            $.ajax({\r\n                url: '/_world_feel',\r\n                // data: $('form').serialize(),\r\n                type: 'POST',\r\n                success: function (response) {\r\n\r\n\r\n                    country_feels = response.feels\r\n                    people = response.total_people\r\n\r\n\r\n                    $.each(paths, function (key, value) {\r\n\r\n                        $(this).data('people', people[$(this).attr('id')]);\r\n\r\n                        var feel = country_feels[$(this).attr('id')]\r\n                        var c_name = $(this).data('cn2') ? $(this).data('cn2') : $(this).data('cn')\r\n                        var cc = $(this).attr('id')\r\n                        if(countries.indexOf($(this).data('cn')) !== -1) doubles.push($(this).data('cn'))\r\n\r\n                        countries[\"'\"+cc+\"'\"  ]= c_name+\",\"\r\n\r\n\r\n                        $(this).data('feel', feel)\r\n\r\n                        if (feel < 20) {\r\n                            $(this).attr('fill', \"#006400\")\r\n                            $('#r_20').append(select_location_link(c_name, feel, cc))\r\n                        } else if (feel < 40) {\r\n                            $(this).attr('fill', '#20B2AA')\r\n                            $('#r_40').append(select_location_link(c_name, feel, cc))\r\n                        } else if (feel < 60) {\r\n                            $(this).attr('fill', '#66FF00')\r\n                            $('#r_60').append(select_location_link(c_name, feel, cc))\r\n                        } else if (feel < 80) {\r\n                            $(this).attr('fill', '#40E0D0')\r\n                            $('#r_80').append(select_location_link(c_name, feel, cc))\r\n                        } else if (feel <= 100) {\r\n                            $(this).attr('fill', '#FFFF00')\r\n                            $('#r_100').append(select_location_link(c_name, feel, cc))\r\n                        } else {\r\n                            $(this).attr('fill', '#eeeeee')\r\n\r\n                        }\r\n\r\n                        $('#r_all').append(select_location_link(c_name, feel, cc))\r\n                    });\r\n\r\n\r\n                },\r\n                error: function (error) {\r\n                    console.log('we could not load data');\r\n                }\r\n            });\r\n        }\r\n\r\n        /*SIGN UP PAGE...*/\r\n        else {\r\n            $.each(paths, function (key, value) {\r\n\r\n\r\n                var c_name = $(this).data('cn2') ? $(this).data('cn2') : $(this).data('cn')\r\n                var cc = $(this).attr('id')\r\n\r\n                $(this).attr('class', 'select_location')\r\n                $(this).data('level', 'country')\r\n                $(this).data('location', c_name)\r\n                $(this).data('cc', $(this).attr('id'))\r\n\r\n                $('#r_all').append(select_location_link(c_name, 'sign_up', cc, 'country'))\r\n            });\r\n        }\r\n\r\n\r\n        /*MAP HOVER INTERACTIVITY*/\r\n        map_interactivity()\r\n\r\n\r\n\r\n        /*CLICKING ON COLORFUL LEGEND TO GET LOCATIONS IN RANGE*/\r\n        $('.map_color_legend,.show_list').on('click', function () {\r\n\r\n            /*POPUP WITH COUNTIES/ STATES*/\r\n            show_list($(this))\r\n            /*LINKS IN POPUP ARE NOT IN THE DOM YET WHEN WE ARE LOADING PAGE,\r\n            * SO WE NEED TO ATTACH CLICK LISTENER AFTER THEY ARE IN THE DOM*/\r\n            $('.select_location').on('click', function () {\r\n\r\n                select_location($(this))\r\n            })\r\n\r\n        })\r\n\r\n        /*LINKS IN THE MAP ARE IN THE DOM WHEN WE ARE LOADING PAGE*/\r\n        $('.select_location').on('click', function () {\r\n\r\n            select_location($(this))\r\n        })\r\n\r\n        /*LINK TO APPEND TO LOCATION LIST POPUP*/\r\n        function select_location_link(c_name, feel, cc, level = null) {\r\n\r\n            /*IF WE ARE ON SIGN UP PAGE, WE NEED TO ADD LOCATION NAME TO INPUT FIELD*/\r\n            if (feel === 'sign_up') {\r\n                return `<span class=\"list-group-item no_padding\"  >\r\n                             <a \r\n                             href=\"#\"\r\n                                title=\"click to select\"\r\n                                class=\"locations_list select_location\" \r\n                                data-cc=\"${cc}\"\r\n                               \r\n                                data-location=\"${c_name}\"\r\n                                data-level=\"${level}\">\r\n                                \r\n                               \r\n                                 ${display_name(c_name)}</a><br>\r\n\r\n                        </span>  `\r\n            }\r\n            /*IF WE ARE ON LANDING PAGE, WE WILL REDIRECT TO SELECTED\r\n            * COUNTRY PAGE*/\r\n            else {\r\n                return `<span class=\"list-group-item no_padding\">\r\n                             <a \r\n                             href=\"/${cc}\"\r\n                               title=\"click to visit\"\r\n                                class=\"locations_list\" \r\n                                data-country_name=\"${c_name}\">\r\n                                \r\n                                ${parseFloat(feel).toFixed(2)} \r\n                                - ${display_name(c_name)}</a><br>\r\n\r\n                        </span>  `\r\n            }\r\n\r\n        }\r\n\r\n        /*WHEN USER CLICKS ON MAP */\r\n        function select_location($_this) {\r\n            /*COUNTRY CODE*/\r\n            var cc = $_this.data('cc')\r\n\r\n            /*LEVEL country, county*/\r\n            var level = $_this.data('level')\r\n\r\n            /*location name..*/\r\n            var location = $_this.data('location')\r\n\r\n\r\n            /*WE WILL LOAD SELECTED COUNTRY MAP AND ADD SELECTED COUNTRY TO INPUT FIELD*/\r\n            if (level === 'country') {\r\n                $('#country_name').val(location)\r\n                $('#cc').val(cc)\r\n                $('#r_all').html('')\r\n\r\n                /*LOADING DIMENSIONS OF THE MAP WITH LOCATIONS NAMES FROM DB AND\r\n                * PUTTING IT TOGETHER ON THE FLY HERE*/\r\n                $.getJSON('/load_map',\r\n                    {\r\n                        cc: cc\r\n                    },\r\n                    function (response) {\r\n                        /*STARTING WITH SOME TEXT INPUT FOR CURRENTLY HOVERED LOCATION AND\r\n                        * 2 BUTTONS\r\n                        *\r\n                        * ONE TO SHOW LIST OF LOCATIONS AND SECOND TO RELOAD WORLD MAP*/\r\n                        var new_map = `\r\n                            <div class=\"row no-gutters\" >\r\n                    <div class=\"col-md-6 map_info text-center border_green border_bottom_only p-2 d-flex justify-content-around align-items-center\">\r\n                        <span id=\"current\">Hover over map to see county name\r\n                       </span>\r\n                    </div>\r\n                    <div  data-range=\"all\" title=\"see the list\"\r\n                            class=\"col-md-6 p-2 show_list text-center border_green border_bottom_only d-flex justify-content-around align-items-center\">\r\n                        <span><i class=\"fas fa-list\"></i></span><br>\r\n                        <span class=\"text-center\">or select location from the list</span>\r\n                       \r\n\r\n                    </div>\r\n                        <span class=\"reload d-flex justify-content-around\" title=\"reload map\"><i class=\"fas fa-redo  pt-1\" ></i></span>\r\n                </div>\r\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" id=\"country_map\" data-cy=\"country_map\" x=\"0\" y=\"0\" \r\n                        baseProfile=\"tiny\" viewBox=\"0 0 660 447\" xml:space=\"preserve\">`\r\n\r\n\r\n                        /*FOR EACH PIECE OF MAP \"COUNTY\" WE WILL ASSIGN\r\n                        * CLASS FOR INTERACTIONS AND DATA LIKE LEVEL AND COUNTY NAME*/\r\n                        $.each(response.c_map, function (index, map_) {\r\n                            var county = Object.keys(map_)[0]\r\n                            var d = map_[county]\r\n\r\n\r\n                            $('#r_all').append(select_location_link(county, 'sign_up', cc, 'county'))\r\n\r\n\r\n                            new_map += `<path data-cy=\"${county}\" id=\"${county}\" \r\n                                title=\"click to select\"\r\n                                class=\"locations_list select_location\" \r\n                               \r\n                                data-location=\"${county}\"\r\n                                data-level=\"county\"\r\n                                fill=\"#66FF00\" \r\n                                stroke=\"#177199\" \r\n                                stroke-width=\".25\" d=\"${d}\"/>`\r\n\r\n\r\n                        })\r\n                        /*CLOSE UP SVG ELEMENT*/\r\n                        new_map += `</svg> `\r\n\r\n                        svg_map = 'country_map'\r\n\r\n                        /*ASSIGN NEWLY CREATED MAP TO map_sign_up DIV*/\r\n                        $('#map_sign_up').html(new_map)\r\n\r\n                        /*ADD MAP INTEARCTIVITY*/\r\n                        map_interactivity()\r\n\r\n                        /*EVERY PATH (COUNTY OR COUNTRY) HAS THIS CLASS\r\n                        * SO WHEN CLICKED WE WILL SELECT THIS MAP AND\r\n                        * UPDATE FORM INPUT FIELDS WITH COUNTRY AND COUNTY SELECTED*/\r\n                        $('.select_location').on('click', function () {\r\n\r\n                            select_location($(this))\r\n                        })\r\n\r\n                        /*SELECTING LOCATIONS IN RANGE*/\r\n                        $('.map_color_legend,.show_list').on('click', function () {\r\n\r\n\r\n                            show_list($(this))\r\n                            /*LINKS IN POPUP ARE NOT IN THE DOM YET WHEN WE ARE LOADING PAGE,\r\n                            * SO WE NEED TO ATTACH CLICK LISTENER AFTER THEY ARE IN THE DOM*/\r\n                            $('.select_location').on('click', function () {\r\n\r\n                                select_location($(this))\r\n                            })\r\n\r\n                        })\r\n\r\n                        /*RELOADING WORLD MAP*/\r\n                        $('.reload').on('click', function () {\r\n                            window.location.reload();\r\n                        })\r\n\r\n                    })\r\n            }\r\n            /*IF WE ARE ON COUNTY MAP, WE WILL ADD COUNTY NAME TO INPUT FIELD*/\r\n            else if (level === 'county') {\r\n\r\n                /*FORM INPUT FIELD VALUE OF CURRENTLY SELECTED LOCATION*/\r\n                $('#county_name').val(display_name(location))\r\n\r\n                /*RESET ANY PREVIOUSLY SELECTED LOCATION*/\r\n                $('path').attr('fill', '#66FF00')\r\n\r\n                /*WE WILL CHANGE COLOR OF SELECTED LOCATION*/\r\n                $(\"[data-location='\" + location + \"']\").attr('fill', '#20B2AA')\r\n                if (screen.width < 768) $('.globi_logo').get(0).scrollIntoView(1, 'slow')\r\n\r\n            }\r\n            swal.close()\r\n\r\n\r\n        }\r\n\r\n        /*POPUP WITH CURRENTLY SELECTED MAP LOCATIONS*/\r\n        function show_list($_this) {\r\n            var list_of_locations = $('#r_' + $_this.data('range'))\r\n\r\n            $('.' + $_this.data('range')).remove()\r\n            list_of_locations.append(`\r\n\r\n                    <span class=\"gl_button mt-2 d-print-none ${$_this.data('range')}\" \r\n                    onclick=\"swal.close()\" title=\"close\"> close</span>\r\n                    \r\n                  \r\n                    \r\n                    <hr class=\"${$_this.data('range')} d-print-none\">\r\n                    \r\n                    <small class=\"blue ${$_this.data('range')} d-print-none\">\r\n                    click on link to see country</small>`)\r\n\r\n\r\n            list_of_locations.prepend(`<img  class=\"d-none d-print-block\" src=\"/assets/dist/images/gloptopus_logo.gif\"/>`)\r\n\r\n            Swal.fire({\r\n\r\n                html: list_of_locations.html(),\r\n                showConfirmButton: false\r\n            })\r\n        }\r\n\r\n        /*JUST STRING REPLACE FOR LOCATION NAME*/\r\n        function display_name(location) {\r\n            return location.replace(/\\__/g, ' | ').replace(/\\_/g, ' ')\r\n        }\r\n\r\n        /*LOCATION NAME:\r\n        *   IT COULD BE COUNTRY NAME WITH ONE OR TWO TRANSLATIONS\r\n        * OR COUNTY NAME*/\r\n        function location_name(_this) {\r\n            if (_this.data('cn2')) return _this.data(\"cn2\")\r\n            else if (_this.data('cn')) return _this.data(\"cn\")\r\n            else if (_this.data('location')) return _this.data(\"location\")\r\n        }\r\n\r\n        /*MAP INTERACTIVITY ON MOUSEENTER, MOUSELEAVE, CLICK*/\r\n        function map_interactivity() {\r\n            $('path')\r\n                .on('mouseenter',\r\n                    function () {\r\n\r\n                        $(this).attr('stroke', \"red\").attr('stroke-width', 2)\r\n                        $('#current').html(display_name(location_name($(this))))\r\n\r\n                    })\r\n                .on('mouseleave',\r\n                    function () {\r\n                        $(this).attr('stroke', \"#177199\").attr('stroke-width', 0.25)\r\n\r\n\r\n                    })\r\n                .on('click',\r\n                    function () {\r\n                        $('#map_info').removeClass('d-flex align-content-around flex-wrap')\r\n                        $('#current_info').html(`\r\n                   \r\n                   <span class=\"blue\">country :</span> <br><span class=\"smaller_h text-wrap\"> ${location_name($(this))} </span><br>\r\n                \r\n                    <span class=\"blue\"> total globers : </span> <span class=\"smaller_h\"> \r\n                      ${new Intl.NumberFormat(navigator.language).format($(this).data('people'))} \r\n                     </span>\r\n                  \r\n                     <span class=\"smaller_h user_heart country d-flex justify-content-center align-items-center\"> \r\n                        ${new Intl.NumberFormat(navigator.language).format($(this).data('feel'))} </span>\r\n                      \r\n                       <br>\r\n                         <a  href=\"/${$(this).attr('id')}\" id='${$(this).attr('id')}' class=\"gl_button green text-center p-3 text-wrap\" >\r\n                        <span class=\"smaller_h pb-3\">EXPLORE MORE</span>\r\n                       \r\n                        </a>\r\n                        <hr>\r\n                `)\r\n                    });\r\n        }\r\n\r\n        /*ZOOMING AND PANING FOR SVG MAP*/\r\n        var MapControl = new SVGPanZoom(document.getElementById(svg_map), {\r\n            eventMagnet: null,\r\n            // zoom options\r\n            zoom: {\r\n                factor: 0.25,\r\n                minZoom: 1,\r\n                maxZoom: 20,\r\n                events: {\r\n                    mouseWheel: true,\r\n                    doubleClick: true,\r\n                    pinch: true\r\n                },\r\n                callback: function callback(multiplier) {\r\n                }\r\n            },\r\n        });\r\n        $('.map_controls').on('click', function () {\r\n\r\n            var action = $(this).data('action')\r\n            if (action === 'zoomIn') MapControl.zoomIn()\r\n            if (action === 'zoomOut') MapControl.zoomOut()\r\n            if (action === 'panLeft') MapControl.panLeft()\r\n            if (action === 'panRight') MapControl.panRight()\r\n            if (action === 'panUp') MapControl.panUp()\r\n            if (action === 'panDown') MapControl.panDown()\r\n            if (action === 'reset') MapControl.reset()\r\n        })\r\n    }\r\n\r\n)()\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./gl_modules/map/static/src/js/map_loader.js?");

/***/ }),

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

eval("/*SITE INTRO\r\n*\r\n* WHEN USER IS VISITING PAGE FOR THE FIRST TIME, WE WILL WELCOME HIM AND OFFER TOUR OF THE PAGE\r\n* AND SET   sessionStorage VARIABLE OF THE PAGE AS DONE, SO WE WONT\r\n* FIRE POPUP AGAIN, USER HAS OPTION OF SEEING TOUR BY CLICKING ON THE TAKE TOUR BUTTON NEXT TO THE LOGO\r\n*\r\n* PAGES ARE landing.html, country.html, user.html, public_user.html, sign_up.html,tests.html*/\r\n\r\n(function () {\r\n     var current_page = $('.current_page').data('current_page')\r\n\r\n\r\n\r\n    if((localStorage.getItem(current_page+'_intro') !== 'done'\r\n        && window.location.pathname !== '/user')    && window.location.pathname !== '/sign_in' )\r\n    {\r\n        swal.fire({\r\n            html:`<img  src=\"/assets/dist/images/happy.png\"/>\r\n                    <h4>Hi there !</h4>\r\n                    <p>It looks like it is your first visit to this page. We are very happy to have you! \r\n                    We hope that you will have a great experience using this site, and we prepared a little tour for you!\r\n                   </p>\r\n                   <hr>\r\n                   For the best user experience, we recommend these browsers : Google Chrome, Edge or Opera.\r\n                    <hr>\r\n                    <!--desktop-->\r\n                     <a class=\"btn feelist_title text-center text-light flash_success  p-3 d-none d-md-block\"\r\n                     href=\"javascript:void(0);\" onclick=\"javascript:introJs().start();swal.close();\">Take a tour</a>\r\n                     <!--mobile-->\r\n                      <a class=\"btn feelist_title text-center text-light flash_success  p-3 d-md-none\"\r\n                     href=\"javascript:void(0);\" onclick=user_nav();>Take a tour</a>\r\n                     \r\n                     \r\n                        `,\r\n                    showConfirmButton:false\r\n        })\r\n\r\n\r\n\r\n        localStorage.setItem(current_page+'_intro','done')\r\n\r\n    }\r\n})()\r\n\r\n\n\n//# sourceURL=webpack:///./gl_modules/shared/static/js/site_intro.js?");

/***/ }),

/***/ 0:
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./gl_modules/authorize/static/src/js/form_check.js ./gl_modules/shared/static/js/feel_meter.js ./gl_modules/shared/static/js/form_label.js ./gl_modules/shared/static/js/site_intro.js ./gl_modules/map/static/src/js/map_loader.js ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./gl_modules/authorize/static/src/js/form_check.js */\"./gl_modules/authorize/static/src/js/form_check.js\");\n__webpack_require__(/*! ./gl_modules/shared/static/js/feel_meter.js */\"./gl_modules/shared/static/js/feel_meter.js\");\n__webpack_require__(/*! ./gl_modules/shared/static/js/form_label.js */\"./gl_modules/shared/static/js/form_label.js\");\n__webpack_require__(/*! ./gl_modules/shared/static/js/site_intro.js */\"./gl_modules/shared/static/js/site_intro.js\");\nmodule.exports = __webpack_require__(/*! ./gl_modules/map/static/src/js/map_loader.js */\"./gl_modules/map/static/src/js/map_loader.js\");\n\n\n//# sourceURL=webpack:///multi_./gl_modules/authorize/static/src/js/form_check.js_./gl_modules/shared/static/js/feel_meter.js_./gl_modules/shared/static/js/form_label.js_./gl_modules/shared/static/js/site_intro.js_./gl_modules/map/static/src/js/map_loader.js?");

/***/ })

/******/ });