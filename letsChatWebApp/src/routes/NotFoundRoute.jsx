import { Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';

const NotFoundRoute = () => {
  return <Route path="*" element={<NotFound />} />;
};

export default NotFoundRoute;
