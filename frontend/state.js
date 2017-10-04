module.exports = {
	consts: {
		title: document.title,
		audio: new Audio("mp3/notification.mp3")
	},
	system: {
		isUserLoggedIn: false,
		isWindowActive: true,
		animationTime: 250,
		unreadCounter: 0
	},
	settings: {
		showAnimations: true,
		noticeTitle: true,
		noticeSound: false
	},
	domElements: {
		chat: $('#chat'),
		message: $('#message'),
		messageForm: $('#messageForm'),
		username: $('#username'),
		loginModal: $('#loginModal')
	}
};