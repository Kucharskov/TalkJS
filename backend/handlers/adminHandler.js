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
					socket.logged = true;
					return;
				}
			});
		 	callback(false);
		});

		//Get data
		socket.on('get data', function() {
			if(socket.logged) {
				let data = store.getData();
				let htmlData = '<tr><td class="table-danger text-center" colspan="3">Brak zalogowanych użytkowników</td></tr>';

				if(data) {
					htmlData = '';
					let counter = 0;
					for(var index in data) {
						counter++;
						htmlData += '<tr><th scope="row">' + counter + '</th><td class="user"><span class="badge badge-' + data[index].color + '" data-toggle="tooltip" data-placement="right" title="SocketID:&nbsp;' + data[index].id + '">' + data[index].username + '</span></td><td class="text-center"><span class="badge badge-danger">Wyrzuć</span></td></tr>';
					}
				}
				socket.emit('load data', htmlData);
			}
		});
	});
}

module.exports = adminHandler;