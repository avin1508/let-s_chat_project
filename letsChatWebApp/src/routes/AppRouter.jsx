// src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/qr" replace />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/app/*" element={<AppRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
