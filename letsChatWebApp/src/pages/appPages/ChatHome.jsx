import React from 'react';

const ChatHome = () => {
  console.log("this is the home page-===========================");

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f3f4f6', // light gray
      fontFamily: 'Arial, sans-serif',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '30px 40px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    title: {
      fontSize: '32px',
      color: '#1f2937', // dark gray
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: '18px',
      color: '#6b7280', // lighter gray
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to Chat Home</h1>
        <p style={styles.subtitle}>Start chatting wiojfdLKANFJNMDSHDDDDHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHth your friends!</p>
      </div>
    </div>
  );
};

export default ChatHome;
