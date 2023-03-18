import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css, isStyledComponent } from 'styled-components';

import logoImg from '@/assets/svg/icons/logo-img.svg';

const AuthPage = () => {
  const navigate = useNavigate();

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
      <EmailLogin onClick={goLogin}>이메일로 로그인</EmailLogin>
      <AskAccount>계정이 없으신가요?</AskAccount>
      <SignInButton onClick={goJoin}>회원가입</SignInButton>
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
  margin-bottom: 28px;
`;
const EmailLogin = styled.button`
  width: 249px;
  height: 43px;
  background: linear-gradient(180deg, #734ae7 0%, #4f32a2 100%);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  text-align: center;
  color: white;
  font-size: 16px;
  margin-bottom: 18px;
`;
const AskAccount = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
  color: #262626;
`;
const SignInButton = styled.button`
  font-size: 12px;
  color: #8062b2;
`;
