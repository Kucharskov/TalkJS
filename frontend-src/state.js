module.exports = {
	consts: {
		title: document.title
	},
	system: {
		isUserLoggedIn: false,
		isWindowActive: true,
		unreadCounter: 0
	},
	settings: {
		showAnimations: true,
		noticeTitle: true
	},
	domElements: {
		chat: $('#chat'),
		message: $('#message'),
		messageForm: $('#messageForm'),
		username: $('#username'),
		loginModal: $('#loginModal')
	}
};