const store = require('../utils/store');
const adminAccounts = require('../utils/adminAccounts');
const sha512 = require('js-sha512');

const adminHandler = function(io) {
	const admins = io.of("/admins");
	admins.on('connection', function(socket) {
		//Connect
		console.log('Admin connected: Socket ' + socket.id + ' connected!');

		//Disconnect
		socket.on('disconnect', function(data) {
			console.log('Admin disconnected: Socket ' + socket.id + ' disconnected!');
		});

		//Login
		socket.on('login', function(data, callback) {
			if(!(callback instanceof Function)) return;

			adminAccounts.forEach(function(admin){
				if(data.username === admin.username && sha512(data.password) === admin.password){
					callback(true);
					return;
				}
			});
		 	callback(false);
		});

		//Get data
		socket.on('get data', function() {
			socket.emit('load data', store.getData());
		});

		//Wysyłanie danych co interwał
		//setInterval(function(){
		//	socket.emit('load data', store.getData());
		//}, 1000);
	});
}

module.exports = adminHandler;
