import state from './state';

const socket = io.connect('https://talk.kucharskov.pl/');

//Logowanie
$('#loginForm').submit(function(e){
	e.preventDefault();
	socket.emit('set user', state.domElements.username.val(), function(data){
		if(data) {
			state.system.isUserLoggedIn = true;
			$('#loginModal').modal('hide');
			$('#message').prop('disabled', false);
		}
	});
	state.domElements.username.val('');
	return false;
});

//Wyslanie wiadomosci
$('#messageForm').submit(function(e){
	e.preventDefault();
	if(!state.system.isUserLoggedIn)
		$('#loginModal').modal('show');
	else if(state.domElements.message.val().trim() != '')
		socket.emit('send message', state.domElements.message.val());
	state.domElements.message.val('');
	return false;
});

//Inicjalizacja
socket.on('init', function() {
	state.system.isUserLoggedIn = false;
	$('#loginModal').modal('show');
	$('#message').prop('disabled', true);
	$('#nameCount').html(15 - state.domElements.username.val().length);
});

//Reakcja na wiadomość
socket.on('message', function(data) {
	state.domElements.chat.append(data);
	//Dodanie timestampa wiadomości
	$('p.msg').last().tooltip();
	//Animacja wiadomości
	$('p.msg').last().fadeIn(250);
	state.domElements.chat.scrollTop(state.domElements.chat.prop('scrollHeight'));
	//Powiadomienie w <title>
	if(!state.system.iswindowActive) {
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
	state.domElements.username.addClass('border border-danger');
	state.domElements.username.attr('placeholder', 'Wybierz inną nazwe!');
	alert('Wybrana nazwa użytkownika aktualnie jest zajęta lub niepoprawna, wybierz inną nazwę aby dołączyć do czatu!');
});
