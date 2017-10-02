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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

$(function(){
	const socket = io.connect('https://talk.kucharskov.pl/');
	const chat = $('#chat');
	const message = $('#message');
	const username = $('#username');
	const title = "TALK.KUCHARSKOV.PL";
	let logged = false;
	let windowActive = true;
	let unreadCounter = 0;

	//Logowanie
	$('#loginForm').submit(function(e){
		e.preventDefault();
		socket.emit('set user', username.val(), function(data){
			if(data) {
				logged = true;
				$('#loginModal').modal('hide');
				$('#message').prop('disabled', false);
			}
		});
		username.val('');
		return false;
	});

	//Wyslanie wiadomosci
	$('#messageForm').submit(function(e){
		e.preventDefault();
		if(!logged)
			$('#loginModal').modal('show');
		else if(message.val().trim() != '')
			socket.emit('send message', message.val());
		message.val('');
		return false;
	});

	//Inicjalizacja
	socket.on('init', function() {
		logged = false;
		$('#loginModal').modal('show');
		$('#message').prop('disabled', true);
		$('#nameCount').html(15 - username.val().length);
	});

	//Reakcja na wiadomość
	socket.on('message', function(data) {
		chat.append(data);
		//Dodanie timestampa wiadomości
		$('p.msg').last().tooltip();
		//Animacja wiadomości
		$('p.msg').last().fadeIn(250);
		chat.scrollTop(chat.prop('scrollHeight'));
		//Powiadomienie w <title>
		if(!windowActive) {
			unreadCounter++;
			document.title = '(' + unreadCounter + ') ' + title;
		}
	});

	//Odbieranie listy uzytkowników
	socket.on('get users', function(counter, userlist) {
		$('#counter').html(counter);
		$('#userlist').html(userlist);
	});

	//Odbieranie błędu logowania
	socket.on('usererror', function() {
		username.addClass('border border-danger');
		username.attr('placeholder', 'Wybierz inną nazwe!');
		alert('Wybrana nazwa użytkownika aktualnie jest zajęta lub niepoprawna, wybierz inną nazwę aby dołączyć do czatu!');
	});

	//Licznik znaków w loginie
	username.on("keyup", function() {
		$('#nameCount').html(15 - username.val().length);
	});

	//Chowanie messageForm
	$('.nav-item').on("click", function() {
		if($(this).attr('id') == 'nav-chat-tab') $('#messageForm').fadeIn(250);
		else $('#messageForm').fadeOut(250);
	});

	//Wykrywanie aktywności okna
	window.addEventListener('focus', function() {
		windowActive = true;
		unreadCounter = 0;
		document.title = title;
	});

	//Wykrywanie nieaktywności okna
	window.addEventListener('blur', function() {
		windowActive = false;
	});
});


/***/ })
/******/ ]);