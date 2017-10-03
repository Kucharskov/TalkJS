import state from './state';

//Licznik znaków w loginie
state.domElements.username.on('keyup', function() {
	$('#nameCount').html(15 - state.domElements.username.val().length);
});

//Chowanie messageForm
$('.nav-item').on("click", function() {
	if($(this).prop('id') === 'nav-chat-tab') $('#messageForm').fadeIn(state.system.animationTime);
	else $('#messageForm').fadeOut(state.system.animationTime);
});

//Wykrywanie aktywności okna
$(window).on('focus', function() {
	if(state.settings.noticeTitle) {
		state.system.isWindowActive = true;
		state.system.unreadCounter = 0;
		document.title = state.consts.title;
	}
});

//Wykrywanie nieaktywności okna
$(window).on('blur', function() {
	if(state.settings.noticeTitle)
		state.system.isWindowActive = false;
});

//Ładowanie formularza z ustawieniami
$(window).on('load', function() {
	$('#showAnimations').prop('checked', state.settings.showAnimations);
	$('#noticeTitle').prop('checked', state.settings.noticeTitle);
});

//Zapisywanie ustawień z formularza
$('#settingsForm').submit(function(e){
	e.preventDefault();
	state.settings.showAnimations = $('#showAnimations').prop('checked');
	state.settings.noticeTitle = $('#noticeTitle').prop('checked');
	
	if(!state.settings.showAnimations) {
		$('.modal').removeClass('fade');
		$('.tab-pane').removeClass('fade');
		state.system.animationTime = 0;
	} else {
		$('.modal').addClass('fade');
		$('.tab-pane').addClass('fade');
		$('.tab-pane.active').addClass('show');
		state.system.animationTime = 250;
	}
	
	return false;
});