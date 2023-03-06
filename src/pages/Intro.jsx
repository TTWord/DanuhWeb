import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css, isStyledComponent } from "styled-components";
import logoImg from "@/assets/svg/icons/logo-img.svg"

// 로그인 페이지 주소
const loginPage = "/auth/login";

const Intro = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    setTimeout(() => {navigate(loginPage);}, 3000);
  }, []);

  return (
  <MainWrapper>
    <LogoImg src={logoImg} alt="logoImage"></LogoImg>
    <IntroText>이미지, PDF, 글을 단어장을 만들자!</IntroText>
  </MainWrapper>
  );
};

export default Intro;

//스타일 정의
const MainWrapper = styled.div`
  width: 100%;
  height: 852px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`
const LogoImg = styled.img`
  width: 107px;
  height: 48px;
`
const IntroText = styled.div`
  width: 197px;
  height: 12px;
  font-weight: 300;
  font-size: 12px;
  line-height: 12px;
  color: #5C369A;
`
