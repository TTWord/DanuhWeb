import styled, { css } from 'styled-components';
import iconBack from '@/assets/svg/icons/icon-back-gray.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/recoil';
import MyShareBookList from './components/MyShareBookList';

const MySharingPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('sharing');

  const [allBooks, setAllBooks] = useState([{}]);
  const [currentBooks, setCurrentBooks] = useState([{}]);

  const getBookAPI = async () => {
    try {
      const { data: response } = await api.book.getBook();

      setAllBooks(response);
      setCurrentBooks(
        response.filter(
          (book: any) => book.is_shared === 1 && book.share_id === 0,
        ),
      );
    } catch (e: unknown) {}
  };

  const filterBySharing = () => {
    setCurrentBooks(
      allBooks.filter(
        (book: any) => book.is_shared === 1 && book.share_id === 0,
      ),
    );
  };

  const filterByDonwload = () => {
    setCurrentBooks(
      allBooks.filter(
        (book: any) => book.is_shared === 0 && book.share_id !== 0,
      ),
    );
  };

  const onClickModeSharing = () => {
    setMode('sharing');
    filterBySharing();
  };

  const onClickModeShared = () => {
    setMode('shared');
    filterByDonwload();
  };

  const goBack = () => {
    navigate('/share');
  };

  useEffect(() => {
    setCurrentBooks([]);
    getBookAPI();
  }, []);

  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);
  useEffect(() => {
    setActiveMenu(2);
  }, []);

  return (
    <MainWrapper>
      <Header>
        <img onClick={goBack} src={iconBack} alt="iconBack" />
        <div>내 공유 단어장 목록</div>
      </Header>

      <Container>
        <ModeWrapper>
          <Mode isSelected={mode === 'sharing'} onClick={onClickModeSharing}>
            공유한
          </Mode>
          <Mode isSelected={mode === 'shared'} onClick={onClickModeShared}>
            공유받은
          </Mode>
        </ModeWrapper>

        <BookWrapper>
          {currentBooks.map((book: any, idx) => (
            <MyShareBookList
              key={idx}
              shareId={book.id}
              bookName={book.name}
              userName={book.nickname}
              updatedDate={book.updated_at}
              view={null}
              download={null}
              recommand={null} // 아직 값 없음
            />
          ))}
        </BookWrapper>
      </Container>
    </MainWrapper>
  );
};
export default MySharingPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.pretendard};
`;

const Header = styled.header`
  width: 100%;
  height: 56px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[500]};

  img {
    position: absolute;
    left: 16px;
    height: 24px;
    :hover {
      cursor: pointer;
    }
  }

  div {
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
  }
`;

const Container = styled.header`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ModeWrapper = styled.button`
  width: 100%;
  height: 56px;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Mode = styled.div<{ isSelected?: boolean }>`
  width: calc((100% - 16px) / 2);
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray[500]};
  color: black;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: white;
      background-color: ${({ theme }) => theme.colors.primary.default};
    `}
`;

const BookWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Book = styled.button`
  width: 100%;
  height: 72px;
  flex-shrink: 0;
  background: #ffffff;
  border: 1px solid #bebebe;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 12px 12px;
  //flex: 1;
  & + & {
    margin-top: 15px;
  }
`;

const BookInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;
`;

const BookName = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #6c6c6c;
`;

const Username = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #666666;
`;

const BookUpdateinfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
`;

const UpdateDate = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 10px;
  color: black;
`;

const SharingInfo = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: black;
`;

const Footer = styled.footer`
  width: 100%;
  height: 48px;
`;
