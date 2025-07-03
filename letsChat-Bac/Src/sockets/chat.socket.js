module.exports = (io, socket) => {
    // console.log('Chat socket initialized for socket:', socket.id);
    
    // Implement your chat event handlers here
    socket.on('sendMessage', (messageData) => {

        io.to(messageData.room).emit('receiveMessage', messageData);
    });

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
    });

    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`User ${socket.id} left room ${room}`);
    });
};