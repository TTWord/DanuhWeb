import SharingPage from '@/pages/sharing/Sharing/SharingPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import RouteTransition from './RouteTransition';
import RouteTransitionWrapper from './RouteTransitionWrapper';
import RootLayout from '@/components/layout/RootLayout';
import MySharingPage from '@/pages/sharing/mysharing/MySharing/MySharingPage';
import SearchBooksPage from '@/pages/sharing/search/SearchBooks/SearchBooksPage';
import SharingBookPage from '@/pages/sharing/sharingbook/SharingBook/SharingBookPage';

const SharingRouter = () => {
  const location = useLocation();

  return (
    <RouteTransition location={location}>
      <Routes location={location}>
        <Route element={<RouteTransitionWrapper />}>
          {/* 공유 메인 페이지 */}

          <Route element={<RootLayout />}>
            <Route path={'/'} element={<SharingPage />} />
          </Route>

          {/* 내 공유 단어장 목록 페이지 */}
          <Route path={'/mysharing'} element={<MySharingPage />} />

          {/* 검색 페이지 */}
          <Route path={'/search'} element={<SearchBooksPage />} />

          {/* 공유 단어장 페이지 */}
          <Route path={'/sharingbook/:id'} element={<SharingBookPage />} />
        </Route>
      </Routes>
    </RouteTransition>
  );
};

export default SharingRouter;
