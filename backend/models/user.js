const consts = require('../utils/consts');
const functions = require('../utils/functions');

class User {
	constructor(id) {
		this.id = id;
		this.username = '';
		this.color = consts.colors[Math.floor(Math.random()*consts.colors.length)];
		this.logged = false;
	}

	setUsername(username) {	
		this.username = functions.escapeText(username);
		this.logged = true;
	}

	setColor(color) {
		this.color = color;
	}

	getData() {
		return {
			id: this.id,
			username: this.username,
			color: this.color
		}
	}

	createMsg(message, escape = true) {		
		message = (escape) ? functions.linkify(functions.escapeText(message)).substring(0, 250) : message;
		return '<p class="m-0 msg" data-toggle="tooltip" data-placement="right" title="' + functions.generateTime()  + '"><span class="badge badge-' + this.color + '">' + this.username + '</span> ' + message + '</p>';
	}
}

module.exports = User;