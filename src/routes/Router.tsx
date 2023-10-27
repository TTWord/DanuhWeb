import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import StartPage from '@/pages/Start/StartPage';
import BookRouter from './BookRouter';
import LearnRouter from './LearnRouter';
import ShareRouter from './ShareRouter';
import AuthRouter from './AuthRouter';
import SettingRouter from './SettingRouter';
import UserRouter from './UserRouter';
import Test from '@/pages/test/Test';
import RouteTransition from './RouteTransition';
import RouteTransitionWrapper from './RouteTransitionWrapper';
import ErrorPage from '@/pages/error/Error/ErrorPage';

const Router = () => {
  return (
    <BrowserRouter>
      <RouterContainer />
    </BrowserRouter>
  );
};

export default Router;

const RouterContainer = () => {
  const location = useLocation();

  return (
    <RouteTransition location={location}>
      <Routes location={location}>
        <Route element={<RouteTransitionWrapper />}>
          {/* 인트로 페이지 */}
          <Route path={'/'} element={<StartPage />} />

          {/* 단어장 */}
          <Route path={'/book/*'} element={<BookRouter />} />

          {/* 학습 (암기 & 퀴즈) */}
          <Route path={'/learn/*'} element={<LearnRouter />} />

          {/* 공유 */}
          <Route path={'/share/*'} element={<ShareRouter />} />

          {/* 로그인 & 회원가입 */}
          <Route path={'/auth/*'} element={<AuthRouter />} />

          {/* 설정 */}
          <Route path={'/setting/*'} element={<SettingRouter />} />

          {/* 유저 */}
          <Route path={'/user/*'} element={<UserRouter />} />

          {/* 스크립트 에러 페이지 */}
          <Route path={'/error'} element={<ErrorPage />} />

          {/* 테스트용 임시 페이지  */}
          <Route path={'/test'} element={<Test />} />

          {/* 404 */}
          <Route path={'*'} element={<div>404</div>} />
        </Route>
      </Routes>
    </RouteTransition>
  );
};
