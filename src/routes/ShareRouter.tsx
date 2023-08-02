import SharePage from '@/pages/share/Share/SharePage';
import { Route, Routes, useLocation } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout';
import MySharePage from '@/pages/share/mysharing/MySharing/MySharePage';
import SearchBooksPage from '@/pages/share/search/SearchBooks/SearchBooksPage';
import ShareBookDetPage from '@/pages/share/sharebook/ShareBook/ShareBookDetPage';

const ShareRouter = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route element={<RootLayout />}>
        {/* 공유 메인 페이지 */}
        <Route path={'/'} element={<SharePage />} />
        {/* 내 공유 단어장 목록 페이지 */}
        <Route path={'/mysharing'} element={<MySharePage />} />
      </Route>

      {/* 공유 단어장 상세 페이지 */}
      <Route path={'/sharingbook/:id'} element={<ShareBookDetPage />} />

      {/* 검색 페이지 */}
      <Route path={'/search'} element={<SearchBooksPage />} />
    </Routes>
  );
};

export default ShareRouter;
