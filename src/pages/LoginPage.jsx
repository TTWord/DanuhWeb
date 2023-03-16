import React, { useState } from 'react';
import BackButtonImg from '@/assets/svg/icons/icon-back-button.svg';
import LogoImg from '@/assets/svg/icons/logo-img.svg';
import * as Styled from '@/styles/LoginStyle.jsx';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginPage/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const [isLogin, setLogin] = useState(false);

  const goJoin = () => {
    navigate('/auth/join');
  };

  return (
    <Styled.WebWrapper>
      <Styled.BackButton
        className={isLogin ? 'active' : ''}
        onClick={() => {
          setLogin(current => !current);
        }}
      >
        <img src={BackButtonImg} alt="BackButton" />
      </Styled.BackButton>
      <div>
        <Styled.LoginWrapper active={isLogin}>
          <Styled.LogoImg src={LogoImg} alt="logo-img" />
          <LoginForm isLogin={isLogin} setLogin={setLogin} />
        </Styled.LoginWrapper>
        <Styled.SignInWrapper>
          <Styled.AskAccount>계정이 없으신가요?</Styled.AskAccount>
          <Styled.SignInbutton onClick={goJoin}>회원가입</Styled.SignInbutton>
        </Styled.SignInWrapper>
      </div>
    </Styled.WebWrapper>
  );
};

export default LoginPage;
