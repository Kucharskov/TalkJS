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
			return iUser.id == id;
		});
	},

	removeUser: function(id) {
		let user = users.find(function(iUser){
			return iUser.id == id;
		});
		let userIndex = users.indexOf(user);
		users.splice(userIndex, 1);
	},

	setUsername: function(id, username) {
		if(username.trim() === '') return false;
		for(let user in users){
			if(users[user].username === functions.escapeText(username)) return false;
		}

		let user = users.find(function(iUser){
			return iUser.id == id;
		});
		user.setUsername(username);
		return true;
	},

	setColor: function(id, color) {
		let user = users.find(function(iUser){
			return iUser.id == id;
		});
		user.setColor(color);
	},

	countAll: function() {
		let guestCount = 0;
		let usersCount = 0;
		for(var user in users) {
			if(users[user].logged) usersCount++;
			else guestCount++;
		}
		return (guestCount > 0) ? usersCount + ' (' + guestCount + '&nbsp;gości)' : usersCount;
	},

	getUsers: function() {
		let userlist = '';
		for(var user in users)
			if(users[user].logged) userlist += '<span class="badge badge-' + users[user].color + '">' + users[user].username + '</span> ';
		return (userlist === '') ? '<p class="text-danger m-0">Czat pusty</p>' : userlist;
	}
};


