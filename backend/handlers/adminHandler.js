const adminHandler = function(io) {
	io.sockets.on('connection', function(socket) {
		console.log("LOG: adminHandler");
	});
}

module.exports = adminHandler;