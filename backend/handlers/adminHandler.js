const store = require('../utils/store');

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
			//TODO: Sprawdzanie danych w bazie adminów
			if(data.username === "admin" && data.password === "admin1") {
				callback(true);
				socket.emit('load data', store.getData());
			} else callback(false);
		});
		
		//Get data
		socket.on('get data', function() {
			socket.emit('load data', store.getData());
		});
	});
}

module.exports = adminHandler;