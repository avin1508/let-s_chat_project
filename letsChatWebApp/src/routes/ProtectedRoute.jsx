import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = false;
  return isLoggedIn ? children : <Navigate to="/auth/qr" replace />;
};

export default ProtectedRoute;