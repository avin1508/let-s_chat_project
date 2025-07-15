import React, { useState, useEffect } from 'react';
import AppNavStrip from '../components/AppNavStrip';
import colors from '../assets/Theme';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('chats');

  console.log("=------------------------------------------->",location.pathname);


  useEffect(() => {
    const path = location.pathname;

    if(path.includes('/app/chats') || path === '/app'){
      setActiveTab('chats');
    }
    else if(path.includes('/app/status')){
      setActiveTab('status')
    }
    else if(path.includes('/app/groups')){
      setActiveTab('groups')
    }
    else if(path.includes('/app/settings')){
      setActiveTab('settings');
    }
    else if(path.includes('/app/profile')){
      setActiveTab('profile');
    }
    

  }, [location.pathname]);


  return (
    <div style={styles.container}>
      <AppNavStrip activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: colors.background
  },
  content: {
    flex: 1,
    overflow: 'auto',
    position: 'relative'
  }
};

export default MainLayout;
