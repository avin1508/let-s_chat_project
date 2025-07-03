import React from 'react';
import { Outlet } from 'react-router-dom';

const ChatLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '25%', backgroundColor: '#f3f4f6', padding: '16px', borderRight: '1px solid #d1d5db' }}>
        <h2>Chats</h2>
        <ul>
          <li>Chat 1</li>
          <li>Chat 2</li>
        </ul>
      </div>
      <div style={{ flex: 1, padding: '16px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default ChatLayout;