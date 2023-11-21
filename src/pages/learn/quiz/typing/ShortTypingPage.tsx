import styled, { css } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useGetTypingQuiz from './hooks/useGetTypingQuiz';
import QuizHeader from '../common/components/QuizHeader';
import useToast from '@/hooks/useToast';
import WideButton from '@/components/common/button/WideButton';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { globalState } from '@/recoil';

interface IProblems {
  answer: { mean: string; word: string };
  is_memorized: boolean;
  word_id: number;
}

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
  const [problems, setProblems] = useState<IProblems[]>([]);
  const length = problems.length; // 문제 길이

  // Extract Quiz Vars
  // 현재 문제 목록
  const [currentQuiz, setCurrentQuiz] = useState('');
  const [rightAnswer, setRightAnswer] = useState('');

  const [currentWordMemo, setCurrentWordMemo] = useState(false);
  const [currentWordid, setCurrentWordid] = useState(0);

  const [myAnswer, setMyAnswer] = useState('');
  // 맞춘 정답수
  const [result, setResult] = useState(0);
  // 문제 진행도
  const [number, setNumber] = useState(0);

  // Timer Vars
  const [isAnswered, setIsAnswered] = useRecoilState(
    globalState.quiz.isAnswered,
  );
  const [isWrong, setIsWrong] = useRecoilState(globalState.quiz.isAnswered);
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
          setIsWrong(false);
          toast.quiz('정답을 맞췄어요 👏');
        } else {
          setIsWrong(true);
          toast.quiz('틀렸어요...😥');
        }
      } else {
        // 다음 버튼일때
        setIsAnswered(false);
        setTimer(quizTime);
        setTimerEnd(false);
        setNumber(number + 1);
        setMyAnswer('');
      }
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMyAnswer(e.target.value);
  };

  // 문제 가져오기
  const extractQuiz = (value: IProblems[]) => {
    const currentQuiz = value[number];

    setCurrentWordMemo(currentQuiz?.is_memorized);
    setCurrentWordid(currentQuiz?.word_id);

    if (currentQuiz) {
      if (mode === 'word') {
        setCurrentQuiz(currentQuiz.answer.word);
        setRightAnswer(currentQuiz.answer.mean);
      }
      if (mode === 'mean') {
        setCurrentQuiz(currentQuiz.answer.mean);
        setRightAnswer(currentQuiz.answer.word);
      }
    }
  };

  const getQuiz = async () => {
    const { data: response } = await getTypingQuiz({
      bookIds,
      count: quizCount,
      memorizedFilter,
    });

    const data = response.problem;

    setProblems(data);
    extractQuiz(data);
  };

  // 퀴즈 가져오기
  useEffect(() => {
    getQuiz();
  }, []);

  // 퀴즈에서 문제 추출하기
  useEffect(() => {
    extractQuiz(problems);
  }, [number]);

  useEffect(() => {
    if (isWrong)
      setReviewNote((prevItem) => [
        ...prevItem,
        {
          word: currentQuiz,
          mean: rightAnswer,
          isMemo: currentWordMemo, // API 데이터로 요청할 것
          wordId: currentWordid, // 숫자 변경 요망
        },
      ]);
  }, [isWrong]);

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
          <AnswerInput onChange={onChange} type="text" ref={answerRef} />
        )}

        {/* 정답보기 버튼 클릭 시 보여줄 컴포넌트 */}
        {isAnswered && (
          <AnswerResultBox isCorrect={myAnswer === rightAnswer}>
            <MyAnswer isDisplay={myAnswer !== rightAnswer}>{myAnswer}</MyAnswer>
            <ShowAnswer>{rightAnswer}</ShowAnswer>
          </AnswerResultBox>
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
  justify-content: center;
  padding-top: 20vh;
  padding: 0 24px;
  color: ${({ theme }) => theme.colors.black};
`;

const Quiz = styled.div`
  display: flex;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center;
  margin-bottom: 24px;
`;

const AnswerInput = styled.input`
  min-width: 40%;
  max-width: 100%;
  ${({ theme }) => theme.typography.pretendard.t1.sbd};
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};
  text-align: center;
`;

const AnswerResultBox = styled.div<{ isCorrect: boolean }>`
  min-width: 40%;
  max-width: 100%;

  ${({ theme }) => theme.typography.pretendard.t1.sbd};
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  ${({ isCorrect }) => {
    return (
      isCorrect &&
      css`
        justify-content: center;
      `
    );
  }}
`;

const MyAnswer = styled.div<{ isDisplay: boolean }>`
  width: auto;
  ${({ theme }) => theme.typography.pretendard.t1.sbd};

  text-align: center;
  color: red;
  text-decoration: line-through;
  display: none;
  justify-content: end;
  margin-right: 8px;

  ${({ isDisplay }) => {
    return (
      isDisplay &&
      css`
        display: flex;
      `
    );
  }}
`;

const ShowAnswer = styled.div`
  width: auto;
  display: flex;
  justify-content: start;
  align-items: center;

  color: ${({ theme }) => theme.colors.primary.default};
  font-size: 24px;
`;

const Footer = styled.footer`
  width: 100%;
  height: 72px;
  padding: 20px;
  margin-bottom: 36px;
`;
