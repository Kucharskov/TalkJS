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
	//TODO: Wysyłanie 'get data' co jakiś czas (np 1 minutę)
	if(data) {
		var counter = 0;
		$('#table').html('');
		for(var index in data) {
			counter++;
			var html = '<tr><th scope="row">' + counter + '</th><td class="user"><span class="badge badge-' + data[index].color + '" data-toggle="tooltip" data-placement="right" title="SocketID:&nbsp;hdfSAaf12d908dsaaHDF1_HDCA">' + data[index].username + '</span></td><td class="text-center"><span class="badge badge-danger">Wyrzuć</span></td></tr>'
			$('#table').append(html);
			//Bindowanie tooltipów
			$('td.user span.badge').tooltip();
		}
	}else{
		var html = '<tr><th scope="row">0</th><td class="user">Brak zalogowanych użytkowników</td><td class="text-center"></td></tr>';
		$('#table').append(html);
	}
});
