import React from 'react';
import { Outlet } from 'react-router-dom';
import ChatList from '../components/ChatList';
import colors from '../assets/Theme';

const ChatLayout = () => {
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <ChatList />
      </div>
      <div style={styles.chatContent}>
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    height: '100vh',
  },
  sidebar: {
    width: '30%',
    borderRight: `1px solid ${colors.border}`,
    overflowY: 'auto',
  },
  chatContent: {
    flex: 1,
    backgroundColor: colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default ChatLayout;
