import AuthPage from '@/pages/auth/AuthPage';
import AuthCodePage from '@/pages/auth/join/AuthCodePage';
import JoinPage from '@/pages/auth/join/JoinPage';
import WelcomePage from '@/pages/auth/join/WelcomePage';
import LoginPage from '@/pages/auth/LoginPage';
import OAuthPage from '@/pages/auth/OAuthPage';
import { Route, Routes } from 'react-router-dom';

const AuthRouter = () => {
  return (
    <Routes>
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
    </Routes>
  );
};

export default AuthRouter;
