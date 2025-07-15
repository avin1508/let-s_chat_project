import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../Layouts/MainLayout';
import ChatLayout from '../Layouts/ChatLayout';
import ChatListGreeting from '../components/ChatListGreeting';
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
        {/* 👇 Default redirect to chats */}
        <Route index element={<Navigate to="chats" />} />

        {/* ✅ Chat layout for chats and chat/:id */}
        <Route path="chats" element={<ChatLayout />}>
          <Route index element={<ChatListGreeting />} />
          <Route path=":id" element={<Conversation />} />
        </Route>

        {/* ✅ These are separate pages */}
        <Route path="status" element={<StatusPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingPage />} />
        <Route path="groups" element={<GroupChats />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
