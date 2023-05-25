import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import arrowBackImg from '@/assets/svg/icons/icon-arrow-back-button.svg';
import { api } from '@/api';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

const ChoicePage = () => {
  const navigate = useNavigate();

  const quizNumber: number = 10;

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState<string>('0');
  const setQuizList = useSetRecoilState(globalState.quiz.quizList);

  const [isActive, setIsActive] = useState<boolean>(false);

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

  // 객관식 퀴즈 가져오는 함수
  const getQuiz = async () => {
    try {
      const { data: response } = await api.quiz.getChoiceQuiz(
        page,
        quizNumber,
        false,
      );
      const quiz = response.data.problem;

      setQuizList(quiz);
      navigate('/quiz/choice/question');
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      if (err?.response?.data.message === 'WORD_LESS_THAN_COUNT') {
        Swal.fire({
          icon: 'error',
          title: '단어가 4개 미만입니다.',
        });
      }
    }
  };

  const goQuiz = async () => {
    if (page === '0') {
      Swal.fire({
        icon: 'warning',
        title: '단어장을 선택해주세요.',
      });
    } else {
      //getQuiz();
      navigate('/quiz/choice/question');
    }
  };

  const test = () => {
    console.log(books);
  };
  {
    /* any 타입 변경할것 */
  }
  const CreateBookList = (props: any) => {
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
  padding: 25px 0 0 21px;
`;
const BackButton = styled.button`
  width: 36px;
  height: 36px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  height: 252px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  /* ::-webkit-scrollbar {
    display: none;
  } */
  button {
    flex: 0 0 auto;
  }
`;
const Book = styled.button`
  width: 279px;
  height: 40px;
  background-color: ${props => props.color || '#ffffff'};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 13px;
`;

const Footer = styled.footer`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
  padding: 0 29px;
  margin-bottom: 23px;
`;

const QuizButton = styled.button`
  width: 158px;
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

  :nth-child(2) {
    margin-left: 20px;
  }
`;