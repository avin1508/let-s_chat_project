import { useNavigate } from 'react-router-dom';

const ChatListPanel = () => {
  const navigate = useNavigate();

  const chats = [
    { id: 'sachin', name: 'Sachin', lastMsg: 'Good night', time: '10:00 PM' },
    { id: 'priyanshu', name: 'Priyanshu', lastMsg: 'Hey', time: '9:45 PM' }
  ];

  return (
    <div style={{ 
      width: '320px', 
      backgroundColor: '#111', 
      color: '#fff',
      height: '100%',
      overflowY: 'auto'
    }}>
      {chats.map(chat => (
        <div
          key={chat.id}
          onClick={() => navigate(`/app/chats/${chat.id}`)}
          style={{ 
            padding: '12px', 
            borderBottom: '1px solid #222', 
            cursor: 'pointer',
            ':hover': {
              backgroundColor: '#222'
            }
          }}
        >
          <div style={{ fontWeight: 'bold' }}>{chat.name}</div>
          <div style={{ fontSize: '12px', color: '#aaa' }}>{chat.lastMsg}</div>
          <div style={{ fontSize: '10px', color: '#666', textAlign: 'right' }}>{chat.time}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatListPanel;