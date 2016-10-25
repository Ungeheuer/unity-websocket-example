const express = require('express');
const app = express();

const server = require('http').createServer(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(server);

app.use(express.static('public'));

// client html & javascript
app.get('/', function (reg, res) {
  res.sendFile(__dirname + '/client.html');
});
app.get('/client.js', function (reg, res) {
  res.sendFile(__dirname + '/client.js');
});


// --------------

var store = {};

const allowedObjectNames = [
  'door',
  'light'
];

const updateStatus = function (name) {
  // name is not allowed. returning...
  if (!~allowedObjectNames.indexOf(name)) {
    return;
  }

  if (!store[name]) {
    store[name] = true;
  }
  else {
    store[name] = !store[name];
  }
}

// sockets

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
