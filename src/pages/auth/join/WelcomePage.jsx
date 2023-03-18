import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const signupValues = location.state;
  const userName = signupValues.userNickname;
  const userEmail = signupValues.userEmail;

  // Title 변경
  useEffect(() => {
    document.querySelector('title').innerHTML = 'Welcome';
    setTimeout(() => {
      navigate('/auth/login');
    }, 3000);
  }, []);

  return (
    <MainWrapper>
      <UserNameBox>
        <div>{userName}</div>님,
      </UserNameBox>
      <WelcomeBox>환영합니다</WelcomeBox>
      <UserEmailBox>{userEmail}</UserEmailBox>
    </MainWrapper>
  );
};

export default WelcomePage;

// 스타일 정의
const MainWrapper = styled.div`
  width: 100%;
  height: 852px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 9px;
`;
const UserNameBox = styled.div`
  width: 76px;
  height: 16px;
  font-weight: 300;
  font-size: 16px;
  line-height: 16px;
  color: #333333;
  display: flex;
  flex-direction: row;
  div {
    font-weight: 400;
  }
`;
const WelcomeBox = styled.div`
  width: 116px;
  height: 24px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: #5c369a;
`;
const UserEmailBox = styled.div`
  width: 119px;
  height: 10px;
  font-weight: 300;
  font-size: 10px;
  line-height: 10px;
  color: #333333;
`;