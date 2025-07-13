import React from 'react'
import {
  RiChat3Line,
  RiCheckboxCircleLine,
  RiGroupLine,
  RiSettings3Line
} from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import colors from '../assets/Theme';

const AppNavStrip = ({ activeTab, setActiveTab }) => {

  const navigate = useNavigate();

  const tabs = [
    { id: 'chats', name: 'Chats', icon: <RiChat3Line size={22} /> },
    { id: 'status', name: 'Status', icon: <RiCheckboxCircleLine size={22} /> },
    { id: 'groups', name: 'Groups', icon: <RiGroupLine size={22} /> },
  ];


  return (
    <div style={styles.container}>
      {/* top section */}
      <div style={styles.topSection}>
        {tabs.map(tab => (
          <div
            key={tab.id}
            style={{
              ...styles.iconWrapper,
              ...(activeTab === tab.id ? styles.activeIcon : {}),
              ':hover': {
                backgroundColor: colors.accent + '20'
              }
            }}
            onClick={() => {
              setActiveTab(tab.id);
              navigate(`/app/${tab.id}`);
            }}
          >
            {tab.icon}
            {activeTab === tab.id && <div style={styles.activeIndicator} />}
          </div>
        ))}
      </div>

      {/* bottom section */}
      <div style={styles.bottomSection}>
        <div
          style={{
            ...styles.iconWrapper,
            ...(activeTab === 'settings' ? styles.activeIcon : {}),
            ':hover': {
              backgroundColor: colors.accent + '20'
            }
          }}
          onClick={() => {
            setActiveTab('settings');
            navigate(`/app/settings`);
          }}
        >
          <RiSettings3Line size={22} />
          {activeTab === 'settings' && <div style={styles.activeIndicator} />}
        </div>
        <div
          style={{
            ...styles.profileImageWrapper,
            ...(activeTab === 'profile' ? styles.activeActar : {}),
            ':hover': {
              borderColor: colors.primary
            }
          }}
          onClick={() => {
            setActiveTab('profile');
            navigate(`/app/profile`);
          }}
        >
          <img
            src="https://i.pravatar.cc/300"
            alt="User"
            style={styles.profileImage}
          />
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: '70px',
    height: '100vh',
    backgroundColor: colors.card,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderRight: `1px solid ${colors.border}`
  },
  topSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    flex: 1,
    marginTop: '20px',
  },
  bottomSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '20px'
  },
  iconWrapper: {
    color: colors.textSecondary,
    cursor: 'pointer',
    position: 'relative',
    padding: '10px',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
    backgroundColor: colors.accent + '40'
  },
  activeIcon: {
    color: colors.primary,
    
  },
  activeIndicator: {
    position: 'absolute',
    left: '-12px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '24px',
    borderRadius: '4px',
    backgroundColor: colors.primary
  },
  profileImageWrapper: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: `2px solid ${colors.border}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  activeActar: {
    borderWidth: '2px',
    borderColor: colors.primary
  }
}

export default AppNavStrip