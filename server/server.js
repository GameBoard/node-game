
var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

server.listen(8080);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('someone connected')
  // socket.emit('news', { hello: 'world' });
  socket.on('talk', function (data) {
    console.log(data);
    socket.broadcast.emit('talk', data)
  });
});



