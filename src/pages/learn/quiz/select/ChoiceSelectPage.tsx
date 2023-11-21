import styled, { css } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '@/api';
import useGetSelectQuiz from './hooks/useGetSelectQuiz';
import useToast from '@/hooks/useToast';
import QuizHeader from '../common/components/QuizHeader';
import WideButton from '@/components/common/button/WideButton';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { globalState } from '@/recoil';
import QuizButton from './components/QuizButton';
import Toggle from '@/components/common/switch/Toggle';

const ChoiceSelectPage = () => {
  //// hooks ////
  const navigate = useNavigate();
  const location = useLocation();
  const { bookIds, mode, quizCount, quizTime, timerOption, memorizedFilter } =
    location.state as {
      bookIds: number[];
      mode: 'word' | 'mean';
      quizCount: number;
      quizTime: number;
      timerOption: 'quiz' | 'book';
      memorizedFilter: boolean;
    };

  const getQuiz = useGetSelectQuiz();
  const toast = useToast();
  //// Varaiables ////
  const [isAnswered, setIsAnswered] = useRecoilState(
    globalState.quiz.isAnswered,
  );
  const [isWrong, setIsWrong] = useRecoilState(globalState.quiz.isWrong);
  const setTimer = useSetRecoilState(globalState.quiz.quizTimer);
  const [timerEnd, setTimerEnd] = useRecoilState(globalState.quiz.quizTimerEnd);

  useEffect(() => {
    setTimer(quizTime);
  }, []);

  // Quiz Api Vars
  const [isLoading, setIsLoading] = useState(true);
  const [problems, setProblems] = useState([]); // 전체 문제
  const [length, setLength] = useState(0); // 문제 길이

  // Extract Quiz Vars
  // 현재 문제 목록
  const [currentQuiz, setCurrentQuiz] = useState([]);
  // 정답 번호
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState('');
  // 맞출 문제
  const [currentAnswer, setCurrentAnswer] = useState<IAnswerData>();
  // 현재 문제의 ID
  const [currentWordId, setCurrentWordId] = useState(0);
  // 현재 문제의 암기상태
  const [currentMemorize, setCurrentMemorize] = useState(false);

  // Result Vars
  const [result, setResult] = useState(0); // 맞춘 정답수

  // Components Vars
  const [number, setNumber] = useState(0); // 문제 진행도
  const [isCorrect, setIsCorrect] = useState(false); // 위 변수 통합용(체크 or 타임 아웃)

  //// Functions ////
  // 문제 가져오기
  const extractQuiz = (value: any, number: number) => {
    const result = value[number];

    if (result) {
      setCurrentQuiz(result.answers);
      setCurrentAnswerIndex(result.answer_index);
      setCurrentAnswer(result.answers[result.answer_index]);
      setCurrentWordId(result.word_id);
      setCurrentMemorize(result.is_memorized);
    }
  };

  // 퀴즈 API
  const getQuizAPI = async () => {
    const { data: response } = await getQuiz({
      bookIds,
      count: quizCount,
      memorizedFilter,
    });

    const getData = response.problem;

    setProblems(getData);
    setLength(getData.length);
    extractQuiz(getData, number);
    setIsLoading(false);
  };

  const [reviewNote, setReviewNote] = useState<IReviewNote[]>([]);

  // 문항 선택 버튼에서 사용할 함수
  const selectAnswer = (select: string) => {
    if (mode === 'word') {
      if (select === currentAnswer?.mean) {
        /* setResult((current) => current + 1); */
        setIsCorrect(true);
        setIsWrong(false);
        toast.quiz('정답을 맞췄어요 👏');
      } else {
        setIsWrong(true);
        toast.quiz('틀렸어요...😥');
      }
    }
    if (mode === 'mean') {
      if (select === currentAnswer?.word) {
        /* setResult((current) => current + 1); */
        setIsCorrect(true);
        setIsWrong(false);
        toast.quiz('정답을 맞췄어요 👏');
      } else {
        setIsWrong(true);
        toast.quiz('틀렸어요...😥');
      }
    }
  };

  // 암기 가이드 메세지
  const showMessage = localStorage.getItem('showMessage');

  // 체크버튼 함수 // 여기도 훅 뺄거임
  const onClickCheckButton = async () => {
    if (showMessage !== '1') {
      localStorage.setItem('showMessage', '1');
    }

    setCurrentMemorize((current) => !current);

    try {
      const { data: response } = await api.memo.patchMemoStatus({
        wordId: currentWordId,
        isMemorized: !currentMemorize,
      });

      const memorizedStatus = response.is_memorized;
      const toastMessage =
        memorizedStatus === true ? '암기 완료' : '암기 미완료';
      toast.comment(toastMessage);
    } catch (e: unknown) {
      console.log(e);
    }
  };

  // 다음 버튼 함수
  const onClickNextButton = () => {
    setNumber(number + 1);
    setIsAnswered(false);
    setIsCorrect(false);
    setTimerEnd(false);
    setIsWrong(false);

    if (timerOption === 'quiz') setTimer(quizTime);

    if (number + 1 === length) {
      localStorage.setItem('reviewNote', JSON.stringify(reviewNote));

      navigate('/learn/result', {
        state: {
          bookIds,
          count: quizCount,
          correct: result,
          quizType: 'select',
        },
      });
    }
  };

  //// useEffects ////
  // 객관식 퀴즈 가져옴
  useEffect(() => {
    if (problems.length === 0) {
      getQuizAPI();
    }
  }, []);

  // 가져온 퀴즈를 화면에 뿌려줌
  useEffect(() => {
    extractQuiz(problems, number);
  }, [number]);

  useEffect(() => {
    if (isWrong && currentAnswer) {
      setReviewNote((prevItem) => [
        ...prevItem,
        {
          word: currentAnswer.word,
          mean: currentAnswer.mean,
          isMemo: currentMemorize, // API 데이터로 요청할 것
          wordId: currentWordId, // 숫자 변경 요망
        },
      ]);
    } else if (!isWrong && isCorrect) {
      setResult((current) => current + 1);
    }
  }, [isWrong, isCorrect]);

  useEffect(() => {
    if (isAnswered) setTimerEnd(true);
    else setTimerEnd(false);
  }, [isAnswered]);

  //// Components ////

  return (
    <MainWrapper>
      {isLoading && <Loading>Loading...</Loading>}

      {!isLoading && (
        <>
          <QuizHeader
            number={number}
            total={length}
            hasQuiz={Boolean(problems)}
            timerEnd={timerEnd}
          />

          <Content>
            {/* 문제 컴포넌트 */}
            {!isAnswered && mode === 'word' && (
              <QuestionText>{currentAnswer?.word}</QuestionText>
            )}
            {!isAnswered && mode === 'mean' && (
              <QuestionText>{currentAnswer?.mean}</QuestionText>
            )}

            {/* 정답 컴포넌트 */}
            {isAnswered && (
              <Center>
                {/* 아래 부분 컴포넌트 이름 수정 필요 */}
                {mode === 'word' && (
                  <>
                    <QuestionText>{currentAnswer?.word}</QuestionText>
                    <AnswerText>{currentAnswer?.mean}</AnswerText>
                  </>
                )}
                {mode === 'mean' && (
                  <>
                    <QuestionText>{currentAnswer?.mean}</QuestionText>
                    <AnswerText>{currentAnswer?.word}</AnswerText>
                  </>
                )}

                {!showMessage && (
                  <GuideMessage>
                    <TopMessage>다 외우셨나요?</TopMessage>
                    <BotMessage>암기상태 활성화하기</BotMessage>
                    <Triangle />
                  </GuideMessage>
                )}

                <CheckButton>
                  <Toggle
                    type="quiz"
                    isToggle={currentMemorize}
                    onClick={onClickCheckButton}
                  />
                </CheckButton>
              </Center>
            )}
          </Content>

          <ButtonWrapper>
            {/* 문제 컴포넌트 */}
            {currentQuiz.map((items: { mean: string; word: string }, index) => {
              if (mode === 'word') {
                return (
                  <QuizButton
                    key={index}
                    number={index}
                    currentAnswerIndex={currentAnswerIndex}
                    example={items?.mean}
                    selectAnswer={selectAnswer}
                  />
                );
              } else {
                /*  (mode === 'mean') */
                return (
                  <QuizButton
                    key={index}
                    number={index}
                    currentAnswerIndex={currentAnswerIndex}
                    example={items?.word}
                    selectAnswer={selectAnswer}
                  />
                );
              }
            })}
          </ButtonWrapper>
        </>
      )}
      <BottomView>
        {isAnswered && (
          <WideButton onClick={onClickNextButton}>
            {number + 1 === length ? '결과보기' : '다음'}
          </WideButton>
        )}
      </BottomView>
    </MainWrapper>
  );
};

