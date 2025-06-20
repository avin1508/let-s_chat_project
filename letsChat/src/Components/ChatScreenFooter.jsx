import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../Constants/Theme';

const ChatScreenFooter = ({ newMessage, setNewMessage, handleSend }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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

export default ChatScreenFooter;