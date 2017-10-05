const socket = io('/admins').connect('https://talk.kucharskov.pl/');
		
//Logowanie
$('#loginForm').submit(function(e){
	e.preventDefault();
	$('#loginBody').fadeOut(250, function() {
		$('#adminBody').fadeIn(250);
	});
	return false;
});

//Bindowanie tooltipów
$('td.user span.badge').tooltip();