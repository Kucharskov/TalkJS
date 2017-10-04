//Handler: eventHandler.js
const storage = require('../utils/storage');
const chat = require('../utils/chat');
const antyspam = require('../utils/antyspam');
const ipguard = require('../utils/ipguard')
const UserSystem = storage.createUser("System", "danger");

const eventHandler = function(io) {
	io.sockets.on('connection', function(socket) {
		console.log('Connected: Socket ' + socket.id + 'connected!');
		socket.emit('message', chat.createMsg(UserSystem, '<span class="text-secondary">Witaj na czacie. Pamiętaj o zachowaniu kultury!</span>', false));
		socket.emit('init');
				
		if(ipguard.addIP(socket.handshake.headers['x-real-ip'])) {
			storage.addUser(socket.id);
			antyspam.addAutor(socket.id);
		} else {
			socket.emit('message', chat.createMsg(UserSystem, '<span class="text-danger">Wykryto zbyt wiele połączeń z Twojego adresu IP!</span>', false));
			ipguard.removeIP(socket.handshake.headers['x-real-ip']);
			socket.disconnect();
		}
		
		io.sockets.emit('get users', storage.countAll(), storage.getUsers());
				
		//Disconnect
		socket.on('disconnect', function(data) {
			console.log('Disconnected: Socket ' + socket.id + 'disconnected!');
			
			const user = storage.findUser(socket.id);
			if(user.logged) io.sockets.emit('message', chat.createMsg(UserSystem, '<span class="text-secondary">Użytkownik <strong class="text-' + user.color + '">' + user.username + '</strong> pożegnał się z nami!</span>', false));
			
			storage.removeUser(socket.id);
			antyspam.removeAutor(socket.id);
			ipguard.removeIP(socket.handshake.headers['x-real-ip']);
			
			io.sockets.emit('get users', storage.countAll(), storage.getUsers());
		});

		//User set
		socket.on('set user', function(username, callback) {
			if(!(callback instanceof Function)) return;
			if(storage.setUsername(socket.id, chat.escapeText(username.toString()))) {
				callback(true);
				
				const user = storage.findUser(socket.id);
				io.sockets.emit('get users', storage.countAll(), storage.getUsers());
				io.sockets.emit('message', chat.createMsg(UserSystem, '<span class="text-secondary">Dołączył do nas użytkownik <strong class="text-' + user.color + '">' + user.username + '</strong>!</span>', false));
			} else socket.emit('usererror');
		});

		//Send Message
		socket.on('send message', function(message) {
			const user = storage.findUser(socket.id);
			message = message.toString();
			message = message.trim();
			if(message != "") {
				if(!antyspam.test(socket.id, message)) socket.emit('message', chat.createMsg(UserSystem, '<span class="text-danger">Nie powtarzaj się oraz nie rozsyłaj SPAMu!</span>', false));
				else if(user.logged) io.sockets.emit('message', chat.createMsg(storage.findUser(socket.id), message, true));
			}
		});
	});
}

module.exports = eventHandler;