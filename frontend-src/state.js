module.exports = {
	consts: {
		title: document.title
	},
	system: {
		isUserLoggedIn: false,
		isWindowActive: true,
		unreadCounter: 0
	},
	domElements: {
		chat: $('#chat'),
		message: $('#message'),
		username: $('#username')
	}
};