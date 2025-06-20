import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../Constants/Theme';

const ChatScreenHeader = ({ user, navigation }) => {
  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color={colors.card} />
        </TouchableOpacity>
        
        <Image source={{ uri: user.avatar }} style={styles.headerAvatar} />
        
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userStatus}>
            {user.online ? 'online' : `last seen ${user.lastSeen}`}
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
  );
};

const styles = StyleSheet.create({
  header: {
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
});

export default ChatScreenHeader;