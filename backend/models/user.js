let colors = require('../config/colors');
const consts = require('../config/consts');

function User() {
	this.username = '';
	this.color = colors[Math.floor(Math.random()*colors.length)];
	this.logged = false;
}

User.prototype.setUsername = function (username) {
	let checkname = username.trim().substring(0, consts.maxNameLen);

	this.username = checkname;
	this.logged = true;
	return true;
}

User.prototype.setColor = function (color) {
	this.color = color;
}

module.exports = User;
