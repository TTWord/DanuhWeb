import BookDetPage from '@/pages/book/_id/BookDet/BookDetPage';
import BookPage from '@/pages/book/Book/BookPage';
import ChangeBookPage from '@/pages/book/_id/ChangeBook/ChangeBookPage';
import CreateBookPage from '@/pages/book/create/CreateBook/CreateBookPage';
import CreateWordPage from '@/pages/book/_id/CreateWord/CreateWordPage';
import GenerateBookPage from '@/pages/book/generate/GenerateBook/GenerateBookPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import RouteTransition from './RouteTransition';
import RouteTransitionWrapper from './RouteTransitionWrapper';
import RootLayout from '@/components/layout/RootLayout';

const BookRouter = () => {
  const location = useLocation();

  return (
    <RouteTransition location={location}>
      <Routes location={location}>
        <Route element={<RouteTransitionWrapper />}>
          {/* Book Page */}
          <Route element={<RootLayout />}>
            <Route path={'/'} element={<BookPage />} />
          </Route>

          {/* 단어장 생성기 페이지 */}
          <Route path={'/generate'} element={<GenerateBookPage />} />

          {/* 단어장 만들기 페이지 */}
          <Route path={'/create'} element={<CreateBookPage />} />

          {/* 단어장 수정하기 페이지 */}
          <Route path={'/:id/change'} element={<ChangeBookPage />} />

          {/* 단어장 페이지 */}
          <Route path={'/:id'} element={<BookDetPage />} />

          {/* 단어 추가 페이지 */}
          <Route path={'/:id/create'} element={<CreateWordPage />} />
        </Route>
      </Routes>
    </RouteTransition>
  );
};

export default BookRouter;
