import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import sharingImg from '@/assets/svg/icons/icon-sharing.svg';
import plusImg from '@/assets/svg/icons/icon-plus.svg';
import NewWord from './components/NewWord';
import useGetWord from './hooks/useGetWord';
import useGetBookById from '@/pages/book/_id/hooks/useGetBookById';
import useDeleteWord from '@/pages/book/_id/BookDet/hooks/useDeleteWord';
import StackLayout from '@/components/layout/StackLayout';

const BookDetPage = () => {
  const getWord = useGetWord();
  const getBookById = useGetBookById();
  const deleteWord = useDeleteWord();
  const navigate = useNavigate();

  const bookId: any = useParams().id;
  const [bookName, setBookName] = useState<string>('');
  const [words, setWords] = useState([]);

  const getBook = async () => {
    const response = await getWord(bookId);
    setWords(response);
  };

  const getBookNameFunc = async () => {
    const name = await getBookById(bookId);
    setBookName(name);
  };

  useEffect(() => {
    getBookNameFunc();
    getBook();
  }, []);

  const deleteWordFunc = async (wordId: number) => {
    const response = await deleteWord(wordId);
    if (response.status === 'OK') {
      getBook();
    }
  };

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
        {words.map(items => {
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
              // @ts-ignore
              onClick={deleteWordFunc}
            />
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
            <img src={plusImg} alt="plusImg" />
          </PlusButton>
        </IconWrapper>
      </BookFooter>
    </StackLayout>
  );
};

export default BookDetPage;

//== 스타일 정의 ==//
//-- 단어 --//
const BookContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 10px 30px 60px 30px;
  flex-direction: column;
  align-items: center;
  flex: 1;
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
  height: 85px; //
  display: flex;
  justify-content: end;
  background-color: transparent;
`;

const IconWrapper = styled.div`
  width: 330px;
  height: 100%; //
  display: flex;
  justify-content: end;
  gap: 15px;
  background-color: transparent;
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
  right: 99px;
  bottom: 27px;

  img {
    position: absolute;
    left: 13px;
    width: 36px;
    height: 36px;
  }
`;

const PlusButton = styled(Circle)`
  position: fixed;
  right: 26px;
  bottom: 27px;
  justify-content: center;
  background: linear-gradient(180deg, #703ab6 0%, #774178 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  img {
    width: 36px;
    height: 36px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
`;
