import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { MouseEvent, ChangeEvent, useEffect, useRef, useState } from 'react';
import useGetTypingQuiz from './hooks/useGetTypingQuiz';
import QuizHeader from '../common/components/QuizHeader';
import useToast from '@/hooks/useToast';
import WideButton from '@/components/common/button/WideButton';

const ShortTypingPage = () => {
  const [timerEnd, setTimerEnd] = useState(false);

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

  // Timer Vars
  const userTimer = 72;
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(userTimer);

  const next = () => {
    if (number + 1 !== length) {
      // 다음
      if (myAnswer === rightAnswer) {
        setResult((current) => current + 1);
        toast.quiz('정답!');
      } else {
        toast.quiz('오답!');
      }
      setNumber(number + 1);
      setIsAnswered(false);
      //setIsCorrect(false);
      setTimer(userTimer);
      setTimerEnd(false);

      if (answerRef.current) answerRef.current.value = '';
    } else if (number + 1 === length) {
      // 제출
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

  // 타이머
  useEffect(() => {
    if (!isAnswered && problems) {
      const timeOutId = setTimeout(() => {
        if (timer !== 0) {
          setTimer((current) => current - 1);
        }
        if (timer === 0) {
          setIsAnswered(true);
          setTimerEnd(true);
          clearTimeout(timeOutId);
        }

        return () => clearTimeout(timeOutId);
      }, 1000);
    }
  }, [timer, isAnswered]);

  return (
    <MainWrapper>
      <QuizHeader
        type={'typing'}
        number={number}
        total={length}
        timer={timer}
        timerEnd={timerEnd}
      />

      <Content>
        <Quiz>{currentQuiz}</Quiz>
        <Answer onChange={onChange} type="text" ref={answerRef} />
      </Content>

      <Footer>
        <WideButton onClick={next}>
          {number + 1 === length ? '결과보기' : '다음'}
        </WideButton>
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
  padding-top: 20vh;
  color: ${({ theme }) => theme.colors.black};
`;

const Quiz = styled.div`
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center;
  margin-bottom: 24px;
`;

const Answer = styled.input`
  width: 40%;
  ${({ theme }) => theme.typography.pretendard.t1.sbd};
  padding: 8px 0;
  border-bottom: 1px solid #000000;
  text-align: center;
`;

const Footer = styled.footer`
  width: 100%;
  height: 72px;
  padding: 20px;
  margin-bottom: 36px;
`;
