import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {

  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/auth/qr" replace />;
};

export default ProtectedRoute;