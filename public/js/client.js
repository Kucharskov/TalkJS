$(function(){
	const socket = io.connect('https://talk.kucharskov.pl/');
	const chat = $('#chat');
	const message = $('#message');
	const username = $('#username');
	let logged = false;
		
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
		$('#nameCount').html(15 - username.val().length);
		username.val('');
		return false;
	});

	//Wyslanie wiadomosci
	$('#messageForm').submit(function(e){
		e.preventDefault();
		if(!logged)
			$('#loginModal').modal('show');
		//else if(message.val().trim() != '')
			socket.emit('send message', message.val());
		message.val('');
		return false;
	});
	
	//Inicjalizacja
	socket.on('init', function() {
		logged = false;
		$('#loginModal').modal('show');
		$('#message').prop('disabled', true);
	});
	
	//Reakcja na wiadomość
	socket.on('message', function(data) {
		chat.append(data);
		//Dodanie timestampa wiadomości
		$('p.msg').last().tooltip();
		//Animacja wiadomości
		$('p.msg').last().fadeIn(250);
		chat.scrollTop(chat.prop('scrollHeight'));
	});
	
	//Odbieranie listy uzytkowników
	socket.on('get users', function(data) {
		$('#counter').html(data);
	});
	
	//Odbieranie błędu logowania
	socket.on('usererror', function() {
		username.addClass('border border-danger');
		username.attr('placeholder', 'Wybierz inną nazwe!');
		alert('Wybrana nazwa użytkownika aktualnie jest zajęta lub niepoprawna, wybierz inną nazwę aby dołączyć do czatu!');
	});
	
	//Licznik znaków w loginie
	username.keyup(function() {
		$('#nameCount').html(15 - username.val().length);
	});
});