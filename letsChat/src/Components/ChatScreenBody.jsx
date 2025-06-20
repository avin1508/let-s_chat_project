import { View, StyleSheet, FlatList, Text } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../Constants/Theme';

const ChatScreenBody = ({ messages }) => {
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
    <FlatList
      data={messages}
      renderItem={renderMessage}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.messagesContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
});

export default ChatScreenBody;