//Utils: antyspam.js
let messages = []
let timestamps = []
let date = new Date();

module.exports = {
	addAutor: function(id) {
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
			if(date.getTime() - timestamps[id] > 700) {
				timestamps[id] = timestamp;
				messages[id] = message;
				return true;
			} else return false;
		}
	}
};