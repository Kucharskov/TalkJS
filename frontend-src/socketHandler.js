import state from './state';

const socket = io.connect('https://talk.kucharskov.pl/');

//Logowanie
$('#loginForm').submit(function(e){
	e.preventDefault();
	socket.emit('set user', state.domElements.username.val(), function(data){
		if(data) {
			state.system.isUserLoggedIn = true;
			state.domElements.loginModal.modal('hide');
			state.domElements.message.prop('disabled', false);
		}
	});
	state.domElements.username.val('');
	return false;
});

//Wyslanie wiadomosci
$('#messageForm').submit(function(e){
	e.preventDefault();
	if(!state.system.isUserLoggedIn)
		state.domElements.loginModal.modal('show');
	else if(state.domElements.message.val().trim() !== '')
		socket.emit('send message', state.domElements.message.val());
	state.domElements.message.val('');
	return false;
});

//Inicjalizacja
socket.on('init', function() {
	state.system.isUserLoggedIn = false;
	state.domElements.loginModal.modal('show');
	state.domElements.message.prop('disabled', true);
	$('#nameCount').html(15 - state.domElements.username.val().length);
});

//Reakcja na wiadomość
socket.on('message', function(data) {
	state.domElements.chat.append(data);
	//Dodanie timestampa wiadomości
	$('p.msg').last().tooltip();
	//Dodawanie klikalnego nicku - wymaga odbindowania aby nie nakłądać bindów
	$('p.msg span.badge:not(.badge-danger)').unbind('click');
	$('p.msg span.badge:not(.badge-danger)').on('click', function() {
		if(state.system.isUserLoggedIn)
			state.domElements.message.val(state.domElements.message.val() + '@' + $(this).html() + ' ');
	});
	//Animacja wiadomości
	$('p.msg').last().fadeIn(state.system.animationTime);
	state.domElements.chat.scrollTop(state.domElements.chat.prop('scrollHeight'));
	//Powiadomienie w <title>
	if(!state.system.isWindowActive) {
		state.system.unreadCounter++;
		document.title = '(' + state.system.unreadCounter + ') ' + state.consts.title;
	}
});

//Odbieranie listy uzytkowników
socket.on('get users', function(counter, userlist) {
	$('#counter').html(counter);
	$('#userlist').html(userlist);
});

//Odbieranie błędu logowania
socket.on('usererror', function() {
	state.domElements.username.addClass('is-invalid');
	state.domElements.username.prop('placeholder', 'Wybierz inną nazwe!');
	alert('Wybrana nazwa użytkownika aktualnie jest zajęta lub niepoprawna, wybierz inną nazwę aby dołączyć do czatu!');
});
