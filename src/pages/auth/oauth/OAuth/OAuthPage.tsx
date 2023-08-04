import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import iconLocal from '@/assets/svg/icons/icon-email.svg';
import iconGoogle from '@/assets/svg/icons/icon-google.svg';
import iconKakao from '@/assets/svg/icons/icon-kakao.svg';
import iconApple from '@/assets/svg/icons/icon-apple-black.svg';
import iconClose from '@/assets/svg/icons/icon-close.svg';
import useSocialLogin from '../../login/Login/hooks/useSocialLogin';
import useNavigatePop from '@/hooks/useNavigatePop';

const OAuthPage = () => {
  const location = useLocation();
  const navigate = useNavigatePop();
  const { googleLogin, kakaoLogin, appleLogin } = useSocialLogin();

  const searchParams = new URLSearchParams(location.search);
  const accessToken: string | null = searchParams.get('accesstoken');
  const refreshToken: string | null = searchParams.get('refreshtoken');
  const isMember: string | null = searchParams.get('ismember');
  const isNicknameSet: string | null = searchParams.get('nickname');
  const message: string | null = searchParams.get('message');
  const service: string | null = searchParams.get('service');
  const email: string | null = searchParams.get('email');

  const localLogin = () => {
    navigate('/auth/login');
  };

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem('access_Token', accessToken);
      localStorage.setItem('refresh_Token', refreshToken);
    }

    if (isMember === '1' && isNicknameSet === '1') {
      navigate('/auth/welcome');
    }
    if (isMember === '0' || isNicknameSet === '0') {
      navigate('/auth/oauth/join');
    }
  }, []);

  const ServiceType = () => {
    switch (service) {
      case 'local':
        return (
          <ServiceLoginButton onClick={localLogin}>
            <ServiceLogo src={iconLocal} alt="loginLogo" />
            <ServiceText>이메일 계정으로 로그인</ServiceText>
          </ServiceLoginButton>
        );

      case 'google':
        return (
          <ServiceLoginButton onClick={googleLogin}>
            <ServiceLogo src={iconGoogle} alt="loginLogo" />
            <ServiceText>구글 계정으로 로그인</ServiceText>
          </ServiceLoginButton>
        );

      case 'kakao':
        return (
          <ServiceLoginButton onClick={kakaoLogin}>
            <ServiceLogo src={iconKakao} alt="loginLogo" />
            <ServiceText>카카오 계정으로 로그인</ServiceText>
          </ServiceLoginButton>
        );

      case 'apple':
        return (
          <ServiceLoginButton onClick={appleLogin}>
            <ServiceLogo src={iconApple} alt="loginLogo" />
            <ServiceText>애플 계정으로 로그인</ServiceText>
          </ServiceLoginButton>
        );

      default:
        return null;
    }
  };

  // 소셜로그인 성공일때는 빈화면 출력
  if (message === 'SUCCESS') {
    return <MainWrapper></MainWrapper>;
  }

  return (
    <MainWrapper>
      <Header>
        <CloseImg onClick={localLogin} src={iconClose} alt="close" />
      </Header>

      <TopText>이미 만들어진 계정이 있어요</TopText>

      <Center>
        <UserEmail>{email}</UserEmail>
        <Description>
          {'해당 메일 주소는 구글계정으로 가입되어있어요!'}
        </Description>
        <ServiceType />
        <OtherEmailLoginButton onClick={localLogin}>
          {'다른 메일 주소로 회원가입 할게요'}
        </OtherEmailLoginButton>
      </Center>
    </MainWrapper>
  );
};

export default OAuthPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
`;

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: end;
  margin-top: 24px;
  padding-right: 16px;
  flex-shrink: 0;
`;

const CloseImg = styled.img`
  width: 24px;
  cursor: pointer;
`;

const TopText = styled.div`
  width: 100%;
  height: 50px;
  ${({ theme }) => theme.typography.gmarketSans.md[18]};
  display: flex;
  padding-left: 16px;
  flex-shrink: 0;
`;

const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
  padding-top: 15vh;
`;

const UserEmail = styled.span`
  color: ${({ theme }) => theme.colors.primary.default};
  font-size: 13px;
  font-weight: 700;
`;

const Description = styled.span`
  ${({ theme }) => theme.typography.gmarketSans.md[14]};
  margin-top: 16px;
`;

const ServiceLoginButton = styled.button`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary.default};
  background-color: white;
  margin: 40px 0;
  position: relative;
`;

const ServiceLogo = styled.img`
  width: 24px;
  width: 24px;
  position: absolute;
  left: 12px;
`;

const ServiceText = styled.span`
  ${({ theme }) => theme.typography.gmarketSans.md[12]};
  color: ${({ theme }) => theme.colors.primary.default};
`;

const OtherEmailLoginButton = styled.button`
  color: ${({ theme }) => theme.colors.gray[900]};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
  text-decoration-line: underline;
`;
