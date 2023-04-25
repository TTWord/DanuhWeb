import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImg from '@/assets/svg/logos/logo-TTWord.svg';

const StartPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/auth');
    }, 3000);
  }, []);

  return (
    <MainWrapper>
      <LogoImg src={logoImg} alt="logoImage"></LogoImg>
      <IntroText>이미지, PDF, 글을 단어장을 만들자!</IntroText>
    </MainWrapper>
  );
};

export default StartPage;

//스타일 정의
const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f3f0fb;
`;

const LogoImg = styled.img`
  width: 180px;
  margin-bottom: 13px;
`;

const IntroText = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #6b6c76;
`;
