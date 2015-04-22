'use strict';

var app = require('express')(),
	http = require('http').Server(app),
	io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log("New connection established!");

	socket.on('play', function(e) {
		console.log('play event...')
		console.log(e);
		socket.broadcast.emit('play', e);
	});

	socket.on('stop', function(e) {
		console.log('stop event...')
		console.log(e);
		socket.broadcast.emit('stop', e);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});