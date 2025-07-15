import React from 'react';
import { FiChevronRight, FiUser, FiLock, FiBell, FiMessageSquare, FiHelpCircle, FiMoon } from 'react-icons/fi';
import colors from '../../assets/Theme';

const SettingPage = () => {
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerText}>Settings</h1>
      </div>
      
      {/* Profile Section */}
      <div style={styles.profileSection}>
        <div style={styles.profileImage}>
          <FiUser size={48} color={colors.textSecondary} />
        </div>
        <div style={styles.profileInfo}>
          <h2 style={styles.profileName}>Your Name</h2>
          <p style={styles.profileStatus}>Hey there! I am using LetsChat</p>
        </div>
      </div>
      
      {/* Settings List */}
      <div style={styles.settingsList}>
        {/* Account */}
        <div style={styles.settingItem}>
          <div style={styles.settingIcon}>
            <FiUser color={colors.primary} size={20} />
          </div>
          <div style={styles.settingText}>
            <h3 style={styles.settingTitle}>Account</h3>
            <p style={styles.settingSubtitle}>Privacy, security, change number</p>
          </div>
          <FiChevronRight color={colors.textSecondary} size={20} />
        </div>
        
        {/* Privacy */}
        <div style={styles.settingItem}>
          <div style={styles.settingIcon}>
            <FiLock color={colors.primary} size={20} />
          </div>
          <div style={styles.settingText}>
            <h3 style={styles.settingTitle}>Privacy</h3>
            <p style={styles.settingSubtitle}>Block contacts, disappearing messages</p>
          </div>
          <FiChevronRight color={colors.textSecondary} size={20} />
        </div>
        
        {/* Notifications */}
        <div style={styles.settingItem}>
          <div style={styles.settingIcon}>
            <FiBell color={colors.primary} size={20} />
          </div>
          <div style={styles.settingText}>
            <h3 style={styles.settingTitle}>Notifications</h3>
            <p style={styles.settingSubtitle}>Message, group & call tones</p>
          </div>
          <FiChevronRight color={colors.textSecondary} size={20} />
        </div>
        
        {/* Chats */}
        <div style={styles.settingItem}>
          <div style={styles.settingIcon}>
            <FiMessageSquare color={colors.primary} size={20} />
          </div>
          <div style={styles.settingText}>
            <h3 style={styles.settingTitle}>Chats</h3>
            <p style={styles.settingSubtitle}>Theme, wallpapers, chat history</p>
          </div>
          <FiChevronRight color={colors.textSecondary} size={20} />
        </div>
        
        {/* Appearance */}
        <div style={styles.settingItem}>
          <div style={styles.settingIcon}>
            <FiMoon color={colors.primary} size={20} />
          </div>
          <div style={styles.settingText}>
            <h3 style={styles.settingTitle}>Appearance</h3>
            <p style={styles.settingSubtitle}>Theme, font size</p>
          </div>
          <FiChevronRight color={colors.textSecondary} size={20} />
        </div>
        
        {/* Help */}
        <div style={styles.settingItem}>
          <div style={styles.settingIcon}>
            <FiHelpCircle color={colors.primary} size={20} />
          </div>
          <div style={styles.settingText}>
            <h3 style={styles.settingTitle}>Help</h3>
            <p style={styles.settingSubtitle}>Help center, contact us, privacy policy</p>
          </div>
          <FiChevronRight color={colors.textSecondary} size={20} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: colors.background,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  header: {
    padding: '16px 24px',
    backgroundColor: colors.card,
    borderBottom: `1px solid ${colors.border}`,
  },
  headerText: {
    fontSize: '20px',
    fontWeight: '600',
    color: colors.textPrimary,
    margin: 0,
  },
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    padding: '24px',
    backgroundColor: colors.card,
    borderBottom: `1px solid ${colors.border}`,
    cursor: 'pointer',
  },
  profileImage: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: colors.accent,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: '18px',
    fontWeight: '600',
    color: colors.textPrimary,
    margin: '0 0 4px 0',
  },
  profileStatus: {
    fontSize: '14px',
    color: colors.textSecondary,
    margin: 0,
  },
  settingsList: {
    flex: 1,
    overflowY: 'auto',
    padding: '8px 0',
  },
  settingItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: colors.card,
    borderBottom: `1px solid ${colors.border}`,
    cursor: 'pointer',
  },
  settingIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: `${colors.accent}40`, // 40% opacity
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: colors.textPrimary,
    margin: '0 0 4px 0',
  },
  settingSubtitle: {
    fontSize: '14px',
    color: colors.textSecondary,
    margin: 0,
  },
};

export default SettingPage;