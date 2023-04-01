import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImg from '@/assets/svg/icons/logo-img.svg';
import { instance } from '@/instance';

const AuthPage = () => {
  const navigate = useNavigate();

  const requestKakao = async () => {
    const response = await instance.post('/auth/kakao');
    window.location.href = response.data.data.url;
  };

  const goLogin = () => {
    navigate('/auth/login');
  };
  const goJoin = () => {
    navigate('/auth/join');
  };

  return (
    <WebWrapper>
      <Logo src={logoImg} alt="logoImg" />
      <Introduce>이미지, PDF, 글을 단어장으로 만들자!</Introduce>
      <KakaoLogin onClick={requestKakao}>카카오톡으로 로그인</KakaoLogin>
      <GoogleLogin>구글 계정으로 로그인</GoogleLogin>
      <AppleLogin>애플 계정으로 로그인</AppleLogin>
      <EmailLogin onClick={goLogin}>이메일로 로그인</EmailLogin>

      <AskAccount>계정이 없으신가요?</AskAccount>
      <SignInButton onClick={goJoin}>회원가입</SignInButton>

      <FindIdPW>아이디 찾기 / 비밀번호 찾기</FindIdPW>
    </WebWrapper>
  );
};

export default AuthPage;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.img`
  width: 179px;
  height: 48px;
  margin-bottom: 12px;
`;
const Introduce = styled.div`
  font-weight: 300;
  font-size: 12px;
  color: #5c369a;
  margin-bottom: 24px;
`;

const Login = styled.button`
  width: 249px;
  height: 43px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-weight: 300;
  font-size: 16px;
  text-align: center;
  margin-bottom: 12px;
`;
const KakaoLogin = styled(Login)`
  background: #f5e04d;
  color: #333333;
`;
const GoogleLogin = styled(Login)`
  background: #ffffff;
  color: #333333;
`;
const AppleLogin = styled(Login)`
  background: #000000;
  color: #ffffff;
`;
const EmailLogin = styled(Login)`
  background: linear-gradient(180deg, #734ae7 0%, #4f32a2 100%);
  color: white;
`;

const AskAccount = styled.div`
  font-size: 12px;
  margin: 9px 0 8px 0;
  color: #262626;
`;
const SignInButton = styled.button`
  font-size: 12px;
  font-weight: 500;
  font-weight: bold;
  color: #8062b2;
  margin-bottom: 54px;
`;
const FindIdPW = styled.button`
  width: 100%;
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
  color: #000000;
`;
