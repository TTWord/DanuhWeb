import Additional from '@/pages/book/Book/components/Additional';
import { styled } from 'twin.macro';
import BookItem from '@/pages/book/Book/components/BookItem';
import useBookPageLogic from './hooks/useBookPageLogic';
import danuhLogo from '@/assets/svg/logos/logo-danuh-small.svg';
import emptyIcon from '@/assets/svg/icons/icon-book-empty.svg';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/recoil';

const BookPage = () => {
  const { books, onItemClick, onClickUpdate, onClickRemove } =
    useBookPageLogic();

  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);

  useEffect(() => {
    setActiveMenu(0);
  }, []);

  if (!books) return null;

  return (
    <WebWrapper>
      <Header>
        <div>
          <img src={danuhLogo} alt="logo" />
        </div>
      </Header>

      <Container>
        {books.length === 0 && (
          <EmptyBook>
            <img src={emptyIcon} alt="empty" />
            <span>아직 등록된 단어장이 없어요</span>
            <span>단어장을 추가해주세요</span>
          </EmptyBook>
        )}

        <Items>
          {books.map(book => (
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.header`
  width: 100%;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.primary[200]};
  padding-top: 14px;
  padding-left: 8px;
  div {
    height: 100%;
    overflow: hidden;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const EmptyBook = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin-bottom: 24px;
  }

  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 160%;
    color: ${({ theme }) => theme.colors.gray[500]};
  }
`;

const Items = styled.div`
  width: 100%;
  height: 100%;
  padding: 120px 16px;
  padding: 20px 16px 150px 16px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
