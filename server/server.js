// var express = require('express');

// var app = express();
// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
// var path = require('path');

// app.get('/', function(req,res){
//   res.sendFile(__dirname + "/index.html");
// });

// io.on('connection', function(client){
//   console.log('Client connected...');
// });




// app.listen(8080);
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

// app.get('/bundle.js', function(req,res){
//   console.log('reying to server bundle')
//   var localpath = path.join(__dirname, "..", "client");
//   res.sendFile(localpath + "/bundle.js");
// });

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});



