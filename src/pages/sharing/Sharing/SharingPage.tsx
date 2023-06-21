import styled from 'styled-components';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SharingPage = () => {
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveMenu(2);
  }, []);

  //// Functions ////
  const goMySharingBooks = () => {
    navigate('/sharing/mysharing');
  };

  //// Components ////
  const SharingBook = () => {
    return (
      <Book>
        <BookInfo>
          <BookName>단어장 1</BookName>
          <Username>GRIDY</Username>
        </BookInfo>

        <BookUpdateinfo>
          <UpdateDate>3일전 수정</UpdateDate>
          <SharingInfo>
            조회{121} 다운로드{100} 추천{13}
          </SharingInfo>
        </BookUpdateinfo>
      </Book>
    );
  };

  return (
    <WebWrapper>
      <Header>
        <Title>Share</Title>
        <Search>🔍</Search>
      </Header>

      <Container>
        <MyShraingList onClick={goMySharingBooks}>
          내 공유 단어장 목록
        </MyShraingList>

        <SharingIndex>
          <div>공유 단어장 목록</div>
          <SortType>
            <SortButton>인기순</SortButton>
            <SortButton>조회순</SortButton>
          </SortType>
        </SharingIndex>

        <SharingBookWrapper>
          <SharingBook />
          <SharingBook />
          <SharingBook />
          <SharingBook />
          <SharingBook />
          <SharingBook />
          <SharingBook />
          <SharingBook />
          <SharingBook />
          <SharingBook />
        </SharingBookWrapper>
      </Container>
    </WebWrapper>
  );
};

export default SharingPage;

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

const SortButton = styled.button`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #000000;

  & + & {
    margin-left: 10px;
  }
`;

const SharingBookWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;
  padding-bottom: 87px;
`;

const Book = styled.button`
  width: 100%;
  height: 74px;
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
