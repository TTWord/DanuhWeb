import RankingPage from '@/pages/ranking/Ranking/RankingPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import RouteTransition from './RouteTransition';
import RouteTransitionWrapper from './RouteTransitionWrapper';
import RootLayout from '@/components/layout/RootLayout';

const RankRouter = () => {
  const location = useLocation();

  return (
    <RouteTransition location={location}>
      <Routes location={location}>
        <Route element={<RouteTransitionWrapper />}>
          {/* 랭킹 메인 페이지 */}

          <Route element={<RootLayout />}>
            <Route path={'/'} element={<RankingPage />} />
          </Route>
        </Route>
      </Routes>
    </RouteTransition>
  );
};

export default RankRouter;
