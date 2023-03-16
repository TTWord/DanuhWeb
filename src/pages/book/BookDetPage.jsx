import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '@/instance';

import sharingImg from '@/assets/svg/icons/icon-sharing.svg';
import plusImg from '@/assets/svg/icons/icon-plus.svg';
import arrowBackImg from '@/assets/svg/icons/icon-arrow-back-button.svg';

import NewWord from './BookDetPage/NewWord';

const getBook = async (bookId, setWord) => {
  try {
    const response = await instance.get(`/word?book_id=${bookId}`);
    setWord(response.data.data);
    //alert(response.data.message);
  } catch (e) {
    console.log(e);
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

const BookDet = () => {
  const navigate = useNavigate();
  const bookId = useParams().id;
  const [bookName, setBookName] = useState('');
  const [word, setWord] = useState([]); // 변수명 수정 필요

  useEffect(() => {
    getBook(bookId, setWord);
    getBookName(bookId, setBookName);
  }, []);

  // map 함수 돌려서 WordBox에 값 넣기
  // <NewWord word={word} meaning={meaning}/>
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
        <HeaderText>{bookName}</HeaderText>
      </BookHeader>

      <BookContainer>
        {word.map(items => {
          return (
            <NewWord key={items.id} word={items.word} meaning={items.mean} />
          );
        })}
      </BookContainer>

      <BookFooter>
        <IconWrapper>
          <SharingButton>
            <img src={sharingImg} alt="sharingButton" />
          </SharingButton>
          <PlusButton
            onClick={() => {
              navigate(`/book/${bookId}/create`);
            }}
          >
            <img src={plusImg} alt="sharingButton" />
          </PlusButton>
        </IconWrapper>
      </BookFooter>
    </MainWrapper>
  );
};

export default BookDet;

//== 스타일 정의 ==//
//-- 전체 wrapper --//
const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 27px;
`;

//-- Header 영역 --//
const BookHeader = styled.div`
  width: 100%;
  height: 75px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
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

//-- 단어 --//
const BookContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 2px;
  padding-bottom: 30px;
  padding-left: 30px;
  padding-right: 30px;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  div {
    flex: 0 0 auto;
  }
`;
//-- 하단 아이콘 --//
// fixed로 하여 수정 예정
const BookFooter = styled.div`
  width: 100%;
  //height: 85px;
  display: flex;
  justify-content: end;
  background-color: transparent;
  //background-color: rgba( 255, 255, 255, 0.5 );
`;
const IconWrapper = styled.div`
  width: 330px;
  display: flex;
  justify-content: end;
  gap: 15px;
  background-color: transparent;
  //background-color: rgba( 255, 255, 255, 0.5 );
`;
const Circle = styled.button`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  display: flex;
  align-items: center;
`;
const SharingButton = styled(Circle)`
  position: fixed;
  background: linear-gradient(180deg, #3a98b6 0%, #50998c 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  right: 110px;
  bottom: 30px;
  img {
    position: absolute;
    left: 13px;
    width: 36px;
    height: 36px;
  }
`;
const PlusButton = styled(Circle)`
  position: fixed;
  right: 30px;
  bottom: 30px;
  justify-content: center;
  background: linear-gradient(180deg, #703ab6 0%, #774178 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  img {
    width: 36px;
    height: 36px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
`;
