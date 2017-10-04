const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const eventHandler = require(__dirname + '/backend/handlers/eventHandler');
let path = require('path');
let indexRouter = require('./backend/routes/index')

server.listen(process.env.PORT || 3000);
console.log('Server running at 127.0.0.1:3000...');

app.use('/', indexRouter);
app.use(express.static(path.resolve(__dirname + '/public')));

eventHandler(io);
