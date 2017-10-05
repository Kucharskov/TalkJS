const adminHandler = function(io) {
	const admins = io.of("/admins");
	admins.on('connection', function(socket) {
		console.log("LOG: adminHandler");
	});
}

module.exports = adminHandler;