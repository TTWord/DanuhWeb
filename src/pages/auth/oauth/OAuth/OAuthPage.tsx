import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import iconLocal from '@/assets/svg/icons/icon-email.svg';
import iconGoogle from '@/assets/svg/icons/icon-google.svg';
import iconKakao from '@/assets/svg/icons/icon-kakao.svg';
import iconApple from '@/assets/svg/icons/icon-apple-black.svg';
import useSocialLogin from '../../login/Login/hooks/useSocialLogin';
import useNavigatePop from '@/hooks/useNavigatePop';
import TopAppBarClose from '@/components/common/header/TopAppBarClose';
import Title from '@/components/common/header/Title';
import LoginButton from '@/components/common/button/LoginButton';

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

  const goLocalLogin = () => {
    navigate('/auth/login');
  };

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
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
          <LoginButton
            text="이메일 계정으로 로그인"
            img={iconLocal}
            onClick={goLocalLogin}
          />
        );

      case 'google':
        return (
          <LoginButton
            text="구글 계정으로 로그인"
            img={iconGoogle}
            onClick={googleLogin}
          />
        );

      case 'kakao':
        return (
          <LoginButton
            text="카카오 계정으로 로그인"
            img={iconKakao}
            onClick={kakaoLogin}
          />
        );

      case 'apple':
        return (
          <LoginButton
            text="애플 계정으로 로그인"
            img={iconApple}
            onClick={appleLogin}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!message) {
      timeout = setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  switch (message) {
    // 에러 발생 시 출력 되는 화면
    default: {
      return <Error>로그인으로 돌아갑니다...</Error>;
    }

    // 소셜로그인 성공일때는 빈화면 출력
    case 'SUCCESS':
      return <MainWrapper></MainWrapper>;

    // 동일 이메일에 대한 다른 소셜가입이 되어 있을 때
    case 'USER_ALREADY_REGISTERED':
      return (
        <MainWrapper>
          <TopAppBarClose onClose={goLocalLogin} />
          <Title title="이미 만들어진 계정이 있어요" />

          <Center>
            <UserEmail>{email}</UserEmail>
            <Description>
              {'해당 메일 주소는 구글계정으로 가입되어있어요!'}
            </Description>
            <ServiceType />
            <OtherEmailLoginButton onClick={goLocalLogin}>
              {'다른 메일 주소로 회원가입 할게요'}
            </OtherEmailLoginButton>
          </Center>
        </MainWrapper>
      );
  }
};

export default OAuthPage;

const Error = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
`;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
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
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  margin-top: 16px;
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
