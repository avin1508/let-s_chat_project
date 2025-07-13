import React from 'react';

const WelcomeScreen = () => {
  return (
    <div style={{
      color: 'white',
      fontSize: '24px',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1>Welcome to Chat App</h1>
      <p>Select a chat from the sidebar to start messaging</p>
    </div>
  );
};

export default WelcomeScreen;