import React from 'react';
import { 
  RiChat3Line, 
  RiCheckboxCircleLine, 
  RiUser3Line,
  RiMore2Line 
} from 'react-icons/ri';
import colors from '../assets/Theme';

const AppNavStrip = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'chat', label: 'Chats', icon: <RiChat3Line size={20} /> },
    { id: 'status', label: 'Status', icon: <RiCheckboxCircleLine size={20} /> },
    { id: 'profile', label: 'Profile', icon: <RiUser3Line size={20} /> },
    { id: 'settings', label: 'More', icon: <RiMore2Line size={20} /> }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.tabsContainer}>
        {tabs.map(tab => (
          <div 
            key={tab.id}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            <div style={styles.tabContent}>
              {tab.icon}
              <span style={styles.tabLabel}>{tab.label}</span>
            </div>
            {activeTab === tab.id && <div style={styles.activeIndicator} />}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: colors.primary,
    padding: '8px 0',
    borderBottom: `1px solid ${colors.border}`,
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    position: 'relative',
    color: colors.textSecondary,
    padding: '8px 0',
    cursor: 'pointer',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.2s ease',
  },
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  tabLabel: {
    fontSize: '14px',
    fontWeight: '500',
  },
  activeTab: {
    color: colors.accent,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '50%',
    height: '3px',
    backgroundColor: colors.accent,
    borderRadius: '3px 3px 0 0',
  },
};

export default AppNavStrip;