const consts = require('./consts');
const functions = require('../utils/functions');
let User = require('../models/user');
let users = [];

module.exports = {
	users: users,
	addUser: function(id) {
		users.push(new User(id));
	},

	createUser: function(username, color) {
		let user = new User();
		user.username = username;
		user.color = color;
		return user;
	},

	findUser: function(id) {
		return users.find(function(iUser){
			return iUser.id === id;
		});
	},

	removeUser: function(id) {
		users.splice(users.indexOf(this.findUser(id)), 1);
	},

	setUsername: function(id, username) {		
		username = username.trim().substring(0, consts.maxNameLen);
		if(username === '') return false;
		for(let user in users)
			if(users[user].username === functions.escapeText(username)) return false;
		
		this.findUser(id).setUsername(username);
		return true;
	},

	setColor: function(id, color) {
		this.findUser(id).setColor(color);
	},

	getCount: function() {
		let guestCount = 0;
		let usersCount = 0;
		for(let user in users) {
			if(users[user].logged) usersCount++;
			else guestCount++;
		}
		return (guestCount > 0) ? usersCount + ' (' + guestCount + '&nbsp;gości)' : usersCount;
	},

	getUserlist: function() {
		let userlist = '';
		for(let user in users)
			if(users[user].logged) userlist += '<span class="badge badge-' + users[user].color + '">' + users[user].username + '</span> ';
		return (userlist === '') ? '<p class="text-danger m-0">Czat pusty</p>' : userlist;
	}
};