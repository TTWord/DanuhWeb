import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImg from '@/assets/svg/logos/logo-danuh.svg';

const StartPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        navigate('/book');
      } else {
        navigate('/auth');
      }
    }, 2000);
  }, []);

  return (
    <MainWrapper>
      <LogoImg src={logoImg} alt="logoImage"></LogoImg>
    </MainWrapper>
  );
};

export default StartPage;

//스타일 정의
const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImg = styled.img`
  position: absolute;
  top: 30%;
`;
