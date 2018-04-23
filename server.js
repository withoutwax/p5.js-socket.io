let express = require('express');
let socket = require('socket.io');

let app = express();
let server = app.listen(process.env.PORT || 3000);

app.use(express.static('public'));


console.log("My socket server is running");

// Socket.io
let io = socket(server);
io.sockets.on('connection', newConnection);


function newConnection(socket) {
  console.log('new connection ' + socket.id);

  // Receiving data from client
  socket.on('mouse', mouseMsg);

  function mouseMsg(data) {
    // console.log(data);
    socket.broadcast.emit('mouse', data);

    // io.sockets.emit('mouse', data);
  }
}
