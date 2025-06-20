import { useEffect } from "react";
import { initSocketConnection, disconnectSocket } from "../socket";


const useSocket = (user) => {
    useEffect(() => {
        if(!user) return;
        initSocketConnection(user);
        return () => {
            disconnectSocket();
        };
    }, [user]);
};

export default useSocket;