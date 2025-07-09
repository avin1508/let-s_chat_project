import React, { useState } from 'react';
import AppNavStrip from '../components/AppNavStrip';
import colors from '../assets/Theme';

const MainLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      backgroundColor: colors.background
    }}>
      {/* WhatsApp-like navigation strip */}
      <AppNavStrip activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main content area */}
      <div style={{ 
        flex: 1, 
        overflow: 'auto',
        position: 'relative'
      }}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;