//Utils: storage.js
const consts = require('../config/consts');
let User = require('../models/user');

let users = [];



module.exports = {
	addUser: function(id) {
		users[id] = new User();
	},

	createUser: function(username, color) {
		let user = new User();
		user.username = username;
		user.color = color;
		return user;
	},

	findUser: function(id) {
		if(users[id]) return users[id];
	},

	removeUser: function(id) {
		if(users[id]) delete users[id];
	},

	setUsername: function(id, username) {
		for(var user in users)
			if(users[user].username == username) return false;

		if(users[id]) return users[id].setUsername(username);
	},

	setColor: function(id, color) {
		if(users[id]) users[id].setColor(color);
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
		for(var user in users) {
			if(users[user].logged) userlist += '<span class="badge badge-' + users[user].color + '">' + users[user].username + '</span> ';
		}
		return (userlist === '') ? '<p class="text-danger m-0">Czat pusty</p>' : userlist;
	}
};
