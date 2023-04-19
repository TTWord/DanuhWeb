import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import useLogin from './LoginPage/hooks/useLogin';

import backButtonImg from '@/assets/svg/icons/icon-back-button.svg';
import logoImg from '@/assets/svg/icons/logo-img.svg';

import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const { register, handleSubmit, watch } = useForm<{
    username: string;
    password: string;
  }>();
  const navigate = useNavigate();
  const login = useLogin();

  const goBack = () => {
    navigate('/auth', { state: { direction: 'navigate-pop' } });
  };

  const goJoin = () => {
    navigate('/auth/join');
  };

  const usernameRef = useRef<HTMLInputElement>(null);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const onSubmit = (data: { username: string; password: string }) => {
    login(data.username, data.password);
  };

  return (
    <WebWrapper>
      <BackButton onClick={goBack}>
        <img src={backButtonImg} alt="backButtonImg" />
      </BackButton>

      <Logo src={logoImg} alt="logoImg" />
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <LoginWrapper>
          <CustomTextBox
            onClick={() => {
              usernameRef?.current?.focus();
            }}
          >
            <Placeholder
              isFocused={usernameFocused || watch('username')?.length > 0}
            >
              USERNAME
            </Placeholder>
            <CustomTextEnter
              type="email"
              {...register('username', {
                required: true,
                onBlur: () => setUsernameFocused(false),
              })}
              onFocus={() => setUsernameFocused(true)}
            />
          </CustomTextBox>
          <CustomTextBox
            onClick={() => {
              passwordRef?.current?.focus();
              setPasswordFocused(true);
            }}
          >
            <Placeholder
              isFocused={passwordFocused || watch('password')?.length > 0}
            >
              PASSWORD
            </Placeholder>
            <CustomTextEnter
              type="password"
              onFocus={() => setPasswordFocused(true)}
              {...register('password', {
                required: true,
                onBlur: () => setPasswordFocused(false),
              })}
            />
          </CustomTextBox>
        </LoginWrapper>
        <LoginButton>로그인</LoginButton>
      </LoginForm>
      <AskAccount>계정이 없으신가요?</AskAccount>
      <SignInButton onClick={goJoin}>회원가입</SignInButton>
    </WebWrapper>
  );
};

export default LoginPage;

const CustomTextBox = styled.div`
  width: 250px;
  height: 46px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  flex-shrink: 0;
  border-radius: 10px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;

  & + & {
    margin-top: 10px;
  }
`;

const Placeholder = styled.div<{
  isFocused: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition: all 0.3s ease-in-out;
  font-size: 11px;
  color: #cccccc;

  ${({ isFocused }) =>
    isFocused &&
    css`
      left: 10px;
      top: 40%;
      color: #8062b2;
      font-size: 10px;
      transform: translateY(-10px);
    `}
`;

const CustomTextEnter = styled.input`
  width: 100%;
  height: 50px;
  border: 0;
  outline: 0;
  box-sizing: border-box;
  padding: 15px 10px 0px;
  font-size: 12px;
`;

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
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 17px;
`;

const LoginButton = styled.button`
  width: 250px;
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
  font-weight: 500;
  font-weight: bold;
  color: #8062b2;
`;

const LoginForm = styled.form``;
