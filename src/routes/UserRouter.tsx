import { Route, Routes, useLocation } from 'react-router-dom';
import RouteTransition from './RouteTransition';
import RouteTransitionWrapper from './RouteTransitionWrapper';
import RootLayout from '@/components/layout/RootLayout';
import UserPage from '@/pages/user/User/UserPage';

const UserRouter = () => {
  const location = useLocation();

  return (
    <RouteTransition location={location}>
      <Routes location={location}>
        <Route element={<RouteTransitionWrapper />}>
          {/* 공유 단어장 페이지 */}
          <Route path={'/:id'} element={<UserPage />} />
        </Route>
      </Routes>
    </RouteTransition>
  );
};

export default UserRouter;
