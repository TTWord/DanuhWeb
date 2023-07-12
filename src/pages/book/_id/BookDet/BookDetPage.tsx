import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import NewWord from './components/NewWord';
import useGetWord from './hooks/useGetWord';
import useGetBookById from '@/pages/book/_id/hooks/useGetBookById';
import useDeleteWord from '@/pages/book/_id/BookDet/hooks/useDeleteWord';
import StackLayout from '@/components/layout/StackLayout';
import DetPlus from './components/DetPlus';
import DetShare from './components/DetShare';
import EmptyWord from './components/EmptyWord';

const BookDetPage = () => {
  const getWord = useGetWord();
  const getBookById = useGetBookById();
  const deleteWord = useDeleteWord();

  const bookId: number = Number(useParams().id);
  const [bookName, setBookName] = useState('');
  const [words, setWords] = useState([]);
  const [canSharing, setCanSharing] = useState(true);

  const getBook = async () => {
    const response = await getWord(bookId);

    setWords(response);
  };

  const getBookNameFunc = async () => {
    const response = await getBookById(bookId);
    if (response.share_id !== 0) {
      setCanSharing(false);
    }

    setBookName(response.name);
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
        {words.length === 0 && <EmptyWord bookId={bookId} />}

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
      <DetShare canSharing={canSharing} />
      <DetPlus />
    </StackLayout>
  );
};

export default BookDetPage;

const BookContainer = styled.div`
  width: 100%;
  height: 100%;
  font-family: ${({ theme }) => theme.fonts.pretendard};
  display: flex;
  padding: 8px 0px;
  padding-bottom: 40px;
  flex-direction: column;
  align-items: center;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
