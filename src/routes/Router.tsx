import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Auth from '@/pages/Auth';
import Intro from '@/pages/Intro';
import Account from '@/pages/auth/join/Account';
import Login from '@/pages/auth/Login';
import AuthCode from '@/pages/auth/join/AuthCode';
import Welcome from '@/pages/auth/join/Welcome';
import Home from '@/pages/Home';
import HomeLayout from '@/containers/layout/HomeLayout';

import GenerateBook from '@/pages/GenerateBook';
import CreateBook from '@/pages/CreateBook';
import Book from '@/pages/Book';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인트로 페이지 */}
        <Route path={'/'} element={<Intro />} />

        {/* 로그인 페이지 */}
        <Route path={'/auth/login'} element={<Login />} />

        {/* 회원가입 메인 페이지 */}
        <Route path={'/auth/join/account'} element={<Account />} />

        {/* 인증 코드 입력 페이지 */}
        <Route path={'/auth/join/code'} element={<AuthCode />} />

        {/* 회원 가입 후 환영 페이지 */}
        <Route path={'/auth/join/welcome'} element={<Welcome />} />

        {/* 인트로 후 메인 페이지 */}
        <Route path={'/auth'} element={<Auth />} />

        {/* 홈화면 (모바일 하단 메뉴 중 첫번째 메뉴) */}
        <Route element={<HomeLayout />}>
          <Route path={'/home'} element={<Home />} />
        </Route>

      {/* 화면 구현 테스트를 위해 임시 코드 작성 */}
        {/* 단어장 생성기 페이지 */}
        <Route path={'/auth/book/generate'} element={<GenerateBook />} />

        {/* 단어장 만들기 페이지 */}
        <Route path={'/auth/book/create'} element={<CreateBook />} />

        {/* 단어장 페이지 */}
        <Route path={'/auth/book'} element={<Book />} />

        {/* 404 */}
        <Route path={'*'} element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
