// pages/appPages/ChatHome.jsx
import { useNavigate, useParams } from 'react-router-dom';
import colors from '../assets/Theme';

const dummyChats = [
  { id: '1', name: 'Avinash', img: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Rohan', img: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Sneha', img: 'https://i.pravatar.cc/150?u=3' }
];

const ChatList = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // to know which chat is active

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Chats</h3>
      {dummyChats.map(chat => (
        <div
          key={chat.id}
          onClick={() => navigate(`/app/chats/${chat.id}`)}
          style={{
            ...styles.chatItem,
            backgroundColor: id === chat.id ? '#e6f4ff' : 'transparent'
          }}
        >
          <img src={chat.img} alt={chat.name} style={styles.avatar} />
          <span>{chat.name}</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: '0.5rem',
  },
  heading: {
    padding: '1rem',
    margin: 0,
    borderBottom: '1px solid #ddd'
  },
  chatItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #f0f0f0',
    borderRadius: '6px',
    transition: 'background 0.2s',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    objectFit: 'cover'
  }
};

export default ChatList;
