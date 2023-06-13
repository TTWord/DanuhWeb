import Additional from '@/pages/book/Book/components/Additional';
import { styled } from 'twin.macro';
import BookItem from '@/pages/book/Book/components/BookItem';
import useBookPageLogic from './hooks/useBookPageLogic';

const BookPage = () => {
  const { books, onItemClick, onClickUpdate, onClickRemove } =
    useBookPageLogic();

  if (!books) return null;

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

export default BookPage;

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
