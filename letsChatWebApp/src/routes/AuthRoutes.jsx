import { Routes, Route, Navigate } from 'react-router-dom';
import QRLogin from '../pages/auth/QRLogin';

const AuthRoutes = () => {
  const isLoggedIn = false;

  return (
    <Routes>
      <Route path="qr" element={isLoggedIn ? <Navigate to="/app/chat" replace /> : <QRLogin />} />
    </Routes>
  );
};

export default AuthRoutes;