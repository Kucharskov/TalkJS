import state from './state';

//Licznik znaków w loginie
state.domElements.username.on('keyup', function() {
	$('#nameCount').html(15 - state.domElements.username.val().length);
});

//Chowanie messageForm
$('.nav-item').on("click", function() {
	if($(this).prop('id') === 'nav-chat-tab') $('#messageForm').fadeIn(250);
	else $('#messageForm').fadeOut(250);
});

//Wykrywanie aktywności okna
$(window).on('focus', function() {
	state.system.isWindowActive = true;
	state.system.unreadCounter = 0;
	document.title = state.consts.title;
});

//Wykrywanie nieaktywności okna
$(window).on('blur', function() {
	state.system.isWindowActive = false;
});