import { useEffect } from "react";
import { initSocket } from "../sockets/socket";
import { setupAllSocketModules } from "../sockets/index";


const useSocket = () => {
    useEffect(() => {
        initSocket();
        setupAllSocketModules();
    }, []);
};

export default useSocket