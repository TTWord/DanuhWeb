import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import logoImg from '@/assets/svg//logos/logo-TTWord.svg';

import hatIcon from '@/assets/svg/icons/icon-hat.svg';
import pencilIcon from '@/assets/svg/icons/icon-pencil.svg';
import dogIcon from '@/assets/svg/icons/icon-dog.svg';
import bookIcon from '@/assets/svg/icons/icon-book.svg';
import medalIcon from '@/assets/svg/icons/icon-medal.svg';

const AuthPage = () => {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate('/auth/login');
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
        <Introduce>이미지, PDF, 글을 단어장으로 만들자!</Introduce>
      </IntroduceWrapper>

      <LoginWrapper>
        <Login onClick={goLogin}>시작하기</Login>
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
  background: #f8f8fc;
  padding: 0 24px;
`;

const IconWrapper = styled.header`
  width: 100%;
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IntroduceWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MainLogo = styled.img`
  width: 179px;
  margin-bottom: 13px;
`;
const Introduce = styled.span`
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  color: #6b6c76;
  margin-bottom: 145px;
`;

const LoginWrapper = styled.footer`
  width: 100%;
  height: 48px;
  margin-bottom: 80px;
  display: flex;
  justify-content: center;
`;

const Login = styled.button`
  width: 100%;
  height: 100%;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  background-color: #694ac2;
  border: 1px solid #4928a9;
  border-radius: 8px;
`;
