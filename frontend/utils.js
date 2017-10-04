import state from './state';

//Licznik znaków w loginie
state.domElements.username.on('keyup', function() {
	$('#nameCount').html(15 - state.domElements.username.val().length);
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
	$('#noticeSound').prop('checked', state.settings.noticeSound);
});

//Zapisywanie ustawień z formularza
$('.settings-checkbox').on('click', function(e){
	state.settings.showAnimations = $('#showAnimations').prop('checked');
	state.settings.noticeTitle = $('#noticeTitle').prop('checked');
	state.settings.noticeSound = $('#noticeSound').prop('checked');

	if(!state.settings.showAnimations) {
		$('.modal').removeClass('fade');
		state.system.animationTime = 0;
	} else {
		$('.modal').addClass('fade');
		state.system.animationTime = 250;
	}
});