//Utils: antyspam.js
let messages = []

module.exports = {
	addAutor: function(id) {
		messages[id] = "";
	},
	
	test: function(id, message) {
		if(messages[id] === message) return false;
		else {
			messages[id] = message;
			return true;
		}
	}
};