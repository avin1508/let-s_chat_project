import Toast from 'react-native-toast-message';
import { getSocket } from '../index'

export const listenAuthEvents = (navigation) => {
  const socket = getSocket();

  if (!socket) return;

  socket.on('session-confirmed', ({ message }) => {
    Toast.show({
      type: 'success',
      text1: message || "Login successful",
    });

    // 👇 Go back to previous screen
    navigation.goBack();
  });
};
