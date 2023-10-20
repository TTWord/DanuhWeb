import styled, { css } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useGetTypingQuiz from './hooks/useGetTypingQuiz';
import QuizHeader from '../common/components/QuizHeader';
import useToast from '@/hooks/useToast';
import WideButton from '@/components/common/button/WideButton';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { globalState } from '@/recoil';

const ShortTypingPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const { bookIds, mode, quizCount, quizTime, memorizedFilter } =
    location.state as {
      bookIds: number[];
      mode: 'word' | 'mean';
      quizCount: number;
      quizTime: number;
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
  const [isAnswered, setIsAnswered] = useRecoilState(
    globalState.quiz.isAnswered,
  );
  const setTimer = useSetRecoilState(globalState.quiz.quizTimer);
  const [timerEnd, setTimerEnd] = useRecoilState(globalState.quiz.quizTimerEnd);

  useEffect(() => {
    setTimer(quizTime);
  }, []);

  interface IReviewNote {
    word: string;
    mean: string;
    isMemo: Boolean;
  }

  const [reviewNote, setReviewNote] = useState<IReviewNote[]>([]);

  const next = () => {
    // 로직 리팩중
    if (number + 1 === length && isAnswered) {
      console.log(reviewNote);
      localStorage.setItem('reviewNote', JSON.stringify(reviewNote));
      // 제출
      navigate('/learn/result', {
        state: {
          bookIds,
          count: length,
          correct: result,
          quizType: 'typing',
        },
      });
    } else {
      if (!isAnswered) {
        // 정답보기 버튼일때
        setTimerEnd(true);
        setIsAnswered(true);

        if (myAnswer === rightAnswer) {
          setResult((current) => current + 1);
          toast.quiz('정답!');
        } else {
          toast.quiz('오답!');

          // 오답노트 저장 => localstorage에 저장해야함
          if (mode === 'word') {
            setReviewNote((prevItem) => [
              ...prevItem,
              {
                word: currentQuiz,
                mean: rightAnswer,
                isMemo: false, // API 데이터로 요청할 것
              },
            ]);
          }
          if (mode === 'mean') {
            setReviewNote((prevItem) => [
              ...prevItem,
              {
                word: rightAnswer,
                mean: currentQuiz,
                isMemo: false, //
              },
            ]);
          }
        }
      } else {
        // 다음 버튼일때
        setIsAnswered(false);
        setTimer(quizTime);
        setTimerEnd(false);
        setNumber(number + 1);
      }
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMyAnswer(e.target.value);
  };

  // 문제 가져오기
  const extractQuiz = (value: any) => {
    const currentQuiz = value[number];

    if (currentQuiz) {
      if (mode === 'word') {
        setCurrentQuiz(currentQuiz.word);
        setRightAnswer(currentQuiz.mean);
      }
      if (mode === 'mean') {
        setCurrentQuiz(currentQuiz.mean);
        setRightAnswer(currentQuiz.word);
      }
    }
  };

  const getQuiz = async () => {
    const { data: response } = await getTypingQuiz({
      bookIds,
      count: quizCount,
      memorizedFilter,
    });
    //console.log(response);
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

  // 하단 버튼 텍스트용
  const [buttonText, setButtonText] = useState('정답보기');

  useEffect(() => {
    if (isAnswered) {
      if (number + 1 === length) {
        setButtonText('결과 보기');
      } else {
        setButtonText('다음');
      }
    } else {
      setButtonText('정답 보기');
    }
  }, [number, length, isAnswered]);

  return (
    <MainWrapper>
      <QuizHeader
        number={number}
        total={length}
        hasQuiz={Boolean(problems)}
        timerEnd={timerEnd}
      />

      <Content>
        <Quiz>{currentQuiz}</Quiz>
        {!isAnswered && (
          <MyAnswer onChange={onChange} type="text" ref={answerRef} />
        )}

        {/* 정답보기 버튼 클릭 시 보여줄 컴포넌트 */}
        {isAnswered && (
          <ShowAnswer isCorrent={myAnswer === rightAnswer}>
            {rightAnswer}
          </ShowAnswer>
        )}
      </Content>

      <Footer>
        <WideButton onClick={next}>{buttonText}</WideButton>
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

const MyAnswer = styled.input`
  width: 40%;
  ${({ theme }) => theme.typography.pretendard.t1.sbd};
  padding: 8px 0;
  border-bottom: 1px solid #000000;
  text-align: center;
`;

const ShowAnswer = styled.div<{ isCorrent: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 24px;
  ${({ isCorrent }) => {
    return (
      isCorrent &&
      css`
        color: green;
      `
    );
  }}
`;

const Footer = styled.footer`
  width: 100%;
  height: 72px;
  padding: 20px;
  margin-bottom: 36px;
`;
