import { BrowserRouter, Routes, Route } from 'react-router-dom';

import StartPage from '@/pages/Start/StartPage';
import BookRouter from './BookRouter';
import QuizRouter from './QuizRouter';
import ShareRouter from './ShareRouter';
import AuthRouter from './AuthRouter';
import SettingRouter from './SettingRouter';
import UserRouter from './UserRouter';
import RouteTransitionWrapper from './RouteTransitionWrapper';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인트로 페이지 */}
        <Route path={'/'} element={<StartPage />} />

        {/* 단어장 */}
        <Route path={'/book/*'} element={<BookRouter />} />

        {/* 퀴즈 */}
        <Route path={'/quiz/*'} element={<QuizRouter />} />

        {/* 공유 */}
        <Route path={'/share/*'} element={<ShareRouter />} />

        {/* 로그인 & 회원가입 */}
        <Route path={'/auth/*'} element={<AuthRouter />} />

        {/* 설정 */}
        <Route path={'/setting/*'} element={<SettingRouter />} />

        {/* 유저 */}
        <Route path={'/user/*'} element={<UserRouter />} />

        {/* 404 */}
        <Route path={'*'} element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
