import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import useLogin from '@/pages/auth/login/Login/hooks/useLogin';
import useSocialLogin from './hooks/useSocialLogin';
import WideButton from '@/components/common/button/WideButton';
import googleIcon from '@/assets/svg/icons/icon-google.svg';
import kakaoIcon from '@/assets/svg/icons/icon-kakao.svg';
import appleIcon from '@/assets/svg/icons/icon-apple.svg';
import useLoginPageNavigate from './hooks/useLoginPageNavigate';

import TopAppBarStack from '@/components/common/header/TopAppBarStack';
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
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onLogin();
        }}
      >
        <TopAppBarStack type="default" navigate="/auth" />
        <Title title="이메일로 로그인" />

        <FormWrapper>
          <FormBox>
            <Span>아이디</Span>
            <InputLogin setEmailId={setEmailId} setDomain={setEmailDomain} />
          </FormBox>

          <FormBox>
            <Span>비밀번호</Span>
            <Input
              type="password"
              placeholder="비밀번호"
              onChange={(pw: string) => setPassword(pw)}
            />
          </FormBox>

          <Join>
            아직 계정이 없으신가요?
            <SignInButton onClick={runJoinPage} type="button">
              회원가입
            </SignInButton>
          </Join>
        </FormWrapper>

        <Footer>
          <SocialWrapper>
            SNS로 로그인하기
            <SocialButtonWrapper>
              <GoogleLogin onClick={googleLogin} type="button">
                <img src={googleIcon} alt="googleIcon" />
              </GoogleLogin>
              <KakaoLogin onClick={kakaoLogin} type="button">
                <img src={kakaoIcon} alt="kakaoIcon" />
              </KakaoLogin>
              <AppleLogin onClick={appleLogin} type="button">
                <img src={appleIcon} alt="appleIcon" />
              </AppleLogin>
            </SocialButtonWrapper>
          </SocialWrapper>
          <WideButton isActive={isOk} onClick={onLogin} type="submit">
            로그인
          </WideButton>
        </Footer>
      </Form>
    </WebWrapper>
  );
};

export default LoginPage;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const FormWrapper = styled.div`
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
  padding: 0 24px;
  padding-bottom: 36px;
`;
