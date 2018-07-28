const Koa = require('koa');
const web = require('koa-static');
const SocketIO = require('socket.io');
const { createServer } = require('http');
const uuid = require('uuid/v4');
const port = process.env.PORT || 5000;
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const server = new Koa();
const http = createServer(server.callback());
const io = SocketIO(http);

io.on('connection', socket => {
  const requestedRoom = socket.handshake.query.room;
  const isValid = uuidRegex.test(requestedRoom);
  const isAvailable = !io.sockets.adapter.rooms[requestedRoom] || io.sockets.adapter.rooms[requestedRoom].length < 2;
  const room = isValid && isAvailable ? requestedRoom : uuid();

  socket.join(room);
  socket.emit('room', { room });
  socket.on('action', payload => {
    socket.broadcast.to(room).emit('action', payload);
  });
});

server.use(web('build'));
http.listen(port);
