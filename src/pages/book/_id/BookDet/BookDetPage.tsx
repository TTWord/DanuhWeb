import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import sharingIcon from '@/assets/svg/icons/icon-share.svg';
import plusIcon from '@/assets/svg/icons/icon-plus.svg';
import NewWord from './components/NewWord';
import useGetWord from './hooks/useGetWord';
import useGetBookById from '@/pages/book/_id/hooks/useGetBookById';
import useDeleteWord from '@/pages/book/_id/BookDet/hooks/useDeleteWord';
import StackLayout from '@/components/layout/StackLayout';
import DetPlus from './components/DetPlus';
import DetShare from './components/DetShare';

const BookDetPage = () => {
  const getWord = useGetWord();
  const getBookById = useGetBookById();
  const deleteWord = useDeleteWord();
  const navigate = useNavigate();

  const bookId: number = Number(useParams().id);
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

  const onClickDeleteWord = async (wordId: number) => {
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
              onClick={onClickDeleteWord}
            />
          );
        })}
      </BookContainer>
      <DetShare />
      <DetPlus bookId={bookId} />
    </StackLayout>
  );
};

export default BookDetPage;

//== 스타일 정의 ==//
//-- 단어 --//
const BookContainer = styled.div`
  width: 100%;
  height: 100%;
  font-family: ${({ theme }) => theme.fonts.pretendard};
  display: flex;
  padding: 8px 0px;
  padding-bottom: 40px;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
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
  position: fixed;
  display: flex;
  justify-content: end;
  background-color: transparent;
`;

const Circle = styled.button`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  & + & {
    //margin-left: 15px;
  }
`;

const SharingButton = styled(Circle)`
  position: fixed;
  background-color: #8ee9f6;
  right: 99px;
  bottom: 27px;
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
