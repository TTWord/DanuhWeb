import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '@/instance';

import sharingImg from '@/assets/svg/icons/icon-sharing.svg';
import plusImg from '@/assets/svg/icons/icon-plus.svg';

import NewWord from './BookDetPage/NewWord';
import useGetWord from './BookDetPage/hooks/useGetWord';
import StackLayout from '@/components/layout/StackLayout';

const BookDetPage = () => {
  const getWord = useGetWord();

  const navigate = useNavigate();
  const bookId = useParams().id;
  const [bookName, setBookName] = useState('');
  const [word, setWord] = useState([]); // 변수명 수정 필요

  const getBook = async () => {
    const response = await getWord(bookId);
    setWord(response);
  };

  const getBookName = async (bookId: any) => {
    try {
      const response = await instance.get(`/book/${bookId}`);
      setBookName(response.data.data.name);
    } catch (e) {
      //console.log(e);
    }
  };

  useEffect(() => {
    getBook();
    getBookName(bookId);
  }, []);

  return (
    <StackLayout
      topBar={{
        isShow: true,
        title: bookName,
        back: {
          isShow: true,
          location: '/book',
        },
      }}
    >
      <BookContainer>
        {word.map(items => {
          return (
            <NewWord
              // @ts-ignore
              key={items.id}
              // @ts-ignore
              wordId={items.id}
              // @ts-ignore
              word={items.word}
              // @ts-ignore
              mean={items.mean}
              getBook={getBook}
            />
          );
        })}
      </BookContainer>

      <BookFooter>
        <IconWrapper>
          <SharingButton
            onClick={async () => {
              // promise 때문에 다시 한번 비동기
              // 검색해보니 promise 전용 함수를 짜거나 비동기로 구현하라고함
              const test = await getWord(bookId);
              console.log(test);
              //console.log(word);
              const wordId = 39;
              // @ts-ignore
              const result = word.filter(item => item.id !== wordId);
              setWord(result);
            }}
          >
            <img src={sharingImg} alt="sharingButton" />
          </SharingButton>
          <PlusButton
            onClick={() => {
              navigate(`/book/${bookId}/create`);
            }}
          >
            <img src={plusImg} alt="plusImg" />
          </PlusButton>
        </IconWrapper>
      </BookFooter>
    </StackLayout>
  );
};

export default BookDetPage;

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
