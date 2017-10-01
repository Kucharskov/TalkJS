//Utils: storage.js
let users = [];
const colors = ['primary', 'secondary', 'success', 'warning', 'info'];

function User() {
	this.username = '';
	this.color = colors[Math.floor(Math.random()*colors.length)];
	this.logged = false;
}

User.prototype.setUsername = function (username) {
	let checkname = username.trim().substring(0, 15);

	for(var user in users)
		if(users[user].username == checkname) return false;
	
	this.username = checkname;
	this.logged = true;
	return true;
}

User.prototype.setColor = function (color) {
	this.color = color;
}

module.exports = {
	addUser: function(id) {
		users[id] = new User();
	},
	
	createUser: function(username, color) {
		let user = new User();
		user.setUsername(username);
		user.setColor(color);
		return user;
	},
	
	findUser: function(id) {
		if(users[id]) return users[id];
	},
	
	removeUser: function(id) {
		if(users[id]) delete users[id];
	},

	setUsername: function(id, username) {
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
		return (guestCount > 0) ? usersCount + ' (' + guestCount + ' gości)' : usersCount;
	}
};