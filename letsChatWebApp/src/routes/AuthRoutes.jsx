import { Routes, Route, Navigate } from 'react-router-dom';
import QRLogin from '../pages/auth/QRLogin';
import { useSelector } from 'react-redux';

const AuthRoutes = () => {

  const user = useSelector((state) => state.auth.user);



  return (
    <Routes>
      <Route path="qr" element={user ? <Navigate to="/app/chat" replace /> : <QRLogin />} />
    </Routes>
  );
};

export default AuthRoutes;