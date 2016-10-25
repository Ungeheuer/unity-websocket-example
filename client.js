var connection = null;
var connected = false;

function isConnected() {
  return connection !== null && connected;
}

function Connect() {
  // don't connect twice
  if (connection) {
    return;
  }

  connection = io('http://localhost:3000');

  connection.on('connect', function() {
    connected = true;
  });
  connection.on('disconnect', function () {
    connected = false;
  });

  connection.on('event', onEventReceived);
}

function Disconnect() {
  if (!isConnected()) {
    console.log('already disconnected');
    return;
  }

  connection.disconnect();
  connection = null;
}

function sendEvent(dataStr) {
  if (!isConnected()) {
    console.log('not connected');
    return;
  }

  connection.emit('event', dataStr);
}

function onEventReceived(data) {
  console.log('received event', data);
  // send to unity....
  SendMessage('XXX','onEventReceived',JSON.stringify(data));
}
