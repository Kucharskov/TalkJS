import state from './state';
const socket = io('/admins').connect('https://talk.kucharskov.pl/');

//Logowanie
$('#loginForm').submit(function(e){
	e.preventDefault();
	socket.emit('login', {username: $('#login').val(), password: $('#password').val()}, function(data){
		state.system.isUserLoggedIn = data;
		if(state.system.isUserLoggedIn) {
			$('#loginBody').fadeOut(250, function() {
				$('#adminBody').fadeIn(250);
				socket.emit('get data');
			});
		} else {
			$('#login').addClass('is-invalid');
			$('#password').addClass('is-invalid');
		}
	});
	return false;
});

//Ładowanie danych
socket.on('load data', function(data) {
	if(state.system.isUserLoggedIn) {
		$('#table').html('');
		$('#table').append(data);
		$('td.user span.badge').tooltip();
		
		//Message test
		//$('td.actions span.badge .send').on('click', function() {	
		//	if(state.system.isUserLoggedIn) {
		//		TODO: jQuery pobieranie wartości z tooltipa bądź innego elementu gdzie wrzuci się socket.id
		//		var id = 
		//		socket.emit('admin messaage', id, prompt("Wiadomość: "));
		//	}
		//});
	}
});

//Wysyłanie danych co minute
setInterval(function(){
	if(state.system.isUserLoggedIn)
		socket.emit('get data');
}, 30000);