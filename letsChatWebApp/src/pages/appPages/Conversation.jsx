import React from 'react';
import { useParams } from 'react-router-dom';

const Conversation = () => {
  const { id } = useParams();
  
  return (
    <div style={{ 
      color: 'white',
      padding: '20px',
      width: '100%',
      height: '100%'
    }}>
      <h2>Conversation with {id}</h2>
      <p>This is where your messages will appear</p>
    </div>
  );
};

export default Conversation;