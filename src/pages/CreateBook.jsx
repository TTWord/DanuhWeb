import React, { useEffect, useState } from "react";
import styled  from "styled-components";
import arrowBackImg from "@/assets/svg/icons/icon-arrow-back-button.svg"

const CreateBook = () => {
  return (
    <MainWrapper>
      <BookHeader>
        <BackButton><img src={arrowBackImg} alt="arrowBackImg"/></BackButton>
        <HeaderText>단어장 만들기</HeaderText>
      </BookHeader>

      <CreateContainer>
        <BookNameDiv>단어장 이름</BookNameDiv>
        <BookInputWrapper>
          <BookInput placeholder="단어장 이름을 입력해주세요"></BookInput>
        </BookInputWrapper>
        <CreateButton>생성</CreateButton>
      </CreateContainer>

    </MainWrapper>  
  );
};

export default CreateBook;

//== 스타일 정의 ==/
const MainWrapper = styled.div`
  width: 393px;
  height: 852px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 300px;
  //없앨 CSS
  border: 1px solid black;
`
//-- Header 영역 --//
const BookHeader = styled.div`
  width: 100%;
  height: 75px;
  background: #FFFFFF;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  gap: 12px;
`
const BackButton = styled.button`
  margin-left: 30px;
  width: 36px;
  height: 36px;
`
const HeaderText = styled.div`
  width: 146px;
  height: 24px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: #444444;
`
//-- 단어장 만드는 영역 --//
const CreateContainer = styled.div`
  width: 337px;
  height: 182px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px
`

const BookNameDiv = styled.div`
  width: 123px;
  height: 24px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: #444444;
`
const BookInputWrapper = styled.div`
  width: 337px;
  height: 54px;
  background: #FFFFFF;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;
  align-items: center;
  
`
const BookInput = styled.input`
  width: 194px;
  height: 16px;
  color: black;
  font-size: 16px;
  line-height: 16px;
  ::placeholder{
    color: #9A9A9A;
  }
  text-align: center;
  margin-left: 22px;
`
const CreateButton = styled.button`
  width: 337px;
  height: 72px;
  background: linear-gradient(180deg, #734AE7 0%, #4C2F9C 100%);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  text-align: center;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  color: #FFFFFF;
`