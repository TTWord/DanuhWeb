import styled, { keyframes } from 'styled-components';

import logoImg from '@/assets/svg/logos/logo-danuh.svg';
import hatIcon from '@/assets/svg/icons/icon-hat.svg';
import pencilIcon from '@/assets/svg/icons/icon-pencil.svg';
import dogIcon from '@/assets/svg/icons/icon-dog.svg';
import bookIcon from '@/assets/svg/icons/icon-book.svg';
import medalIcon from '@/assets/svg/icons/icon-medal.svg';
import { useSetRecoilState } from 'recoil';
import { toastStatus } from '@/components/common/toast/Toast';
import useNavigatePush from '@/hooks/useNavigatePush';

const AuthPage = () => {
  const navigatePush = useNavigatePush();

  // const setToast = useSetRecoilState(toastStatus);

  const goLogin = () => {
    navigatePush('/auth/login');
    // setToast({
    //   isOpen: true,
    //   timer: 2500,
    //   message: '토스트 테스트',
    // });
  };

  return (
    <WebWrapper>
      <IconWrapper>
        <IconBanner>
          <img src={hatIcon} alt="hatIcon" />
          <img src={pencilIcon} alt="pencilIcon" />
          <img src={dogIcon} alt="dogIcon" />
          <img src={bookIcon} alt="bookIcon" />
          <img src={medalIcon} alt="medalIcon" />
        </IconBanner>
        <IconBanner>
          <img src={hatIcon} alt="hatIcon" />
          <img src={pencilIcon} alt="pencilIcon" />
          <img src={dogIcon} alt="dogIcon" />
          <img src={bookIcon} alt="bookIcon" />
          <img src={medalIcon} alt="medalIcon" />
        </IconBanner>
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
  background-color: white;
  overflow: hidden;
`;

// 무한 롤링 배너
const rolling = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const IconWrapper = styled.header`
  width: 200vw;
  margin-top: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${rolling} 10s linear infinite;
`;

const IconBanner = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-around;
`;

const IntroduceWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
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
`;

const LoginWrapper = styled.footer`
  width: 100%;
  height: 48px;
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
  padding: 0 16px;
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
