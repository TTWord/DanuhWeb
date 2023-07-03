import styled, { css } from 'styled-components';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetSharedBooks from './hooks/useGetSharedBooks';
import useGetSharedBookByType from './hooks/useGetSharedBookByType';
import SharingBook from './components/SharingBook';

const SharePage = () => {
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);
  const navigate = useNavigate();
  const { isLoading, getSharedBooks } = useGetSharedBooks();
  const getSharedBookByTypeApI = useGetSharedBookByType();
  const [sharedBooks, setSharedBooks] = useState([]);

  const [sortByDownload, setSortByDownload] = useState(false);

  const getSharedBooksAPI = async () => {
    const { data: response } = await getSharedBooks('');

    setSharedBooks(response);
  };

  const getSharedBooksByType = async (type: string, order: string) => {
    const { data: response } = await getSharedBookByTypeApI(type, order);
    setSharedBooks(response);
  };

  useEffect(() => {
    getSharedBooksAPI();
  }, []);

  useEffect(() => {
    setActiveMenu(2);
  }, []);

  //// Functions ////
  const goMySharingBooks = () => {
    navigate('/share/mysharing');
  };

  const goSearchPage = () => {
    navigate('/share/search');
  };

  const onClickSortByDownload = () => {
    setSortByDownload(false);
    getSharedBooksByType('downloaded', 'DESC');
  };

  const onClickSortByInquiry = () => {
    setSortByDownload(true);
    getSharedBooksByType('checked', 'DESC');
  };

  //// Components ////
  return (
    <WebWrapper>
      <Header>
        <Title>Share</Title>
        <Search onClick={goSearchPage}>🔍</Search>
      </Header>

      <Container>
        <MyShraingList onClick={goMySharingBooks}>
          내 공유 단어장 목록
        </MyShraingList>

        <SharingIndex>
          <div>공유 단어장 목록</div>
          <SortType>
            <SortButton
              onClick={onClickSortByDownload}
              isSelected={!sortByDownload}
            >
              인기순
            </SortButton>
            <SortButton
              onClick={onClickSortByInquiry}
              isSelected={sortByDownload}
            >
              조회순
            </SortButton>
          </SortType>
        </SharingIndex>

        <SharingBookWrapper>
          {sharedBooks.map((book: any) => (
            <SharingBook
              key={book.id}
              shareId={book.id}
              bookName={book.book_name}
              userName={book.nickname}
              updatedDate={book.updated_at}
              view={book.checked}
              download={book.downloaded}
              recommand={0} // 아직 값 없음
            />
          ))}
        </SharingBookWrapper>
      </Container>
    </WebWrapper>
  );
};

export default SharePage;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  overflow: hidden;
`;

const Header = styled.header`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
`;

const Search = styled.button`
  width: 24px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MyShraingList = styled.button`
  width: 100%;
  height: 74px;
  background: #d9d9d9;
  border-radius: 5px;
  color: black;
  margin-bottom: 20px;
`;

const SharingIndex = styled.div`
  width: 100%;
  height: 36px;
  border-bottom: solid 1px #ececec;
  display: flex;
  justify-content: space-between;

  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #333333;
  padding-bottom: 4px;
  margin-bottom: 15px;
`;

const SortType = styled.div`
  display: flex;
  align-items: center;
`;

const SortButton = styled.button<{ isSelected?: boolean }>`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: gray;

  & + & {
    margin-left: 10px;
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: black;
    `}
`;

const SharingBookWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 72px;

  ::-webkit-scrollbar {
    display: none;
  }
`;
