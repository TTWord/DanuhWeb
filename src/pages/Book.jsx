import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import sharingImg from '@/assets/svg/icons/icon-sharing.svg';
import plusImg from '@/assets/svg/icons/icon-plus.svg';
import arrowBackImg from '@/assets/svg/icons/icon-arrow-back-button.svg';
import checkImg from '@/assets/svg/icons/icon-check-mark.svg';

const getBookURL = 'http://api.tt-word.kr/api/word?book_id=';
const bookID = 1;

const instance = axios.create({ baseURL: 'http://api.tt-word.kr/api' });

const api = {
  getBook: async bookID => {
    const response = await instance.get(`word?book_id=${bookID}`);
    return response;
  },
};

const NewWord = props => {
  return (
    <WordWrapper>
      <WordBox>
        <Word>{props.word}</Word>
        <Meaning>{props.meaning}</Meaning>
      </WordBox>
      <ChekImg src={checkImg} alt="checkImg"></ChekImg>{' '}
      {/* 체크에 관련된 조건 추가할 것 */}
    </WordWrapper>
  );
};

const getBook = async (bookID, setTest) => {
  try {
    const response = await api.getBook(bookID);
    setTest(response.data.data);
    //alert(response.data.message);
  } catch (e) {
    console.log(e);
  }
};

const Book = () => {
  const navigate = useNavigate();
  const word = 'just';
  const meaning = '단지';
  const bookName = '단어장1'; // 메인화면으로 부터 이름 받기
  const [test, setTest] = useState([]);

  useEffect(() => {
    getBook(bookID, setTest);
  }, []);

  console.log(test[0]);
  // map 함수 돌려서 WordBox에 값 넣기
  // <NewWord word={word} meaning={meaning}/>
  return (
    <MainWrapper>
      <BookHeader>
        <BackButton onClick={() => { navigate(-1); }}>
          <img src={arrowBackImg} alt="arrowBackImg" />
        </BackButton>
        <HeaderText>{bookName}</HeaderText>
      </BookHeader>

      <BookContainer>
        {test.map(items => {
          return (
            <NewWord key={items.id} word={items.word} meaning={items.mean} />
          );
        })}

        <NewWord word={word} meaning={meaning} />
        <NewWord word={word} meaning={meaning} />
        <NewWord word={word} meaning={meaning} />
        <NewWord word={word} meaning={meaning} />
        <NewWord word={word} meaning={meaning} />
        <NewWord word={word} meaning={meaning} />
        <NewWord word={word} meaning={meaning} />
        <NewWord word={word} meaning={meaning} />
        <NewWord word={word} meaning={meaning} />
        <NewWord word={word} meaning={meaning} />
        <NewWord word={word} meaning={meaning} />
      </BookContainer>

      <BookFooter>
        <IconWrapper>
          <SharingButton>
            <img src={sharingImg} alt="sharingButton" />
          </SharingButton>
          <PlusButton>
            <img src={plusImg} alt="sharingButton" />
          </PlusButton>
        </IconWrapper>
      </BookFooter>
    </MainWrapper>
  );
};

export default Book;

//== 스타일 정의 ==//
//-- 전체 wrapper --//
const MainWrapper = styled.div`
  width: 100%;
  height: 844px;
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
  gap: 12px;
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
  height: 638px;
  display: flex;
  padding-top: 2px;
  padding-bottom: 27px;
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
const WordWrapper = styled.div`
  width: 100%;
  height: 100px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  display: flex;
  align-items: center;
  position: relative;
`;
const WordBox = styled.div`
  position: absolute;
  left: 29px;
  top: 20px;
  width: auto;
  height: 58px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const Word = styled.div`
  //width: 50px;
  height: 24px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  color: #333333;
`;
const Meaning = styled.div`
  //width: 31px;
  height: 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #333333;
`;
const ChekImg = styled.img`
  position: absolute;
  right: 24px;
  top: 32px;
  width: 36px;
  height: 36px;
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
  position: relative;
  background: linear-gradient(180deg, #3a98b6 0%, #50998c 100%);
  img {
    position: absolute;
    left: 13px;
    width: 36px;
    height: 36px;
  }
`;
const PlusButton = styled(Circle)`
  justify-content: center;
  background: linear-gradient(180deg, #703ab6 0%, #774178 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  img {
    width: 36px;
    height: 36px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
`;
