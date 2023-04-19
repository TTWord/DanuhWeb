import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import arrowBackImg from '@/assets/svg/icons/icon-arrow-back-button.svg';
import { api } from '@/api';
import useGetMemo from './hooks/useGetMemo';
import Swal from 'sweetalert2';

const FlashCardPage = () => {
  const getMemo = useGetMemo();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState('');

  const CreateBookList = props => {
    const [color, setColor] = useState('#ffffff');
    return (
      <Book
        color={color}
        onClick={() => {
          setPage(props.bookId);
          // 2번 클릭해야 색이 바뀜
          color === '#ffffff' ? setColor('#724fab') : setColor('#ffffff');
        }}
      >
        <div>{props.bookName}</div>
      </Book>
    );
  };

  const getBookList = async () => {
    try {
      const response = await api.book.getBook();

      if (response.data.status === 'OK') {
        setBooks(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBookList();
  }, []);

  // count 부분은 SWeet ALert로 input할까 생각 중
  const count = 10;
  const goWord = () => {
    if (page === '') {
      Swal.fire({
        icon: 'warning',
        title: '단어장을 선택해주세요.',
      });
    } else {
      getMemo(page, count, 'word');
    }
  };
  const goMean = () => {
    if (page === '') {
      Swal.fire({
        icon: 'warning',
        title: '단어장을 선택해주세요.',
      });
    } else {
      getMemo(page, count, 'mean');
    }
  };

  return (
    <MainWrapper>
      <Header>
        <BackButton
          onClick={() => {
            navigate('/quiz');
          }}
        >
          <img src={arrowBackImg} alt="arrowBackImg" />
        </BackButton>
      </Header>

      <Container>
        <QuizName>FLASHCARD</QuizName>
        <BookSelect>단어장 선택</BookSelect>
        <BookWrapper>
          {books.map(items => {
            return (
              <CreateBookList
                key={items.id}
                bookId={items.id}
                bookName={items.name}
              />
            );
          })}
        </BookWrapper>
      </Container>

      <Footer>
        <WordQuizButton onClick={goWord}>단어암기</WordQuizButton>
        <MeanQuizButton onClick={goMean}>뜻암기</MeanQuizButton>
      </Footer>
    </MainWrapper>
  );
};

export default FlashCardPage;

//props.activate ? '#724fab' : '#ffffff';

const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 27px;
`;

//-- Header 영역 --//
const Header = styled.div`
  width: 100%;
  height: 61px;
  background: #ffffff;
  padding: 25px 0 0 21px;
  margin-bottom: 227px;
`;
const BackButton = styled.button`
  width: 36px;
  height: 36px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 95px;
`;
const QuizName = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 36px;
  line-height: 36px;
  text-align: center;
  color: #444444;
  margin-bottom: 23px;
`;
const BookSelect = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  text-align: center;
  color: #444444;
  margin-bottom: 27px;
`;

const BookWrapper = styled.div`
  width: 300px; /*100%;*/
  height: 216px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  /* ::-webkit-scrollbar {
    display: none;
  } */
  button {
    flex: 0 0 auto;
  }
  //padding-top: 107px;
`;

const Book = styled.button`
  width: 279px;
  height: 40px;
  background-color: ${props => props.color};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 13px;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 23px;
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
`;
const WordQuizButton = styled.button`
  width: 158px;
  height: 72px;
  background: #724fab;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  font-weight: 300;
  font-size: 24px;
  display: felx;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const MeanQuizButton = styled(WordQuizButton)`
  margin-left: 19px;
`;
