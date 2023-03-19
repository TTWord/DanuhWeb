import React, { useState } from 'react';
import styled from 'styled-components';
import arrowBackImg from '@/assets/svg/icons/icon-arrow-back-button.svg';
import { instance } from '@/instance';
import { useNavigate } from 'react-router-dom';

const generateBook = async (bookName, sentense, navigate) => {
  try {
    const response = await instance.post('/book/generate', {
      name: bookName,
      text: sentense,
    });
    navigate(-1);
  } catch (e) {
    alert('Error');
  }
};

const GenerateBookPage = () => {
  const [textLength, setTextLength] = useState(0);
  const [bookName, setBookName] = useState('');
  const [sentense, setSentense] = useState('');
  const navigate = useNavigate();

  return (
    <MainWrapper>
      <BookHeader>
        <BackButton>
          <img src={arrowBackImg} alt="arrowBackImg" />
        </BackButton>
        <HeaderText>단어장 생성기</HeaderText>
      </BookHeader>

      <BookNameWrapper>
        <BookNameTitle>단어장 이름</BookNameTitle>
        <BookNamingWrapper>
          <BookNaming
            type="text"
            placeholder="단어장 이름"
            onChange={e => {
              setBookName(e.target.value);
            }}
          />
        </BookNamingWrapper>
      </BookNameWrapper>

      <GenerateWrapper>
        <GuideText>현재 단어장 생성기는 영어 to 한국어만 지원합니다.</GuideText>
        <GuideLangWrapper>
          <LangDiv>영어</LangDiv>
          <GuideArrow src={arrowBackImg} alt="arrowBackImg180" />
          <LangDiv>한국어</LangDiv>
        </GuideLangWrapper>

        <SentenceInputWrapper>
          <SentenceInput
            onChange={e => {
              setSentense(e.target.value);
              setTextLength(e.target.value.length);
            }}
            placeholder="영어 문장을 입력해주세요"
            cols={100}
          />
          <CountInput>{textLength}/2000</CountInput>
        </SentenceInputWrapper>
      </GenerateWrapper>

      <GenerateButton
        onClick={() => {
          generateBook(bookName, sentense, navigate);
        }}
      >
        생성하기
      </GenerateButton>
    </MainWrapper>
  );
};
/*
글자수 2000자 넘길 경우 더 이상 입력못하게 or 문장이 잘리게 해야함 or 문장 길다고 경고하며 input 거부
*/

export default GenerateBookPage;

//== 스타일 정의 ==//
//-- 전체 wrapper --//
const MainWrapper = styled.div`
  height: 844px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`;
//-- Header 영역 --//
const BookHeader = styled.div`
  width: 100%;
  height: 75px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  gap: 12px;
`;
const BackButton = styled.button`
  margin-left: 30px;
  width: 36px;
  height: 36px;
`;
const HeaderText = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: #444444;
`;
//-- 단어장 이름 영역 --//
const BookNameWrapper = styled.div`
  width: 330px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const BookNameTitle = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: #444444;
`;
const BookNamingWrapper = styled.div`
  height: 48px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
  display: flex;
  align-items: center;
  position: relative;
`;
const BookNaming = styled.input`
  position: absolute;
  left: 14px;
  font-size: 16px;
`;
//-- 단어장 생성기 영역 --//
const GenerateWrapper = styled.div`
  width: 330px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const GuideText = styled.div`
  height: 12px;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #444444;
`;
const GuideLangWrapper = styled.div`
  width: 100%;
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LangDiv = styled.div`
  width: 140px;
  height: 38px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  color: #444444;
`;
const GuideArrow = styled.img`
  width: 32px;
  height: 32px;
  transform: rotate(180deg);
`;
const SentenceInputWrapper = styled.div`
  width: 330px;
  height: 236px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SentenceInput = styled.textarea`
  width: 302px;
  height: 196px;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: black;
  outline: none;
  ::placeholder {
    color: #c0c0c0;
  }
`;
const CountInput = styled.div`
  width: 302px;
  height: 12px;
  font-size: 12px;
  text-align: right;
`;
//-- 생성하기 버튼 영역 --//
const GenerateButton = styled.button`
  width: 330px;
  height: 54px;
  background: linear-gradient(180deg, #734ae9 0%, #472c94 100%);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  text-align: center;
  margin-top: 3px;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #ffffff;
`;
