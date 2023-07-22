import BookDetPage from '@/pages/book/_id/BookDet/BookDetPage';
import BookPage from '@/pages/book/Book/BookPage';
import ChangeBookPage from '@/pages/book/_id/ChangeBook/ChangeBookPage';
import CreateWordPage from '@/pages/book/_id/CreateWord/CreateWordPage';
import GenerateBookPage from '@/pages/book/generate/GenerateBook/GenerateBookPage';
import ModifyWordPage from '@/pages/book/_id/ModifyWord/ModifyWordPage';
import BookSharingPage from '@/pages/book/_id/BookSharing/BookSharingPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout';

const BookRouter = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      {/* Book Page */}
      <Route element={<RootLayout />}>
        <Route path={'/'} element={<BookPage />} />
      </Route>

      {/* 단어장 생성기 페이지 */}
      <Route path={'/generate'} element={<GenerateBookPage />} />

      {/* 단어장 수정하기 페이지 */}
      <Route path={'/:id/change'} element={<ChangeBookPage />} />

      {/* 단어장 페이지 */}
      <Route path={'/:id'} element={<BookDetPage />} />

      {/* 단어 추가 페이지 */}
      <Route path={'/:id/create'} element={<CreateWordPage />} />

      {/* 단어 수정 페이지 */}
      <Route path={'/:id/modify'} element={<ModifyWordPage />} />

      {/* 단어장 공유 설정 페이지 */}
      <Route path={'/:id/share'} element={<BookSharingPage />} />
    </Routes>
  );
};

export default BookRouter;
