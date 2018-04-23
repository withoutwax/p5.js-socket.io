let express = require('express');
let socket = require('socket.io');
let cors = require('cors');

let app = express();


app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});
app.use(express.static('public'));

let server = app.listen(process.env.PORT || 3000, function() {

  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

console.log("My socket server is running");

// Socket.io
let io = socket(server);
io.sockets.on('connection', newConnection);
io.set('origins', '*:*');


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
