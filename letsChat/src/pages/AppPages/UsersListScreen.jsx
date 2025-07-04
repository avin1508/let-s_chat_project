import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  StatusBar,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../Constants/Theme';

import { useDispatch, useSelector } from 'react-redux';
import { getUserChats } from '../../reduxToolkit/slices/ChatSLice';

const UsersListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [chats, setChats] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  

  useEffect(() => {
    dispatch(getUserChats());
  }, []);

  const { userChats, userChatsLoading, userChatsError } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.auth);
  const currentUserId = user?.data?.userId;

  useEffect(() => {
    if (userChats.data) {
      setChats(userChats.data);
    }
  }, [userChats.data]);

  const headerHeight = 80 + StatusBar.currentHeight;

  const getChatName = (chat) => {
    if (chat.isGroupChat) {
      return chat.chatName || "Group Chat";
    } else {
      // Find the other participant (not the current user)
      const otherParticipant = chat.participants.find(
        participant => participant._id !== currentUserId
      );
      return otherParticipant?.name || "Unknown";
    }
  };

  const getAvatar = (chat) => {
    if (chat.isGroupChat) {
      return chat.groupPic || require('../../../assets/unknown.png');
    } else {
      // Find the other participant (not the current user)
      const otherParticipant = chat.participants.find(
        participant => participant._id !== currentUserId
      );
      return otherParticipant?.profilePic 
        ? { uri: otherParticipant.profilePic } 
        : require('../../../assets/unknown.png');
    }
  };

  const getLastMessageInfo = (chat) => {
    if (!chat.lastMessage) return null;
    
    const isCurrentUserSender = chat.lastMessage.sender._id === currentUserId;
    const senderPrefix = isCurrentUserSender ? "You: " : "";
    
    return {
      text: senderPrefix + chat.lastMessage.content,
      time: new Date(chat.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const renderItem = ({ item }) => {
    const lastMessage = getLastMessageInfo(item);
    const isUnread = false; // You can add logic for unread messages
    
    return (
      <TouchableOpacity 
        style={styles.chatItem} 
        onPress={() => navigation.navigate("ChatScreen", { chat: item })}
      >
        <Image 
          source={getAvatar(item)} 
          style={styles.avatar} 
          defaultSource={require('../../../assets/unknown.png')}
        />
        
        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={styles.name} numberOfLines={1}>
              {getChatName(item)}
            </Text>
            {lastMessage && (
              <Text style={styles.time}>
                {lastMessage.time}
              </Text>
            )}
          </View>
          
          {lastMessage ? (
            <View style={styles.messageContainer}>
              <Text 
                style={[styles.lastMessage, isUnread && styles.unreadMessage]} 
                numberOfLines={1}
              >
                {lastMessage.text}
              </Text>
              {isUnread && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadCount}>1</Text>
                </View>
              )}
            </View>
          ) : (
            <Text style={styles.lastMessage} numberOfLines={1}>
              No messages yet
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={[
            styles.header,
            { 
              height: headerHeight,
              paddingTop: StatusBar.currentHeight 
            }
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Image
                source={require('../../../assets/chatLogo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.appName}>Let's Chat</Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="camera" size={20} color={colors.card} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconButton, { marginLeft: 15 }]} onPress={() => navigation.navigate("QrCodeScanner")}>
                <Icon name="qrcode" size={20} color={colors.card} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInput}>
            <Icon 
              name="search" 
              size={16} 
              color={colors.textSecondary} 
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchField}
              placeholder="Search or start new chat"
              placeholderTextColor={colors.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Chat List */}
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContainer}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />

        {/* Floating New Chat Button */}
        <TouchableOpacity 
          style={styles.newChatButton}
          onPress={() => navigation.navigate("NewChat")}
        >
          <Icon name="comment-alt" size={24} color={colors.card} />
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    flex: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    tintColor: colors.card,
  },
  appName: {
    color: colors.card,
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 40,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchField: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    paddingVertical: 0,
  },
  list: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    maxWidth: '80%',
  },
  time: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
    marginRight: 8,
  },
  unreadMessage: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    color: colors.card,
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  newChatButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default UsersListScreen;