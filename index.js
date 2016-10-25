const express = require('express');
const app = express();

const server = require('http').createServer(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(server);

app.get('/', function (reg, res) {
  res.sendFile(__dirname + '/client.html');
});
app.get('/client.js', function (reg, res) {
  res.sendFile(__dirname + '/client.js');
});

io.on('connection', function (socket) {
  console.log('hello');

  socket.on('event', function (msg) {
    console.log('got event', msg);

    socket.emit('event', { bar: 'foo' });
  });

  socket.on('disconnect', function() {
    console.log('by');
    io.emit('someone left... rip');
  });
});

// starting...
server.listen(port);
