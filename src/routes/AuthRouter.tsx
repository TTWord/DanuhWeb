import AuthPage from '@/pages/auth/AuthPage';
import AuthCodePage from '@/pages/auth/join/AuthCodePage';
import JoinPage from '@/pages/auth/join/JoinPage';
import WelcomePage from '@/pages/auth/join/WelcomePage';
import LoginPage from '@/pages/auth/LoginPage';
import OAuthPage from '@/pages/auth/OAuthPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import RouteTransition from './RouteTransition';
import RouteTransitionWrapper from './RouteTransitionWrapper';

const AuthRouter = () => {
  const location = useLocation();

  return (
    <RouteTransition location={location}>
      <Routes location={location}>
        <Route element={<RouteTransitionWrapper />}>
          {/* 로그인 메인 페이지 */}
          <Route path={'/'} element={<AuthPage />} />

          {/* 소셜 로그인 페이지 */}
          <Route path={'/oauth'} element={<OAuthPage />} />

          {/* 이메일 로그인 페이지 */}
          <Route path={'/login'} element={<LoginPage />} />

          {/* 회원가입 페이지 */}
          <Route path={'/join'} element={<JoinPage />} />

          {/* 인증 코드 입력 페이지 */}
          <Route path={'/join/code'} element={<AuthCodePage />} />

          {/* 회원 가입 후 환영 페이지 */}
          <Route path={'/join/welcome'} element={<WelcomePage />} />
        </Route>
      </Routes>
    </RouteTransition>
  );
};

export default AuthRouter;
