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

/***/ "./gl_modules/user/static/src/js/user.js":
/*!***********************************************!*\
  !*** ./gl_modules/user/static/src/js/user.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\r\n    /*removing last _*/\r\n\r\n    var days = $('#days').data('days').slice(0, -1).split('_');\r\n    var feelings = $('#feelings').data('feelings').slice(0, -1).split('_');\r\n    //rendering users progress\r\n    new Chart(document.getElementById(\"user_chart\"), {\r\n        type: 'line',\r\n        data: {\r\n            labels: days,\r\n            datasets: [{\r\n                data: feelings,\r\n\r\n                borderColor: \"#3e95cd\",\r\n                fill: false\r\n            }\r\n            ]\r\n        },\r\n        options: {\r\n            legend: {display: false},\r\n            title: {\r\n                display: true,\r\n                text: 'Your progress'\r\n            }\r\n        }\r\n    });\r\n\r\n\r\n    $('.feelist').on('click', function () {\r\n\r\n        var f_name = $(this).data('f_name')\r\n        $.getJSON('/_my_feelist', {\r\n                f_name: f_name\r\n\r\n            },\r\n\r\n            function (response) {\r\n                var f_actions = response.f_actions\r\n                $('.user_interaction').addClass('d-none')\r\n                var feelist = $('#feelists')\r\n                feelist.removeClass('d-none').html('')\r\n                var counter = 0\r\n                feelist.append(`<h4 class=\"feelist_title\" >${f_name} \r\n                <small  class=\"float-right delete_feelist\" title=\"Delete feelist?\" data-f_name=\"${f_name}\">\r\n                 <i class=\"far fa-trash-alt\"></i></small></h4>    `)\r\n                for (var action of f_actions) {\r\n                    counter++\r\n\r\n                    feelist.append(` <div class=\"card mb-3 mt-3 feelist_action \" id=\"${action.post_id}\" style=\"max-width: 540px;\">\r\n                                    <div class=\"row no-gutters\">\r\n                                        <div class=\"col-md-4 \">\r\n                                            <img class=\"avatar\" src=\"assets/dist/images/avatars/${counter % 12}.png\"/>\r\n                                            <div class=\"d-flex justify-content-center\"><a href=\"#\" class=\"user\">${action.name}</a></div>\r\n                                        </div>\r\n                                        <div class=\"col-md-8 p-1\">\r\n\r\n                                            <div class=\"card-body  m-0\">\r\n                                                <p class=\"card-text m-1 blue\">\r\n                                                    \r\n                                                    When I feel/feel like... <span class=\"i_feel text-secondary\">${action.i_feel}</span></p>\r\n\r\n                                                <p class=\"card-text m-1\">Because...<span class=\"because\">${action.because}</span></p>\r\n\r\n                                                <p class=\"card-text m-1\">I ...  <span class=\"card-text\">${action.action}</span></p>\r\n\r\n                                                <p class=\"card-text float-right\">\r\n                                                    <small class=\"delete_action\" title=\"Remove from list?\"\r\n                                                    data-post_id=\"${action.post_id}\">\r\n                                                    <i class=\"far fa-trash-alt\"></i>\r\n                                                   </small>\r\n                                                </p>\r\n                                            </div>\r\n                                        </div>\r\n\r\n                                    </div>\r\n                                </div>`)\r\n                }\r\n\r\n                $('.delete_action').on('click', function () {\r\n                    var post_id = $(this).data('post_id')\r\n\r\n                    Swal.fire({\r\n                        title: 'Are you sure?',\r\n                        text: \"You won't be able to revert this!\",\r\n                        icon: 'warning',\r\n                        showCancelButton: true,\r\n                        confirmButtonColor: '#3085d6',\r\n                        cancelButtonColor: '#d33',\r\n                        confirmButtonText: 'Yes, delete it!'\r\n                    }).then((result) => {\r\n                        if (result.value) {\r\n                            $.getJSON('/delete_action', {post_id: post_id},\r\n                        function (response) {\r\n                                console.log('response is '+response.deleted)\r\n                                if(response.deleted === 'deleted')\r\n                                {\r\n\r\n                                    $( '#'+post_id ).remove()\r\n\r\n                                }\r\n\r\n                        },function (error) {\r\n                                    console.log(error)\r\n                                }\r\n                        )\r\n                        }\r\n                    })\r\n\r\n\r\n\r\n                })\r\n                 $('.delete_feelist').on('click', function () {\r\n                    var f_name = $(this).data('f_name')\r\n\r\n                    Swal.fire({\r\n                        title: 'Are you sure?',\r\n                        text: \"You won't be able to revert this!\",\r\n                        icon: 'warning',\r\n                        showCancelButton: true,\r\n                        confirmButtonColor: '#3085d6',\r\n                        cancelButtonColor: '#d33',\r\n                        confirmButtonText: 'Yes, delete it!'\r\n                    }).then((result) => {\r\n                        if (result.value) {\r\n                            $.getJSON('/delete_feelist', {f_name: f_name},\r\n                        function (response) {\r\n                                console.log('response is '+response.deleted)\r\n                                if(response.deleted === 'deleted')\r\n                                {\r\n\r\n                                    window.location.reload()\r\n\r\n                                }\r\n\r\n                        },function (error) {\r\n                                    console.log(error)\r\n                                }\r\n                        )\r\n                        }\r\n                    })\r\n\r\n\r\n\r\n                })\r\n            },\r\n            function () {\r\n                console.log('error, please try later')\r\n            });\r\n        // $.ajax({\r\n        //     url: '/_my_feelist',\r\n        //     data: {f_name: f_name},\r\n        //     type: 'POST',\r\n        //\r\n        //     success: function (response) {\r\n        //         var u_actions = response.u_actions\r\n        //         console.log(u_actions)\r\n        //         // $.each(u_actions, function (key,name) {\r\n        //         //     console.log('feelists '+key+' - '+name)\r\n        //         //\r\n        //         // })\r\n        //     },\r\n        //     error: function (error) {\r\n        //         console.log(error)\r\n        //     }\r\n        // });\r\n    })\r\n})()\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./gl_modules/user/static/src/js/user.js?");

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./gl_modules/user/static/src/js/user.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./gl_modules/user/static/src/js/user.js */\"./gl_modules/user/static/src/js/user.js\");\n\n\n//# sourceURL=webpack:///multi_./gl_modules/user/static/src/js/user.js?");

/***/ })

/******/ });