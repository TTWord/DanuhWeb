import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import useLogin from '@/pages/auth/login/Login/hooks/useLogin';
import useSocialLogin from './hooks/useSocialLogin';
import FooterButton from '@/components/common/button/FooterButton';
import googleIcon from '@/assets/svg/icons/icon-google.svg';
import kakaoIcon from '@/assets/svg/icons/icon-kakao.svg';
import appleIcon from '@/assets/svg/icons/icon-apple.svg';
import useLoginPageNavigate from './hooks/useLoginPageNavigate';

import TopBar from '@/components/common/header/TopBar';
import Title from '@/components/common/header/Title';
import InputLogin from '@/components/common/input/InputLogin';
import Input from '@/components/common/input/Input';

const LoginPage = () => {
  const login = useLogin();
  const { kakaoLogin, googleLogin, appleLogin } = useSocialLogin();
  const { runAuthPage, runJoinPage } = useLoginPageNavigate();

  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');

  const [password, setPassword] = useState('');

  const [isOk, setIsOk] = useState(false);

  useEffect(() => {
    if (emailId.length > 0 && emailDomain.length > 0 && password.length > 0) {
      setIsOk(true);
    } else {
      setIsOk(false);
    }
  }, [emailId, emailDomain, password]);

  const onLogin = useCallback(() => {
    if (isOk) {
      login(`${emailId}@${emailDomain}`, password);
    }
  }, [isOk, emailId, emailDomain, password, login]);

  return (
    <WebWrapper>
      <TopBar type="default" navigate="/auth" />
      <Title title="이메일로 로그인" />

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }}
      >
        <FormBox>
          <Span>아이디</Span>
          <InputLogin setEmailId={setEmailId} setDomain={setEmailDomain} />
        </FormBox>

        <FormBox>
          <Span>비밀번호</Span>
          <Input
            type="password"
            placeholder="비밀번호1"
            onChange={(pw: string) => setPassword(pw)}
          />
        </FormBox>

        <Join>
          아직 계정이 없으신가요?
          <SignInButton onClick={runJoinPage} type="button">
            회원가입
          </SignInButton>
        </Join>

        <Login type="submit" />
      </Form>

      <Footer>
        <SocialWrapper>
          SNS로 로그인하기
          <SocialButtonWrapper>
            <GoogleLogin onClick={googleLogin}>
              <img src={googleIcon} alt="googleIcon" />
            </GoogleLogin>
            <KakaoLogin onClick={kakaoLogin}>
              <img src={kakaoIcon} alt="kakaoIcon" />
            </KakaoLogin>
            <AppleLogin onClick={appleLogin}>
              <img src={appleIcon} alt="appleIcon" />
            </AppleLogin>
          </SocialButtonWrapper>
        </SocialWrapper>
        <FooterButton isActive={isOk} onClick={onLogin}>
          로그인
        </FooterButton>
      </Footer>
    </WebWrapper>
  );
};

export default LoginPage;

const Login = styled.input`
  display: none;
`;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  width: 100%;
  flex: 1;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #242424;
  margin-bottom: 24px;
`;

const Span = styled.span`
  ${({ theme }) => theme.typography.pretendard.b1.md};
`;

const Join = styled.div`
  width: auto;
  height: auto;
  font-size: 12px;
  margin-top: 8px;
`;

const SignInButton = styled.button`
  line-height: 120%;
  border-bottom: 1px solid;
  font-weight: 700;
  margin-left: 4px;
`;

const SocialWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialButtonWrapper = styled.div`
  width: 176px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 40px 0;
`;

const SocialLogin = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GoogleLogin = styled(SocialLogin)`
  border: 1px solid #e3e6ea;
`;

const KakaoLogin = styled(SocialLogin)`
  background-color: #ffdf37;
`;

const AppleLogin = styled(SocialLogin)`
  background-color: #000000;
`;

const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
