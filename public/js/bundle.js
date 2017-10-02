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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
  consts: {
    title: 'TALK.KUCHARSKOV.PL'
  },
  system: {
    isUserLoggedIn: false,
    isWindowActive: true,
    unreadCounter: 0
  },
  domElements: {
    chat: $('#chat'),
    message: $('#message'),
    username: $('#username')
  }
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__state__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socketHandler__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(3);





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__state__);


const socket = io.connect('https://talk.kucharskov.pl/');

//Logowanie
$('#loginForm').submit(function(e){
  e.preventDefault();
  socket.emit('set user', __WEBPACK_IMPORTED_MODULE_0__state___default.a.domElements.username.val(), function(data){
    if(data) {
      __WEBPACK_IMPORTED_MODULE_0__state___default.a.system.isUserLoggedIn = true;
      $('#loginModal').modal('hide');
      $('#message').prop('disabled', false);
    }
  });
  __WEBPACK_IMPORTED_MODULE_0__state___default.a.domElements.username.val('');
  return false;
});

//Wyslanie wiadomosci
$('#messageForm').submit(function(e){
  e.preventDefault();
  if(!__WEBPACK_IMPORTED_MODULE_0__state___default.a.system.isUserLoggedIn)
    $('#loginModal').modal('show');
  else if(__WEBPACK_IMPORTED_MODULE_0__state___default.a.domElements.message.val().trim() != '')
    socket.emit('send message', __WEBPACK_IMPORTED_MODULE_0__state___default.a.domElements.message.val());
  __WEBPACK_IMPORTED_MODULE_0__state___default.a.domElements.message.val('');
  return false;
});

//Inicjalizacja
socket.on('init', function() {
  __WEBPACK_IMPORTED_MODULE_0__state___default.a.system.isUserLoggedIn = false;
  $('#loginModal').modal('show');
  $('#message').prop('disabled', true);
  $('#nameCount').html(15 - __WEBPACK_IMPORTED_MODULE_0__state___default.a.domElements.username.val().length);
});

//Reakcja na wiadomość
socket.on('message', function(data) {
  __WEBPACK_IMPORTED_MODULE_0__state___default.a.domElements.chat.append(data);
  //Dodanie timestampa wiadomości
  $('p.msg').last().tooltip();
  //Animacja wiadomości
  $('p.msg').last().fadeIn(250);
  __WEBPACK_IMPORTED_MODULE_0__state___default.a.domElements.chat.scrollTop(__WEBPACK_IMPORTED_MODULE_0__state___default.a.domElements.chat.prop('scrollHeight'));
  //Powiadomienie w <title>
  if(!__WEBPACK_IMPORTED_MODULE_0__state___default.a.system.iswindowActive) {
    __WEBPACK_IMPORTED_MODULE_0__state___default.a.system.unreadCounter++;
    document.title = '(' + __WEBPACK_IMPORTED_MODULE_0__state___default.a.system.unreadCounter + ') ' + __WEBPACK_IMPORTED_MODULE_0__state___default.a.consts.title;
  }
});

//Odbieranie listy uzytkowników
socket.on('get users', function(counter, userlist) {
  $('#counter').html(counter);
  $('#userlist').html(userlist);
});

//Odbieranie błędu logowania
socket.on('usererror', function() {
  __WEBPACK_IMPORTED_MODULE_0__state___default.a.domElements.username.addClass('border border-danger');
  __WEBPACK_IMPORTED_MODULE_0__state___default.a.domElements.username.attr('placeholder', 'Wybierz inną nazwe!');
  alert('Wybrana nazwa użytkownika aktualnie jest zajęta lub niepoprawna, wybierz inną nazwę aby dołączyć do czatu!');
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__state__);


//Licznik znaków w loginie
__WEBPACK_IMPORTED_MODULE_0__state___default.a.domElements.username.on("keyup", function() {
  $('#nameCount').html(15 - __WEBPACK_IMPORTED_MODULE_0__state___default.a.domElements.username.val().length);
});

//Chowanie messageForm
$('.nav-item').on("click", function() {
  if($(this).attr('id') == 'nav-chat-tab') $('#messageForm').fadeIn(250);
  else $('#messageForm').fadeOut(250);
});

//Wykrywanie aktywności okna
window.addEventListener('focus', function() {
  __WEBPACK_IMPORTED_MODULE_0__state___default.a.system.iswindowActive = true;
  __WEBPACK_IMPORTED_MODULE_0__state___default.a.system.unreadCounter = 0;
  document.title = __WEBPACK_IMPORTED_MODULE_0__state___default.a.consts.title;
});

//Wykrywanie nieaktywności okna
window.addEventListener('blur', function() {
  __WEBPACK_IMPORTED_MODULE_0__state___default.a.system.iswindowActive = false;
});


/***/ })
/******/ ]);