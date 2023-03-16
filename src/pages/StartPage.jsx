import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImg from '@/assets/svg/icons/logo-img.svg';

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
  gap: 12px;
`;
const LogoImg = styled.img`
  width: 107px;
  margin-bottom: 10px;
`;
const IntroText = styled.div`
  font-weight: 300;
  font-size: 12px;
  color: #5c369a;
`;
