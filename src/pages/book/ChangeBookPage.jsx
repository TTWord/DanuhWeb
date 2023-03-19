import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import arrowBackImg from '@/assets/svg/icons/icon-arrow-back-button.svg';
import { instance } from '@/instance';
import { useNavigate, useParams } from 'react-router-dom';

// 생성한 단어장 전송하는 기능
const changeBookName = async (bookId, bookName, navigate) => {
  try {
    const response = await instance.put(`/book/${bookId}`, {
      name: bookName,
    });
    navigate(-1);
  } catch (e) {
    alert('Error!');
  }
};

const getBookName = async (bookId, setBookName) => {
  try {
    const response = await instance.get(`/book/${bookId}`);
    setBookName(response.data.data.name);
  } catch (e) {
    //console.log(e);
  }
};

const CreateBookPage = () => {
  const navigate = useNavigate();
  const bookId = useParams().id;
  const [bookName, setBookName] = useState('');
  const [newBook, setNewBook] = useState('');

  useEffect(() => {
    getBookName(bookId, setBookName);
  }, []);

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
        <HeaderText>단어장 수정하기</HeaderText>
      </BookHeader>

      <CreateContainer>
        <BookNameDiv>단어장 이름</BookNameDiv>
        <BookInputWrapper>
          <BookInput
            placeholder={bookName}
            onChange={e => {
              setNewBook(e.target.value);
            }}
          ></BookInput>
        </BookInputWrapper>
        <CreateButton
          onClick={() => {
            changeBookName(bookId, newBook, navigate);
          }}
        >
          수정
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
