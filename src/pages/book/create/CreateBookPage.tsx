import React, { useState } from 'react';
import styled from 'styled-components';
import arrowBackImg from '@/assets/svg/icons/icon-arrow-back-button.svg';
import { instance } from '@/instance';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import StackLayout from '@/components/layout/StackLayout';

// 생성한 단어장 전송하는 기능
const createBook = async (bookName: string, navigate: NavigateFunction) => {
  try {
    const response = await instance.post('/book', {
      name: bookName,
    });
    navigate(-1);
  } catch (e: unknown) {
    const error = e as AxiosError<{
      message: string;
    }>;
    const errorMessage = error.response?.data?.message;
    Swal.fire({
      icon: 'error',
      title: errorMessage,
    });
  }
};

const CreateBookPage = () => {
  const navigate = useNavigate();

  const [newBook, setNewBook] = useState('');

  return (
    <StackLayout
      topBar={{
        isShow: true,
        title: '단어장 만들기',
        back: {
          isShow: true,
          location: '/book',
        },
      }}
    >
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
            createBook(newBook, navigate);
          }}
        >
          생성
        </CreateButton>
      </CreateContainer>
    </StackLayout>
  );
};

export default CreateBookPage;

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
  padding: 0 22px 0 22px;
`;
const BookInput = styled.input`
  width: 100%;
  color: black;
  font-size: 16px;
  line-height: 16px;
  ::placeholder {
    color: #9a9a9a;
  }
  outline: none;
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
