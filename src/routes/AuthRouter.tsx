import { Route, Routes, useLocation } from 'react-router-dom';
import RouteTransition from './RouteTransition';
import RouteTransitionWrapper from './RouteTransitionWrapper';
import AuthPage from '@/pages/auth/Auth/AuthPage';
import OAuthPage from '@/pages/auth/oauth/OAuth/OAuthPage';
import LoginPage from '@/pages/auth/login/Login/LoginPage';
import NicknameSubmitPage from '@/pages/auth/join/NicknameSubmit/NicknameSubmitPage';
import JoinPage from '@/pages/auth/join/Join/JoinPage';
import AuthCodePage from '@/pages/auth/join/AuthCode/AuthCodePage';
import WelcomePage from '@/pages/auth/join/Welcome/WelcomePage';

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

          {/* 닉네임 입력 페이지 */}
          <Route path={'/join'} element={<NicknameSubmitPage />} />

          {/* 회원 정보 입력 페이지 */}
          <Route path={'/join/info'} element={<JoinPage />} />

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
