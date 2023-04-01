import Additional from '@/pages/BookPage/Additional';
import { instance } from '@/instance';
import { useCallback, useEffect, useState } from 'react';
import { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import BookItem from './BookItem';

const HomePage = () => {
  const [books, setBooks] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const { data: response } = await instance.get('/book');

      if (response.status === 'OK') {
        setBooks(response.data);
      }
    };

    getData();
  }, []);

  const onClickUpdate = useCallback(async (bookId: number) => {
    navigate(`/book/${bookId}/change`);
  }, []);

  const onClickRemove = useCallback(async (bookId: number) => {
    const { data: response } = await instance.delete(`/book/${bookId}`);

    if (response.status === 'OK') {
      const getData = async () => {
        const { data: response } = await instance.get('/book');

        if (response.status === 'OK') {
          setBooks(response.data);
        }
      };

      getData();
    }
  }, []);

  const onItemClick = useCallback((bookId: number) => {
    navigate(`/book/${bookId}`);
  }, []);

  return (
    <Container>
      <Items>
        {books.map((book: any) => (
          <BookItem
            key={book.id}
            book={book}
            onItemClick={onItemClick}
            onClickUpdate={onClickUpdate}
            onClickRemove={onClickRemove}
          />
        ))}
      </Items>
      <Additional />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  position: relative;
`;

const Items = styled.div`
  width: 100%;
  padding: 20px 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;
