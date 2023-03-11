import React, {useState, useEffect} from "react";
import styled from "styled-components";
import sharingImg from "@/assets/svg/icons/icon-sharing.svg"
import plusImg from "@/assets/svg/icons/icon-plus.svg"
import arrowBackImg from "@/assets/svg/icons/icon-arrow-back-button.svg"

const Book = () => {

  const bookName = "단어장1"

  return (
      <MainWrapper>
        <BookHeader>
          <BackButton><img src={arrowBackImg} alt="arrowBackImg"/></BackButton>
          <HeaderText>{bookName}</HeaderText>
        </BookHeader>
        
        <WordWrapper>
          <WordBox>1</WordBox>
          <WordBox>2</WordBox>
          <WordBox>3</WordBox>
          <WordBox>4</WordBox>
          <WordBox>5</WordBox>
          <WordBox>6</WordBox>
          <WordBox>7</WordBox>
          <WordBox>8</WordBox>
          <WordBox>9</WordBox>
        </WordWrapper>
        <BookFooter>
          <IconWrapper>
            <SharingButton><img src={sharingImg} alt="sharingButton" /></SharingButton>
            <PlusButton><img src={plusImg} alt="sharingButton" /></PlusButton>
          </IconWrapper>
        </BookFooter>
      </MainWrapper>
  );
};

export default Book;

//== 스타일 정의 ==//
//-- 전체 wrapper --//
const MainWrapper = styled.div`
  width: 393px;
  height: 852px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 27px;
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

//-- 단어 --//
const WordWrapper = styled.div`
  width: 100%;
  height: 638px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  overflow-y: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
  div{
    flex: 0 0 auto;
  }
`
const WordBox = styled.div`
  width: 330px;
  height: 100px;
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
`

//-- 아이콘 --//
const BookFooter = styled.div`
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: center;
`
const IconWrapper = styled.div`
  width: 330px;
  display: flex;
  justify-content: end;
  gap: 15px;
`
const Circle = styled.button`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  display: flex;
  align-items: center;
`
const SharingButton = styled(Circle)`
  position: relative;
  background: linear-gradient(180deg, #3A98B6 0%, #50998C 100%);
  img{
    position: absolute;
    left: 13px;
    width: 36px;
    height: 36px;
  }
`
const PlusButton = styled(Circle)`
justify-content: center;
  background: linear-gradient(180deg, #703AB6 0%, #774178 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  img{
    width: 36px;
    height: 36px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
`