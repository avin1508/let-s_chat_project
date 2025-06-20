// UsersListScreen.js
import React, { useState } from 'react';
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
import { logOutUser } from '../../reduxToolkit/slices/authSlice';
import { persistor } from '../../reduxToolkit/store';
import { useDispatch } from 'react-redux';

const chatData = [
  { id: '1', name: 'John Doe', lastMessage: 'Hey, how are you?', time: '10:30 AM', unread: 2, avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Alice Smith', lastMessage: 'See you tomorrow!', time: '9:45 AM', unread: 0, avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Mike Johnson', lastMessage: 'Thanks for the help!', time: 'Yesterday', unread: 1, avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Sarah Wilson', lastMessage: '😊 Great idea!', time: 'Yesterday', unread: 3, avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'David Brown', lastMessage: 'Where are you?', time: 'Monday', unread: 0, avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '6', name: 'Emma Davis', lastMessage: 'Let me check...', time: 'Monday', unread: 0, avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: '7', name: 'James Miller', lastMessage: 'Photo sent 📷', time: 'Sunday', unread: 2, avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: '8', name: 'Olivia Taylor', lastMessage: 'See you then!', time: 'Sunday', unread: 0, avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: '9', name: 'William Anderson', lastMessage: 'Okay, got it!', time: 'Saturday', unread: 1, avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: '10', name: 'Sophia Thomas', lastMessage: 'Thanks! ❤️', time: 'Friday', unread: 0, avatar: 'https://i.pravatar.cc/150?img=10' },
];

const UsersListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [chats, setChats] = useState(chatData);
  const [searchQuery, setSearchQuery] = useState('');
  const handleLogout = () => {
    dispatch(logOutUser());
    persistor.purge(); 
  }

  const headerHeight = 80 + StatusBar.currentHeight;

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem} onPress={()=> navigation.navigate("ChatScreen", {user: item})}>
      <Image 
        source={{ uri: item.avatar }} 
        style={styles.avatar} 
      />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text 
            style={[
              styles.lastMessage, 
              item.unread > 0 && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

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
              <TouchableOpacity style={[styles.iconButton, { marginLeft: 15 }]} onPress={handleLogout}>
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
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />

        {/* Floating New Chat Button */}
        <TouchableOpacity style={styles.newChatButton}>
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
  },
  time: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
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
  },
});

export default UsersListScreen;