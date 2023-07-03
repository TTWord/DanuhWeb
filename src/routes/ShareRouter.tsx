import SharePage from '@/pages/share/Share/SharePage';
import { Route, Routes, useLocation } from 'react-router-dom';
import RouteTransition from './RouteTransition';
import RouteTransitionWrapper from './RouteTransitionWrapper';
import RootLayout from '@/components/layout/RootLayout';
import MySharePage from '@/pages/share/mysharing/MySharing/MySharePage';
import SearchBooksPage from '@/pages/share/search/SearchBooks/SearchBooksPage';
import ShareBookDetPage from '@/pages/share/sharebook/ShareBook/ShareBookDetPage';

const ShareRouter = () => {
  const location = useLocation();

  return (
    <RouteTransition location={location}>
      <Routes location={location}>
        <Route element={<RouteTransitionWrapper />}>
          {/* 공유 메인 페이지 */}

          <Route element={<RootLayout />}>
            <Route path={'/'} element={<SharePage />} />
          </Route>

          {/* 내 공유 단어장 목록 페이지 */}
          <Route element={<RootLayout />}>
            <Route path={'/mysharing'} element={<MySharePage />} />
          </Route>

          {/* 공유 단어장 상세 페이지 */}
          <Route path={'/sharingbook/:id'} element={<ShareBookDetPage />} />

          {/* 검색 페이지 */}
          <Route path={'/search'} element={<SearchBooksPage />} />
        </Route>
      </Routes>
    </RouteTransition>
  );
};

export default ShareRouter;
