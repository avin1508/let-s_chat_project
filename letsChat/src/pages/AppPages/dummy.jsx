import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ImageBackground,
  LayoutAnimation
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../Constants/Theme';

const ChatScreen = ({ navigation, route }) => {
  const toUser = route.params.user;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [headerHeight, setHeaderHeight] = useState(0);
  const flatListRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    setMessages([
      { id: '1', text: 'Hey there!', sender: 'them', time: '10:30 AM', status: 'read' },
      { id: '2', text: 'Hi! How are you?', sender: 'me', time: '10:31 AM', status: 'delivered' },
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
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble,
      item.sender === 'me' ? styles.sentMessage : styles.receivedMessage
    ]}>
      <Text style={item.sender === 'me' ? styles.sentMessageText : styles.reciveMessageText}>{item.text}</Text>
      <View style={styles.messageFooter}>
        <Text style={styles.messageTime}>{item.time}</Text>
        {item.sender === 'me' && (
          <Icon 
            name={item.status === 'read' ? 'check-double' : 'check'} 
            size={12} 
            color={item.status === 'read' ? colors.primary : colors.textSecondary} 
            style={styles.statusIcon}
          />
        )}
      </View>
    </View>
  );

  return (
    <ImageBackground 
      source={require('../../../assets/chatback.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Fixed Header */}
        <LinearGradient
          ref={headerRef}
          colors={[colors.primary, colors.secondary]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setHeaderHeight(height + StatusBar.currentHeight);
          }}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-left" size={20} color={colors.card} />
            </TouchableOpacity>
            
            <Image source={{ uri: toUser.avatar }} style={styles.headerAvatar} />
            
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{toUser.name}</Text>
              <Text style={styles.userStatus}>
                {toUser.online ? 'online' : `last seen ${toUser.lastSeen}`}
              </Text>
            </View>
            
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="video" size={20} color={colors.card} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconButton, { marginLeft: 15 }]}>
                <Icon name="phone" size={20} color={colors.card} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Keyboard-aware chat area */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={headerHeight}
        >
          <View style={styles.chatContent}>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={item => item.id}
              contentContainerStyle={[
                styles.messagesContainer,
                { paddingTop: headerHeight + 16, paddingBottom: 16 }
              ]}
              showsVerticalScrollIndicator={false}
              maintainVisibleContentPosition={{
                minIndexForVisible: 0,
                autoscrollToTopThreshold: 10
              }}
              inverted={Platform.OS === 'android'}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
              onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TouchableOpacity style={styles.attachmentButton}>
                  <Icon name="paperclip" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
                
                <TextInput
                  style={styles.input}
                  placeholder="Type a message"
                  placeholderTextColor={colors.placeholder}
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline
                  textAlignVertical="center"
                />
                
                <TouchableOpacity style={styles.cameraButton}>
                  <Icon name="camera" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.sendButton} 
                  onPress={handleSend}
                  disabled={!newMessage}
                >
                  <Icon 
                    name={newMessage ? "paper-plane" : "microphone"} 
                    size={24} 
                    color={newMessage ? colors.primary : colors.textSecondary} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  chatContent: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight,
  },
  backButton: {
    marginRight: 16,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.card,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '600',
  },
  userStatus: {
    color: colors.accent,
    fontSize: 12,
  },
  headerIcons: {
    flexDirection: 'row',
    marginLeft: 16,
  },
  iconButton: {
    padding: 8,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  sentMessage: {
    backgroundColor: colors.card,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  receivedMessage: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  reciveMessageText: {
    color: colors.card,
    fontSize: 16,
    marginBottom: 4,
  },
  sentMessageText: {
    color: colors.textPrimary,
    fontSize: 16,
    marginBottom: 4,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  messageTime: {
    color: colors.accent,
    fontSize: 12,
    marginRight: 4,
  },
  statusIcon: {
    marginLeft: 4,
  },
  inputContainer: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 24,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    maxHeight: 100,
    paddingVertical: 8,
  },
  attachmentButton: {
    marginRight: 8,
  },
  cameraButton: {
    marginLeft: 8,
    marginRight: 12,
  },
  sendButton: {
    padding: 8,
  },
});

export default ChatScreen;