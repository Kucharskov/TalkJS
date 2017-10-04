const consts = require('../config/consts');
let messages = [];
let timestamps = [];

module.exports = {
	addAutor: function(id) {
		let date = new Date();
		messages[id] = "";
		timestamps[id] = date.getTime();
	},

	removeAutor: function(id) {
		if(messages[id]) delete messages[id];
		if(timestamps[id]) delete timestamps[id];
	},

	test: function(id, message) {
		if(messages[id] === message) return false;
		else {
			let date = new Date();
			if(date.getTime() - timestamps[id] > consts.minMsgDelay) {
				timestamps[id] = date.getTime();
				messages[id] = message;
				return true;
			} else return ;
		}
	}
};
