import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import NewWord from './components/BookWord';
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
  const [book, setBook] = useState({
    created_at: '',
    id: 0,
    is_downloaded: false,
    is_sharing: false,
    name: '',
    updated_at: '',
    user_id: 0,
    share_id: 0,
    comment: '',
  });

  const getBook = async () => {
    const response = await getWord(bookId);

    setWords(response);
  };

  const getBookNameFunc = async () => {
    const response = await getBookById(bookId);

    setBook(response);
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

  interface WordParams {
    id: number;
    word: string;
    mean: string;
  }

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

        {words.map((items: WordParams) => {
          return (
            <NewWord
              key={items.id}
              wordId={items.id}
              word={items.word}
              mean={items.mean}
              onClick={onClickDeleteWord}
            />
          );
        })}
      </BookContainer>
      <DetShare book={book} />
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
