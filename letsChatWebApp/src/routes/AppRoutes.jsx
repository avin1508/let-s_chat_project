// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import ChatLayout from '../Layouts/ChatLayout';
import ChatHome from '../pages/appPages/ChatHome';
import Conversation from '../pages/appPages/Conversation';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ChatLayout />
          </ProtectedRoute>
        }
      >
        <Route path="chat" element={<ChatHome />} />
        <Route path="chat/:id" element={<Conversation />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
