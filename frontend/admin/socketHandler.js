const socket = io('/admins').connect('https://talk.kucharskov.pl/');

//Logowanie
$('#loginForm').submit(function(e){
	e.preventDefault();
	socket.emit('login', {username: $('#login').val(), password: $('#password').val()}, function(data){
		if(data) {
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
	//TODO: Załadowanie danych z arraya do tabeli
	console.log(data);
});

//Bindowanie tooltipów
$('td.user span.badge').tooltip();