import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import logoImg from '@/assets/svg//logos/logo-TTWord.svg';

import hatIcon from '@/assets/svg/icons/icon-hat.svg';
import pencilIcon from '@/assets/svg/icons/icon-pencil.svg';
import dogIcon from '@/assets/svg/icons/icon-dog.svg';
import bookIcon from '@/assets/svg/icons/icon-book.svg';
import medalIcon from '@/assets/svg/icons/icon-medal.svg';

import useSocialLogin from './hooks/useSocialLogin';

const AuthPage = () => {
  const navigate = useNavigate();
  const socialLogin = useSocialLogin();

  const goLogin = () => {
    navigate('/auth/login');
  };
  const kakaoLogin = () => {
    socialLogin('kakao');
  };
  const googleLogin = () => {
    socialLogin('google');
  };

  return (
    <WebWrapper>
      <IconWrapper>
        <img src={hatIcon} alt="hatIcon" />
        <img src={pencilIcon} alt="pencilIcon" />
        <img src={dogIcon} alt="dogIcon" />
        <img src={bookIcon} alt="bookIcon" />
        <img src={medalIcon} alt="medalIcon" />
      </IconWrapper>

      <IntroduceWrapper>
        <MainLogo src={logoImg} alt="logoImg" />
        <Introduce>
          빠르고 간편하게<p>회원가입 할 수 있어요!</p>
        </Introduce>
      </IntroduceWrapper>
      <LoginWrapper>
        <KakaoLogin onClick={kakaoLogin}>카카오톡으로 로그인</KakaoLogin>
        <GoogleLogin onClick={googleLogin}>구글 계정으로 로그인</GoogleLogin>
        <AppleLogin>애플 계정으로 로그인</AppleLogin>
        <EmailLogin onClick={goLogin}>이메일로 로그인</EmailLogin>
      </LoginWrapper>
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
  background: #f8f8fc;
`;

const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 132px;
`;

const IntroduceWrapper = styled.div`
  width: 310px;
`;
const MainLogo = styled.img`
  width: 179px;
  height: 48px;
  margin-bottom: 29px;
`;
const Introduce = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 140%;
  color: #2c2d31;
  margin-bottom: 145px;
`;

const LoginWrapper = styled.div`
  width: 100%;
  height: 216px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Login = styled.button`
  width: 312px;
  height: 48px;
  border-radius: 8px;

  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
`;
const KakaoLogin = styled(Login)`
  background-color: #f5e04d;
  border: 1px solid #ffc121;
`;
const GoogleLogin = styled(Login)`
  background-color: #44a5ff;
  border: 1px solid #3797f0;
`;
const AppleLogin = styled(Login)`
  background-color: #2c2d31;
`;
const EmailLogin = styled(Login)`
  background-color: #694ac2;
  border: 1px solid #4928a9;
`;
