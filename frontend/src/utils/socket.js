import io from 'socket.io-client';

const socket = io('http://localhost:8005', {
  transports: ['websocket'],
  // credentials: true,
});

export default socket;
