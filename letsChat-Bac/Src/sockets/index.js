const chatSocket = require('./chat.socket');

module.exports = function socketHandler(io) {
    console.log('Socket.IO Server Initialized ⚡');

    io.on('connection', (socket) => {
        console.log('New User connected: ', socket.id);


        socket.on('userOnline', (data) => {
            console.log('User Online event received:', data);
            // You can add more logic here if needed
        });
        

        // Initialize all socket handlers
        chatSocket(io, socket);

        socket.on('disconnect', () => {
            console.log('❌ User disconnected: ', socket.id);
        });
    });
};