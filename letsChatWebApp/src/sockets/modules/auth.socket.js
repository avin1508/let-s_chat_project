import { getSocket } from "../socket";



let listenersBound = false;
export const setUpAuthSocket = () => {

    console.log("auth socket initialized");

    const socket = getSocket();

    if(!socket || listenersBound) return;

    listenersBound = true;

    socket.on('session-created', sessionId => {
        window.dispatchEvent(new CustomEvent('session-created', { detail: sessionId }));
    });

    socket.on('authenticated', ({user, token}) => {
        window.dispatchEvent(new CustomEvent('authenticated', { detail: {user, token} }));
    });

}


export const requestSession = () => {
    const socket = getSocket();
    if(!socket){
        console.warn("⚠️ No socket found in requestSession()");
        return
    }
    console.log("📤 Emitting create-session to backend...");
    socket.emit('create-session');
}