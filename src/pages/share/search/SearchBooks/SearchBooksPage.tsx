import styled, { css } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import iconBack from '@/assets/svg/icons/icon-back-gray.svg';
import SharingBook from '../../Share/components/SharingBook';
import useGetSharedBooks from '../../Share/hooks/useGetSharedBooks';

const SearchBooksPage = () => {
  const navigate = useNavigate();
  const { isLoading, getSharedBooks } = useGetSharedBooks();
  const [sharedBooks, setSharedBooks] = useState([]);
  const [keyword, setKeyword] = useState('');

  const goBack = () => {
    navigate('/share');
  };

  const onChange = (e: any) => {
    setKeyword(e.target.value);
  };

  const getSharedBooksAPI = async () => {
    const { data: response } = await getSharedBooks(keyword);

    setSharedBooks(response);
  };

  return (
    <MainWrapper>
      <Header>
        <img onClick={goBack} src={iconBack} alt="back" />
        <div>검색</div>
      </Header>

      <Container>
        <SearchWrapper>
          <input
            onChange={onChange}
            type="text"
            placeholder="검색어를 입력하시오"
          />
          <button onClick={getSharedBooksAPI}>🔍</button>
        </SearchWrapper>

        <SharingBookWrapper>
          {sharedBooks.map((book: any, idx) => (
            <SharingBook
              key={idx}
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
    </MainWrapper>
  );
};

export default SearchBooksPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    position: absolute;
    left: 16px;

    :hover {
      cursor: pointer;
    }
  }

  div {
    font-weight: 700;
    font-size: 30px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
`;

const SharingBookWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;
  overflow-y: auto;
  margin-top: 16px;
  padding-bottom: 36px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const SearchWrapper = styled.div`
  width: 100%;
  //height: 56px;
  padding: 16px 16px;
  display: flex;
  align-items: center;
  border: 1px solid black;

  input {
    width: 100%;
    height: 20px;
    outline: none;
    font-size: 16px;
  }
`;
