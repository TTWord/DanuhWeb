import SharingPage from '@/pages/sharing/Sharing/SharingPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import RouteTransition from './RouteTransition';
import RouteTransitionWrapper from './RouteTransitionWrapper';
import RootLayout from '@/components/layout/RootLayout';

const SharingRouter = () => {
  const location = useLocation();

  return (
    <RouteTransition location={location}>
      <Routes location={location}>
        <Route element={<RouteTransitionWrapper />}>
          {/* 랭킹 메인 페이지 */}

          <Route element={<RootLayout />}>
            <Route path={'/'} element={<SharingPage />} />
          </Route>
        </Route>
      </Routes>
    </RouteTransition>
  );
};

export default SharingRouter;
