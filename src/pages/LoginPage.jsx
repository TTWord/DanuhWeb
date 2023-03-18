import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useLogin from './LoginPage/hooks/useLogin';

import backButtonImg from '@/assets/svg/icons/icon-back-button.svg';
import logoImg from '@/assets/svg/icons/logo-img.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useLogin();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const goBack = () => {
    navigate(-1);
  };

  const goJoin = () => {
    navigate('/auth/join');
  };

  const onChangeUsername = e => {
    setUsername(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  return (
    <WebWrapper>
      <BackButton onClick={goBack}>
        <img src={backButtonImg} alt="backButtonImg" />
      </BackButton>

      <Logo src={logoImg} alt="logoImg" />
      <LoginWrapper>
        <LoginInput
          placeholder="USERNAME"
          type="email"
          onChange={onChangeUsername}
        />
        <LoginInput
          placeholder="PASSWORD"
          type="password"
          onChange={onChangePassword}
        />
      </LoginWrapper>
      <LoginButton
        onClick={() => {
          login(username, password);
        }}
      >
        로그인
      </LoginButton>
      <AskAccount>계정이 없으신가요?</AskAccount>
      <SignInButton onClick={goJoin}>회원가입</SignInButton>
    </WebWrapper>
  );
};

export default LoginPage;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BackButton = styled.button`
  position: fixed;
  top: 23px;
  left: 23px;
  width: 24px;
  height: 24px;
`;
const Logo = styled.img`
  width: 179px;
  height: 48px;
  margin-bottom: 17px;
`;
const LoginWrapper = styled.div`
  width: 248px;
  height: 103px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 17px;
`;
const LoginInput = styled.input`
  height: 46px;
  display: flex;
  align-items: center;
  padding: 17px 0 17px 15px;
  font-size: 12px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
const LoginButton = styled.button`
  width: 249px;
  height: 72px;
  background: linear-gradient(180deg, #734ae7 0%, #4f32a2 100%);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-size: 24px;
  color: white;
  text-align: center;
  margin-bottom: 17px;
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
