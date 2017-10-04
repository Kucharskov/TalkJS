const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const eventHandler = require(__dirname + '/backend/handlers/eventHandler');

server.listen(process.env.PORT || 3000);
console.log('Server running at 127.0.0.1:3000...');

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});
//Srać routery, tak se dodam i też działa
//app.get('/admin', function(req, res) {
//	res.send('Hello World!');
//});
eventHandler(io);