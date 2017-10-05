const adminHandler = function(io) {
	const admins = io.of("/admins");
	admins.on('connection', function(socket) {
		console.log('Admin connected: Socket ' + socket.id + ' connected!');

		socket.on('disconnect', function(data) {
			console.log('Admin disconnected: Socket ' + socket.id + ' disconnected!');
		});
	});
}

module.exports = adminHandler;