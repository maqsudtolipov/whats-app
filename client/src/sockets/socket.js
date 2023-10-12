import { io } from 'socket.io-client';

const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'https://whats-app-ktfi.onrender.com';

export const socket = io(URL, {
  autoConnect: false,
});
