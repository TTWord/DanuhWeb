import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import arrowBackImg from '@/assets/svg/icons/icon-arrow-back-button.svg';
import { api } from '@/api';
import { globalState } from '@/recoil';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';

import ChoiceBookList from './components/ChoiceBookList';

const ChoicePage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const QuizNumber = useRecoilValue(globalState.quiz.bookIds);

  const getBookList = async () => {
    try {
      const response: any = await api.book.getBook();

      if (response.status === 'OK') {
        setBooks(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBookList();
  }, []);

  const goQuiz = async () => {
    if (QuizNumber === 0) {
      Swal.fire({
        icon: 'warning',
        title: '단어장을 선택해주세요.',
      });
    } else {
      navigate('/quiz/choice/question');
    }
  };

  const test = () => {
    console.log(QuizNumber);
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
        <QuizName>객관식</QuizName>
        <BookSelect>단어장 선택</BookSelect>
        <BookWrapper>
          {/* any 타입 변경할것 */}
          {books.map((items: any) => {
            return (
              <ChoiceBookList
                key={items.id}
                bookId={Number(items.id)}
                bookName={items.name}
              />
            );
          })}
        </BookWrapper>
      </Container>

      <Footer>
        <QuizButton onClick={goQuiz}>단어암기</QuizButton>
        <QuizButton onClick={test}>뜻암기</QuizButton>
      </Footer>
    </MainWrapper>
  );
};

export default ChoicePage;

const MainWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//-- Header 영역 --//
const Header = styled.div`
  width: 100%;
  height: 56px;
  background: #ffffff;
  padding: 10px 0;
  padding-left: 24px;
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  width: 36px;
  height: 36px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
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
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 24px;
  overflow-y: auto;

  button {
    flex: 0 0 auto;
  }
`;

const Footer = styled.footer`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-evenly;
  padding: 0 29px;
  margin-bottom: 23px;
`;

const QuizButton = styled.button`
  width: 40%;
  height: 72px;
  background-color: #724fab;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  font-weight: 300;
  font-size: 24px;
  display: felx;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;
