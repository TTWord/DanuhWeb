import { Route, Routes, useLocation } from 'react-router-dom';
import AuthPage from '@/pages/auth/Auth/AuthPage';
import OAuthPage from '@/pages/auth/oauth/OAuth/OAuthPage';
import LoginPage from '@/pages/auth/login/Login/LoginPage';
import NicknameSubmitPage from '@/pages/auth/join/NicknameSubmit/NicknameSubmitPage';
import JoinPage from '@/pages/auth/join/Join/JoinPage';
import AuthCodePage from '@/pages/auth/join/AuthCode/AuthCodePage';
import OAuthJoinPage from '@/pages/auth/oauth/join/Join/OAuthJoinPage';
import OAuthNickname from '@/pages/auth/oauth/join/Nickname/OAuthNickname';
import WelcomePage from '@/pages/auth/welcome/Welcome/WelcomePage';
import PasswordPage from '@/pages/auth/password/Password/PasswordPage';
import PasswordCode from '@/pages/auth/password/PasswordCode/PasswordCode';
import PasswordInitial from '@/pages/auth/password/PasswordInitial/PasswordInitial';

const AuthRouter = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      {/* 로그인 메인 페이지 */}
      <Route path={'/'} element={<AuthPage />} />

      {/* 이메일 로그인 페이지 */}
      <Route path={'/login'} element={<LoginPage />} />

      {/* 소셜 로그인 페이지 */}
      <Route path={'/oauth'} element={<OAuthPage />} />

      {/* 소셜 로그인 페이지 */}
      <Route path={'/oauth/join'} element={<OAuthJoinPage />} />

      {/* 소셜 로그인 페이지 */}
      <Route path={'/oauth/join/nickname'} element={<OAuthNickname />} />

      {/* 비밀번호 찾기 페이지 */}
      <Route path={'/password'} element={<PasswordPage />} />

      {/* 비밀번호 찾기 페이지 */}
      <Route path={'/password/code'} element={<PasswordCode />} />

      {/* 비밀번호 찾기 페이지 */}
      <Route path={'/password/initial'} element={<PasswordInitial />} />

      {/* 닉네임 입력 페이지 */}
      <Route path={'/join'} element={<NicknameSubmitPage />} />

      {/* 회원 정보 입력 페이지 */}
      <Route path={'/join/info'} element={<JoinPage />} />

      {/* 인증 코드 입력 페이지 */}
      <Route path={'/join/code'} element={<AuthCodePage />} />

      {/* 로그인 또는 회원가입 후 환영 페이지 */}
      <Route path={'/welcome'} element={<WelcomePage />} />
    </Routes>
  );
};

export default AuthRouter;
