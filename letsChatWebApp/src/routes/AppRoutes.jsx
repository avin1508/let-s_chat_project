
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../Layouts/MainLayout';
import ChatHome from '../pages/appPages/ChatHome';
import Conversation from '../pages/appPages/Conversation';
import StatusPage from '../pages/appPages/StatusPage';
import SettingPage from '../pages/appPages/SettingPage';
import ProfilePage from '../pages/appPages/ProfilePage';
import GroupChats from '../pages/appPages/GroupChats';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ChatHome />} />
        <Route path="chats" element={<ChatHome />} />
        <Route path="chat/:id" element={<Conversation />} />
        <Route path="status" element={<StatusPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingPage />} />
        <Route path="groups" element={<GroupChats />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