export default ChoiceSelectPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;
`;

const QuestionText = styled.div`
  font-family: ${({ theme }) => theme.fonts.pretendard};
  color: ${({ theme }) => theme.colors.black};
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const AnswerText = styled.div`
  font-family: ${({ theme }) => theme.fonts.pretendard};
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 24px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//

const GuideMessage = styled.div`
  position: absolute;
  bottom: 65px;
  right: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray[900]};
`;

const TopMessage = styled.span`
  ${({ theme }) => theme.typography.pretendard.c2.rg};
  color: ${({ theme }) => theme.colors.white};
`;

const BotMessage = styled.span`
  ${({ theme }) => theme.typography.pretendard.c1.sbd};
  color: ${({ theme }) => theme.colors.primary[200]};
`;

const Triangle = styled.div`
  position: absolute;
  bottom: -8px;
  right: 14px;
  width: 0px;
  height: 0px;
  border-top: 8px solid ${({ theme }) => theme.colors.gray[900]};
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
`;

const CheckButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 16px;
  right: 36px;
`;

const ButtonWrapper = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;

  div {
    :nth-child(n + 2) {
      margin-top: 16px;
    }
  }
`;

const BottomView = styled.div`
  width: 100%;
  height: 109px;
  padding: 32px 24px;
  padding-top: 25px;
`;
