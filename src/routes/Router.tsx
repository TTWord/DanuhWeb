import { BrowserRouter, Routes, Route } from 'react-router-dom';

import StartPage from '@/pages/setting/Start/StartPage';
import BookRouter from './BookRouter';
import QuizRouter from './QuizRouter';
import RankRouter from './RankRouter';
import AuthRouter from './AuthRouter';
import SettingRouter from './SettingRouter';
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

        {/* 랭킹 */}
        <Route path={'/ranking/*'} element={<RankRouter />} />

        {/* 로그인 & 회원가입 */}
        <Route path={'/auth/*'} element={<AuthRouter />} />

        {/* 유저 설정 */}
        <Route path={'/setting/*'} element={<SettingRouter />} />

        {/* 404 */}
        <Route path={'*'} element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
