import styled, { keyframes } from 'styled-components';
import logoImg from '@/assets/svg/logos/logo-danuh.svg';
import useNavigatePush from '@/hooks/useNavigatePush';
import WideButton from '@/components/common/button/WideButton';

const AuthPage = () => {
  const navigatePush = useNavigatePush();

  const goLogin = () => {
    navigatePush('/auth/login');
  };

  return (
    <WebWrapper>
      <Content>
        <IntroduceWrapper>
          <MainLogo src={logoImg} alt="logoImg" />
          {/* <Introduce>이미지, PDF, 글을 단어장으로 만들자!</Introduce> */}
        </IntroduceWrapper>
      </Content>
      <ButtonWrapper>
        <WideButton onClick={goLogin}>시작하기</WideButton>
      </ButtonWrapper>
    </WebWrapper>
  );
};

export default AuthPage;

const fadeIn = keyframes`
  from {
    bottom: -100px;
  }
  to {
    bottom: 0;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  padding: 0 24px 36px;

  animation: ${fadeIn} 300ms ease-in-out;
`;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: hidden;
`;

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
`;

const IntroduceWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 30%;
`;

const MainLogo = styled.img``;

const Introduce = styled.span`
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  color: #6b6c76;
`;
