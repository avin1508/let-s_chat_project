const authSocket = require('./auth.socket');
const chatSocket = require('./chat.socket');


module.exports = function socketHandler(io) {
    console.log('Socket.IO Server Initialized ⚡');

    io.on('connection', (socket) => {
        console.log('New User connected: ', socket.id);
        console.log('🆔 Socket ID:', socket.id ?? 'undefined');


        socket.on('userOnline', (data) => {
            console.log('User Online event received:', data);
            // You can add more logic here if needed
        });
        

        // Initialize all socket handlers
        authSocket(io, socket);
        chatSocket(io, socket);

        socket.on('disconnect', () => {
            console.log('❌ User disconnected: ', socket.id);
        });
    });
};