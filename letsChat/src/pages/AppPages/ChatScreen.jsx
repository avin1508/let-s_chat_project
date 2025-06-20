import { View, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import ChatScreenHeader from '../../Components/ChatScreenHeader';
import ChatWallpaper from '../../../assets/chatback.png';
import ChatScreenBody from '../../Components/ChatScreenBody';
import ChatScreenFooter from '../../Components/ChatScreenFooter';

const ChatScreen = ({ navigation, route }) => {
  const toUser = route.params.user;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    setMessages([
      { id: '1', text: 'Hey there!', sender: 'them', time: '10:30 AM', status: 'read' },
      { id: '2', text: 'Hi! How are you?', sender: 'me', time: '10:31 AM', status: 'delivered' },
      { id: '3', text: 'I\'m good, thanks! 😊', sender: 'them', time: '10:32 AM', status: 'read' },

       { id: '3', text: 'I\'m good, thanks! 😊', sender: 'them', time: '10:32 AM', status: 'read' },
        { id: '3', text: 'I\'m good, thanks! 😊', sender: 'them', time: '10:32 AM', status: 'read' },
         { id: '3', text: 'I\'m good, thanks! 😊', sender: 'them', time: '10:32 AM', status: 'read' },
    ]);
  }, []);

  const handleSend = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ChatScreenHeader user={toUser} navigation={navigation} />
      <ScrollView 
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ImageBackground
          source={ChatWallpaper}
          style={styles.wallpaper}
        >
          <ChatScreenBody messages={messages} />
        </ImageBackground>
      </ScrollView>
      <ChatScreenFooter 
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSend={handleSend}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wallpaper: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 5,
  }
});

export default ChatScreen;