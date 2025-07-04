// sockets/auth.socket.js
import { getSocket } from './index';

export const emitConfirmSession = ({ sessionId, user, token }) => {
  const socket = getSocket();
  if (!socket || !sessionId || !user || !token) {
    console.warn("⚠️ Missing data for confirm-session");
    return;
  }

  socket.emit('confirm-session', {
    sessionId,
    user,
    token,
  });

  console.log("📤 Emitting confirm-session to backend...");
};
