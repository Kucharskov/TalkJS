const store = require('../utils/store');
const antyspam = require('../utils/antyspam');
const ipguard = require('../utils/ipguard')
const UserSystem = store.createUser("System", "danger");

const eventHandler = function(io) {
	const clients = io.of("/clients");
	clients.on('connection', function(socket) {		
		//Connect
		console.log('Connected: Socket ' + socket.id + 'connected!');
		socket.emit('message', UserSystem.createMsg('<span class="text-secondary">Witaj na czacie. Pamiętaj o zachowaniu kultury!</span>', false));
		socket.emit('init');

		if(ipguard.addIP(socket.handshake.headers['x-real-ip'])) {
			store.addUser(socket.id);
			antyspam.addAutor(socket.id);
		} else {
			socket.emit('message', UserSystem.createMsg('<span class="text-danger">Wykryto zbyt wiele połączeń z Twojego adresu IP!</span>', false));
			ipguard.removeIP(socket.handshake.headers['x-real-ip']);
			socket.disconnect();
		}
		clients.emit('get users', store.countAll(), store.getUsers());

		//Disconnect
		socket.on('disconnect', function(data) {
			console.log('Disconnected: Socket ' + socket.id + 'disconnected!');
			
			const user = store.findUser(socket.id);
			if(user.logged) clients.emit('message', UserSystem.createMsg('<span class="text-secondary">Użytkownik <strong class="text-' + user.color + '">' + user.username + '</strong> pożegnał się z nami!</span>', false));
			
			store.removeUser(socket.id);
			antyspam.removeAutor(socket.id);
			ipguard.removeIP(socket.handshake.headers['x-real-ip']);
			
			clients.emit('get users', store.countAll(), store.getUsers());
		});

		//User set
		socket.on('set user', function(username, callback) {
			if(!(callback instanceof Function)) return;
			if(store.setUsername(socket.id, username.toString())) {
				callback(true);
				
				const user = store.findUser(socket.id);
				clients.emit('get users', store.countAll(), store.getUsers());
				clients.emit('message', UserSystem.createMsg('<span class="text-secondary">Dołączył do nas użytkownik <strong class="text-' + user.color + '">' + user.username + '</strong>!</span>', false));
			} else socket.emit('usererror');
		});

		//Send Message
		socket.on('send message', function(message) {
			const user = store.findUser(socket.id);
			message = message.toString().trim();
			if(message != "") {
				if(!antyspam.test(socket.id, message)) socket.emit('message', UserSystem.createMsg('<span class="text-danger">Nie powtarzaj się oraz nie rozsyłaj SPAMu!</span>', false));
				else if(user.logged) clients.emit('message', user.createMsg(message, true));
			}
		});
	});
}

module.exports = eventHandler;