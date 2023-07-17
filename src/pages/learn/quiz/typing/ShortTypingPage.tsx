import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { MouseEvent, ChangeEvent, useEffect, useRef, useState } from 'react';
import useGetTypingQuiz from './hooks/useGetTypingQuiz';
import xButton from '@/assets/svg/icons/icon-x-button.svg';
import QuizHeader from '../common/components/QuizHeader';
import useToast from '@/hooks/useToast';

const ShortTypingPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { bookIds, mode, count, memorizedFilter } = location.state as {
    bookIds: number[];
    mode: 'word' | 'mean';
    count: number;
    memorizedFilter: boolean;
  };
  // 주관식 퀴즈 API
  const getTypingQuiz = useGetTypingQuiz();
  const answerRef = useRef<HTMLInputElement>(null);
  const [problems, setProblems] = useState([]);
  const length = problems.length; // 문제 길이

  // Extract Quiz Vars
  // 현재 문제 목록
  const [currentQuiz, setCurrentQuiz] = useState('');
  const [rightAnswer, setRightAnswer] = useState('');
  const [myAnswer, setMyAnswer] = useState('');
  // 맞춘 정답수
  const [result, setResult] = useState(0);
  // 문제 진행도
  const [number, setNumber] = useState(0);

  const next = (e: MouseEvent<HTMLButtonElement>) => {
    const innerText = e.currentTarget.innerText;

    if (innerText === '다음') {
      if (myAnswer === rightAnswer) {
        setResult(current => current + 1);
        toast.success('정답!');
      } else {
        toast.error('오답!');
      }
      setNumber(number + 1);
      if (answerRef.current) answerRef.current.value = '';
    } else if (innerText === '제출') {
      navigate('/learn/result', {
        state: {
          bookIds,
          count,
          correct: result,
          quizType: 'typing',
        },
      });
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMyAnswer(e.target.value);
  };

  // 문제 가져오기
  const extractQuiz = (value: any) => {
    const result = value[number];

    if (result) {
      if (mode === 'word') {
        setCurrentQuiz(result.word);
        setRightAnswer(result.mean);
      }
      if (mode === 'mean') {
        setCurrentQuiz(result.mean);
        setRightAnswer(result.word);
      }
    }
  };

  const getQuiz = async () => {
    const { data: response } = await getTypingQuiz({
      bookIds,
      count,
      memorizedFilter,
    });
    const data = response.problem;
    const tempArray: any = [];
    data.map((item: { answer: { word: string; mean: string } }) => {
      tempArray.push(item.answer);
    });
    setProblems(tempArray);
    extractQuiz(tempArray);
  };

  // 퀴즈 가져오기
  useEffect(() => {
    getQuiz();
  }, []);

  // 퀴즈에서 문제 추출하기
  useEffect(() => {
    extractQuiz(problems);
  }, [number]);

  return (
    <MainWrapper>
      <QuizHeader
        type={'typing'}
        number={number}
        total={length}
        timer={1}
        timeMax={1}
      />

      <Content>
        <Quiz>{currentQuiz}</Quiz>
        <Answer onChange={onChange} type="text" ref={answerRef} />
      </Content>

      <Footer>
        <NextButton onClick={next}>
          {number + 1 === length ? '제출' : '다음'}
        </NextButton>
      </Footer>
    </MainWrapper>
  );
};

export default ShortTypingPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

const Quiz = styled.div`
  font-weight: 700;
  font-size: 64px;
  line-height: 64px;
  text-align: center;
  color: #0d0d0d;
  margin-bottom: 48px;
`;

const Answer = styled.input`
  width: 80%;
  border-bottom: 1px solid #000000;
  outline: none;
  text-align: center;
`;

const Footer = styled.footer`
  width: 100%;
  height: 72px;
  padding: 20px;
  margin-bottom: 36px;
`;

const NextButton = styled.button`
  width: 100%;
  height: 48px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #724fab;
  color: #ffffff;
  border-radius: 8px;
`;
