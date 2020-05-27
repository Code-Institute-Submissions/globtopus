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

/***/ "./gl_modules/admin/static/js/admin.js":
/*!*********************************************!*\
  !*** ./gl_modules/admin/static/js/admin.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shared_static_js_swal_toast_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/static/js/swal_toast.js */ \"./gl_modules/shared/static/js/swal_toast.js\");\n\r\n\r\n(function () {\r\n\r\n\r\n    $('.flaged').on('click', function () {\r\n\r\n\r\n        var action = $(this).data('action')\r\n        var post_id = $(this).data('post_id')\r\n        var user_id = $(this).data('user_id')\r\n\r\n        Swal.fire({\r\n            html: `    <img  src=\"assets/dist/images/sad.png\"/>\r\n                                    <h4 class=\"danger_title\">${action} post?</h4>\r\n                                    `,\r\n\r\n            showCancelButton: true,\r\n            buttonsStyling: false,\r\n            cancelButtonColor: 'red',\r\n            confirmButtonText: 'Yes!',\r\n            cancelButtonText: 'No!',\r\n            customClass: {\r\n                confirmButton: 'gl_button cy-confirm',\r\n                cancelButton: 'gl_button danger'\r\n            },\r\n        }).then((result) => {\r\n            if (result.value) {\r\n                $.getJSON(action === 'delete' ? '/delete_flaged_post' : '/return_flaged_post',\r\n                    {post_id: post_id, user_id: user_id},\r\n                    function (response) {\r\n\r\n                        if (response.deleted === 'deleted' || response.returned_back === 'returned') {\r\n\r\n                            $('#' + post_id).remove()\r\n\r\n                            _shared_static_js_swal_toast_js__WEBPACK_IMPORTED_MODULE_0__[\"Toast\"].fire({\r\n\r\n                                html: `<img  src=\"assets/dist/images/happy.png\"/><p class=\"text-success\">${action} succesful!</h4> \r\n                                       `,\r\n                            })\r\n\r\n                        }\r\n\r\n                    }, function (error) {\r\n                        _shared_static_js_swal_toast_js__WEBPACK_IMPORTED_MODULE_0__[\"Toast\"].fire({\r\n                            html: ` <img  src=\"assets/dist/images/sad.png\"/>\r\n                                                    <p class=\"text-danger\">Something is wrong. <br> Please try later!</h4> \r\n                                       `,\r\n                        })\r\n                    })\r\n                 window.location.reload()\r\n            }\r\n        })\r\n\r\n\r\n    })\r\n})()\n\n//# sourceURL=webpack:///./gl_modules/admin/static/js/admin.js?");

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

/***/ 0:
/*!***************************************************!*\
  !*** multi ./gl_modules/admin/static/js/admin.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./gl_modules/admin/static/js/admin.js */\"./gl_modules/admin/static/js/admin.js\");\n\n\n//# sourceURL=webpack:///multi_./gl_modules/admin/static/js/admin.js?");

/***/ })

/******/ });