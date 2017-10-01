//Utils: antyspam.js
let messages = []
let timestamps = []

module.exports = {
	addAutor: function(id) {
		let d = new Date();
		messages[id] = "";
		timestamps[id] = d.getTime();
	},
	
	test: function(id, message) {
		if(messages[id] === message) return false;
		else {
			let d = new Date();
			let timestamp = d.getTime();

			if(timestamp - timestamps[id] > 700) {
				timestamps[id] = timestamp;
				messages[id] = message;
				return true;
			} else return false;
		}
	}
};