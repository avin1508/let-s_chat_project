import React from 'react';
import apalogo from '../../assets/chatLogo.png';
import colors from '../../assets/Theme';

const QRLogin = () => {
  return (
    <div style={styles.container}>
      {/* Left Side - Instructions Section */}
      <div style={styles.instructionSection}>
        <div style={styles.contentWrapper}>
          <div style={styles.header}>
            <h1 style={styles.title}>Login with QR Code</h1>
            <p style={styles.subtitle}>Scan the code with your mobile device to login instantly</p>
          </div>
          
          <div style={styles.stepsContainer}>
            <div style={styles.step}>
              <div style={styles.stepNumber}>1</div>
              <div style={styles.stepContent}>
                <h3 style={styles.stepTitle}>Open LetsChat</h3>
                <p style={styles.stepDescription}>Launch the LetsChat app on your mobile device</p>
              </div>
            </div>
            
            <div style={styles.step}>
              <div style={styles.stepNumber}>2</div>
              <div style={styles.stepContent}>
                <h3 style={styles.stepTitle}>Find QR Scanner</h3>
                <p style={styles.stepDescription}>Go to Settings → Tap "Scan QR Code"</p>
              </div>
            </div>
            
            <div style={styles.step}>
              <div style={styles.stepNumber}>3</div>
              <div style={styles.stepContent}>
                <h3 style={styles.stepTitle}>Scan & Login</h3>
                <p style={styles.stepDescription}>Point your camera at this screen to scan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Branding and QR Section */}
      <div style={styles.brandSection}>
        <div style={styles.brandContent}>
          <img src={apalogo} alt="LetsChat Logo" style={styles.logo} />
          <h2 style={styles.brandTitle}>LetsChat</h2>
          <p style={styles.brandSubtitle}>Connect with friends instantly</p>
          
          <div style={styles.qrContainer}>
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=letschat-auth-token" 
              alt="QR Code" 
              style={styles.qrCode}
            />
            <p style={styles.qrHelp}>Scan this QR code with your phone</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  instructionSection: {
    flex: 1,
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    padding: '80px',
    color: colors.background,
    justifyContent: 'center',
  },
  contentWrapper: {
    maxWidth: '500px',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '12px',
    lineHeight: '1.3',
  },
  subtitle: {
    fontSize: '18px',
    opacity: 0.9,
    lineHeight: '1.5',
  },
  stepsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  step: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: colors.accent,
    color: colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '18px',
    flexShrink: 0,
    marginTop: '4px',
  },
  stepContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
  },
  stepDescription: {
    fontSize: '16px',
    opacity: 0.9,
    margin: 0,
    lineHeight: '1.5',
  },
  link: {
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: '500',
  },
  brandSection: {
    flex: 1,
    backgroundColor: colors.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  brandContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  logo: {
    width: '80px',
    height: '80px',
    marginBottom: '16px',
  },
  brandTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: '8px',
  },
  brandSubtitle: {
    fontSize: '16px',
    color: colors.textSecondary,
    marginBottom: '40px',
  },
  qrContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  qrCode: {
    width: '220px',
    height: '220px',
    borderRadius: '12px',
    border: `1px solid ${colors.border}`,
    padding: '8px',
    backgroundColor: colors.card,
  },
  qrHelp: {
    fontSize: '14px',
    color: colors.textSecondary,
  },
}

export default QRLogin;