import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import arrowBackImg from '@/assets/svg/icons/icon-arrow-back-button.svg';
import { instance } from '@/instance';
import { useNavigate } from 'react-router-dom';

// 생성한 단어장 전송하는 기능
const createBook = async bookName => {
  const response = await instance.post('', {
    book_name: bookName,
  });
};

const CreateBookPage = () => {
  const navigate = useNavigate();

  const [newBook, setNewBook] = useState('');

  return (
    <MainWrapper>
      <BookHeader>
        <BackButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={arrowBackImg} alt="arrowBackImg" />
        </BackButton>
        <HeaderText>단어장 만들기</HeaderText>
      </BookHeader>

      <CreateContainer>
        <BookNameDiv>단어장 이름</BookNameDiv>
        <BookInputWrapper>
          <BookInput
            placeholder="단어장 이름을 입력해주세요"
            onChange={e => {
              setNewBook(e.target.value);
            }}
          ></BookInput>
        </BookInputWrapper>
        <CreateButton
          onClick={() => {
            //새로 생성한 단어장 전송하는 함수 부분
          }}
        >
          생성
        </CreateButton>
      </CreateContainer>
    </MainWrapper>
  );
};

export default CreateBookPage;

//== 스타일 정의 ==/
const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  flex-shrink: 0;
`;
const BackButton = styled.button`
  margin-left: 30px;
  width: 36px;
  height: 36px;
`;
const HeaderText = styled.div`
  width: 146px;
  height: 24px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: #444444;
`;
//-- 단어장 만드는 영역 --//
const CreateContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding-bottom: 80px;
`;

const BookNameDiv = styled.div`
  width: 123px;
  height: 24px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: #444444;
`;
const BookInputWrapper = styled.div`
  width: 337px;
  height: 54px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;
  align-items: center;
`;
const BookInput = styled.input`
  width: 194px;
  height: 16px;
  color: black;
  font-size: 16px;
  line-height: 16px;
  ::placeholder {
    color: #9a9a9a;
  }
  margin-left: 22px;
`;
const CreateButton = styled.button`
  width: 337px;
  height: 72px;
  background: linear-gradient(180deg, #734ae7 0%, #4c2f9c 100%);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  text-align: center;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  color: #ffffff;
`;
