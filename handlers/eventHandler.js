//Handler: eventHandler.js
const storage = require('../utils/storage');
const chat = require('../utils/chat');
const UserSystem = storage.createUser("System", "danger");

const eventHandler = function(io) {
	io.sockets.on('connection', function(socket) {
		console.log('Connected: Socket connected!');
		socket.emit('message', chat.createMsg(UserSystem, 'Witaj na czacie. Pamiętaj o zachowaniu kultury!', false));
		storage.addUser(socket.id);
		socket.emit('init');
		io.sockets.emit('get users', storage.countAll());
		
		//Disconnect
		socket.on('disconnect', function(data) {
			console.log('Disconnected: Socket disconnected!');
			const user = storage.findUser(socket.id);
			io.sockets.emit('get users', storage.countAll());
			io.sockets.emit('message', chat.createMsg(UserSystem, 'Użytkownik <strong class="text-' + user.color + '">' + user.username + '</strong> pożegnał się z nami!', false));
			storage.removeUser(socket.id);
		});

		//User set
		socket.on('set user', function(username, callback) {
			if(!(callback instanceof Function)) return;
			if(storage.setUsername(socket.id, chat.escapeText(username))) {
				callback(true);
				
				const user = storage.findUser(socket.id);
				io.sockets.emit('get users', storage.countAll());
				io.sockets.emit('message', chat.createMsg(UserSystem, 'Dołączył do nas użytkownik <strong class="text-' + user.color + '">' + user.username + '</strong>!', false));
			} else socket.emit('usererror');
		});

		//Send Message
		socket.on('send message', function(message) {
			const user = storage.findUser(socket.id);
			if(user.logged) {
				message = message.trim();
				if(message != "") io.sockets.emit('message', chat.createMsg(storage.findUser(socket.id), message, true));
			}
		});
	});
}

module.exports = eventHandler;