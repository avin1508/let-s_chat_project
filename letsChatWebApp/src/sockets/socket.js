import { io } from "socket.io-client";


let socket = null;

export const initSocket  = () => {
  if (!socket){
    socket = io('http://localhost:8080', {
      withCredentials: true,
    });
  }

  socket.on('connect', () => {
    console.log('✅ Connected to socket server:', socket.id);
  });


  socket.on('disconnect', (reason) => {
    console.warn('❌ Disconnected from socket server:', reason);
  });

  socket.on('error', (error) => {
    console.error('❌ Socket error:', error);
  });
} 


export const getSocket = () => {
  if(!socket){
    console.error('Socket is not initialized. Call initSocket() first.');
    return null;
  }
  return socket
}


export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("Socket disconnected.");
    socket = null;
  }
};