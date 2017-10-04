const consts = require('../utils/consts');
const functions = require('../utils/functions');

function User() {
	this.username = '';
	this.color = consts.colors[Math.floor(Math.random()*consts.colors.length)];
	this.logged = false;
}

User.prototype.setUsername = function(username) {
	let checkname = username.trim().substring(0, consts.maxNameLen);
	
	if(checkname === '') return false;
	else {
		this.username = functions.escapeText(checkname);
		this.logged = true;
		return true;
	}
}

User.prototype.setColor = function(color) {
	this.color = color;
}

User.prototype.createMsg = function(message, escape = true) {		
	message = (escape) ? functions.linkify(functions.escapeText(message)) : message;
	return '<p class="m-0 msg" data-toggle="tooltip" data-placement="right" title="' + functions.generateTime()  + '"><span class="badge badge-' + this.color + '">' + this.username + '</span> ' + message + '</p>';
}

module.exports = User;