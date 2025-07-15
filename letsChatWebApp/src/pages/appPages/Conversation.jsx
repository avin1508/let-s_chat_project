import React from 'react';
import { useParams } from 'react-router-dom';
import colors from '../../assets/Theme';

const Conversation = () => {
  const { id } = useParams();

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Conversation with {id}</h2>
      <div style={styles.chatBody}>
        <p>This is where your messages will appear</p>
        {/* You can loop over dummy messages here */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    color: colors.textPrimary,
    padding: '20px',
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    marginBottom: '16px',
  },
  chatBody: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: colors.card,
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 0 4px rgba(0,0,0,0.06)',
  }
};

export default Conversation;
