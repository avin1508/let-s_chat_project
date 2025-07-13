import React, { useState } from 'react';
import AppNavStrip from '../components/AppNavStrip';
import colors from '../assets/Theme';
import { Outlet } from 'react-router-dom'; // ✅ import Outlet

const MainLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      backgroundColor: colors.background
    }}>
      <AppNavStrip activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div style={{ 
        flex: 1, 
        overflow: 'auto',
        position: 'relative'
      }}>
        {/* ✅ Render nested routes */}
        <Outlet >
          {children}
        </Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
