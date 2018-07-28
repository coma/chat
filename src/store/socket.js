import io from 'socket.io-client';

const room = window.location.hash.slice(1);
const socket = io(`/?room=${room}`);

socket.on('room', ({ room }) => {
  window.location.hash = room;
});

export default socket;
