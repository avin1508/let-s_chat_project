const { v4: uuidv4 } = require('uuid');
const sockets = require('.');
const sessionMap = new Map();

module.exports = (io, socket) => {

    
    //web request session
    socket.on('create-session', () => {
        const sessionId = uuidv4();
        sessionMap.set(sessionId, socket.id);
        socket.emit('session-created', sessionId);
    });

    // mobile confirm session
    socket.on('confirm-session', ({sessionId, user, token}) => {
        const webSocketId = sessionMap.get(sessionId);
        if(webSocketId){
            io.to(webSocketId).emit('authenticated', {user, token});
            sessionMap.delete(sessionId);
            console.log(`Session confirmed: ${sessionId}`);
        }else{
            console.log(`Session not found: ${sessionId}`);
        }
    })
}