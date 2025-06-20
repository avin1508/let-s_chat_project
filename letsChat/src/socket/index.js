import { io } from "socket.io-client";
import { SOCKET_URL } from "../Constants/apiBase";
import userHandler from "./userHandler";

let socket = null;

export const initSocketConnection = (user) => {
    if (!user || socket) return;


    if (!user._id) {
        console.error("User _id is missing! Cannot connect socket.");
        return;
    }

    if (!user.token) {
        console.error("User token is missing! Cannot connect socket.");
        return;
    }

    socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        auth: {
            token: user.token,
            userId: user._id,
        }
    });

    socket.on('connect', () => {
        console.log("Socket Connected:", socket.id);

        socket.emit('userOnline', {
            userId: user._id,
            token: user.token
        });

        userHandler(socket);
    });

    socket.on('connect_error', (err) => {
        console.log("❌ connect_error:", err.message);
    });

    socket.on('error', (err) => {
        console.log("❌ socket error:", err);
    });
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log("Socket disconnected.");
        socket = null;
    }
};
