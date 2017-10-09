import state from './state';
const socket = io('/admins').connect('https://talk.kucharskov.pl/');

//Logowanie
$('#loginForm').submit(function(e){
	e.preventDefault();
	socket.emit('login', {username: state.domElements.login.val(), password: state.domElements.password.val()}, function(data){
		state.system.isUserLoggedIn = data;
		if(state.system.isUserLoggedIn) {
			$('#loginBody').fadeOut(250, function() {
				$('#adminBody').fadeIn(250);
				socket.emit('get data');
			});
		} else {
			state.domElements.login.addClass('is-invalid');
			state.domElements.password.addClass('is-invalid');
		}
	});
	return false;
});

//Ładowanie danych
socket.on('load data', function(data) {
	if(state.system.isUserLoggedIn) {
		state.domElements.table.html('');
		state.domElements.table.append(data);
		
		//Bindowanie wiadomości
		$('.actions span.badge.send').on('click', function() {
			var id = $(this).parent('td').parent('tr').attr('data-id');
			socket.emit('admin messaage', {id: id, message: prompt('Wiadomość: ')});
		});
		
		//Bindowanie kickowania
		//$('.actions span.badge.kick').on('click', function() {
		//	var id = $(this).parent("td").parent("tr").attr("data-id");
		//});
	}
});

//Wysyłanie danych co minute
setInterval(function(){
	if(state.system.isUserLoggedIn)
		socket.emit('get data');
}, 30000);