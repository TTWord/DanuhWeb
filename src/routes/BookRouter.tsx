import HomeLayout from '@/components/layout/HomeLayout';
import BookDetPage from '@/pages/book/BookDetPage';
import BookPage from '@/pages/book/BookPage';
import ChangeBookPage from '@/pages/book/ChangeBookPage';
import CreateBookPage from '@/pages/book/CreateBookPage';
import CreateWordPage from '@/pages/book/CreateWordPage';
import GenerateBookPage from '@/pages/book/GenerateBookPage';
import { Route, Routes } from 'react-router-dom';

const BookRouter = () => {
  return (
    <Routes>
      {/* Book Page */}
      <Route element={<HomeLayout />}>
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
    </Routes>
  );
};

export default BookRouter;
