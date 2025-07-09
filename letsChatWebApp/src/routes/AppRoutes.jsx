// // src/routes/AppRoutes.jsx
// import { Routes, Route } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';
// import ChatLayout from '../Layouts/ChatLayout';
// import ChatHome from '../pages/appPages/ChatHome';
// import Conversation from '../pages/appPages/Conversation';
// import StatusPage from '../pages/appPages/StatusPage';
// import SettingPage from '../pages/appPages/SettingPage';
// import ProfilePage from '../pages/appPages/ProfilePage';

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <ChatLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="chat" element={<ChatHome />} />
//         <Route path="chat/:id" element={<Conversation />} />
//         <Route path="status" element={<StatusPage />} />
//         <Route path="setting" element={<SettingPage />} />
//         <Route path="profile" element={<ProfilePage />} />
//       </Route>
//     </Routes>
//   );
// };

// export default AppRoutes;


import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../Layouts/MainLayout';
import ChatHome from '../pages/appPages/ChatHome';
import Conversation from '../pages/appPages/Conversation';
import StatusPage from '../pages/appPages/StatusPage';
import SettingPage from '../pages/appPages/SettingPage';
import ProfilePage from '../pages/appPages/ProfilePage';

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
        <Route path="chat" element={<ChatHome />} />
        <Route path="chat/:id" element={<Conversation />} />
        <Route path="status" element={<StatusPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
