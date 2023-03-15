import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from '@/pages/LoginPage';
import AuthCodePage from '@/pages/auth/join/AuthCodePage';
import WelcomePage from '@/pages/auth/join/WelcomePage';
import BookPage from '@/pages/BookPage';
import HomeLayout from '@/components/layout/HomeLayout';

import GenerateBook from '@/pages/book/GenerateBookPage';
import CreateBook from '@/pages/book/CreateBookPage';
import BookDetPage from '@/pages/book/BookDetPage';
import StartPage from '@/pages/StartPage';
import CreateWord from '@/pages/book/CreateWordPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인트로 페이지 */}
        <Route path={'/'} element={<StartPage />} />

        {/* 홈화면 (모바일 하단 메뉴 중 첫번째 메뉴) */}

        {/* 단어장 */}
        <Route
          path={'/book/*'}
          element={
            <Routes>
              {/* Book Page */}
              <Route element={<HomeLayout />}>
                <Route path={'/'} element={<BookPage />} />
              </Route>

              {/* 단어장 생성기 페이지 */}
              <Route path={'/generate'} element={<GenerateBook />} />

              {/* 단어장 만들기 페이지 */}
              <Route path={'/create'} element={<CreateBook />} />

              {/* 단어장 페이지 */}
              <Route path={'/:id'} element={<BookDetPage />} />

              {/* 단어 추가 페이지 */}
              <Route path={'/:id/create'} element={<CreateWord />} />
            </Routes>
          }
        />

        {/* 로그인 & 회원가입 */}
        <Route
          path={'/auth/*'}
          element={
            <Routes>
              {/* 로그인 페이지 */}
              <Route path={'/'} element={<LoginPage />} />

              {/* 인증 코드 입력 페이지 */}
              <Route path={'/join/code'} element={<AuthCodePage />} />

              {/* 회원 가입 후 환영 페이지 */}
              <Route path={'/join/welcome'} element={<WelcomePage />} />
            </Routes>
          }
        />

        {/* 404 */}
        <Route path={'*'} element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
