import Additional from '@/pages/book/Book/components/Additional';
import { styled } from 'twin.macro';
import BookItem from '@/pages/book/Book/components/BookItem';
import useBookPageLogic from './hooks/useBookPageLogic';
import danuhLogo from '@/assets/svg/logos/logo-danuh-small.svg';

const BookPage = () => {
  const { books, onItemClick, onClickUpdate, onClickRemove } =
    useBookPageLogic();

  if (!books) return null;

  return (
    <WebWrapper>
      <Header>
        <img src={danuhLogo} alt="logo" />
      </Header>

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
    </WebWrapper>
  );
};

export default BookPage;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  width: 100%;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.primary[200]};
  padding-top: 14px;
  padding-left: 8px;
  overflow: hidden;
`;

const Container = styled.div`
  width: 100%;
`;

const Items = styled.div`
  width: 100%;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
`;
