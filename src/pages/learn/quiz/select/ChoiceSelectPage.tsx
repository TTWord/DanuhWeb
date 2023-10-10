import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '@/api';
import useGetSelectQuiz from './hooks/useGetSelectQuiz';
import useToast from '@/hooks/useToast';
import CheckSVG from '../common/svg/CheckSVG';
import QuizHeader from '../common/components/QuizHeader';
import WideButton from '@/components/common/button/WideButton';

interface IAnswerData {
  mean: string;
  word: string;
}

const ChoiceSelectPage = () => {
  //// hooks ////
  const navigate = useNavigate();
  const location = useLocation();
  const { bookIds, mode, count, memorizedFilter } = location.state as {
    bookIds: number[];
    mode: 'word' | 'mean';
    count: number;
    memorizedFilter: boolean;
  };

  const getQuiz = useGetSelectQuiz();
  const toast = useToast();
  //// Varaiables ////
  // Timer Vars
  const userTimer = 72;
  const [timerEnd, setTimerEnd] = useState(false);
  const [timer, setTimer] = useState(userTimer); // 초

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
  const [isAnswered, setIsAnswered] = useState(false); // 정답 화면 표기용
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
      count,
      memorizedFilter,
    });
    const getData = response.problem;

    setProblems(getData);
    setLength(getData.length);
    extractQuiz(getData, number);
    setIsLoading(false);
  };

  // 문항 선택 버튼에서 사용할 함수
  const selectAnswer = (select: string) => {
    if (mode === 'word') {
      if (select === currentAnswer?.mean) {
        setResult((current) => current + 1);
        setIsCorrect(true);

        toast.quiz('정답을 맞췄어요 👏');
      } else {
        toast.quiz('최악이에요...');
      }
    }
    if (mode === 'mean') {
      if (select === currentAnswer?.word) {
        setResult((current) => current + 1);
        setIsCorrect(true);
        toast.quiz('정답을 맞췄어요 👏');
      } else {
        toast.quiz('최악이에요...');
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
      if (response.status === 'OK') {
        const memorizedStatus = response.data.is_memorized;
        const toastMessage =
          memorizedStatus === true ? '암기 완료' : '암기 미완료';
        toast.comment(toastMessage);
      }
    } catch (e: unknown) {
      console.log(e);
    }
  };

  // 다음 버튼 함수
  const onClickNextButton = () => {
    setNumber(number + 1);
    setIsAnswered(false);
    setIsCorrect(false);
    setTimer(userTimer);
    setTimerEnd(false);

    if (number + 1 === length) {
      navigate('/learn/result', {
        state: {
          bookIds,
          count,
          correct: result,
          quizType: 'select',
        },
      });
    }
  };

  //// useEffects ////
  // 객관식 퀴즈 가져옴
  useEffect(() => {
    getQuizAPI();
  }, []);

  // 가져온 퀴즈를 화면에 뿌려줌
  useEffect(() => {
    extractQuiz(problems, number);
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

  //// Components ////
  const CreateChoiceButtons = (props: any) => {
    return (
      <ChoiceButton
        onClick={() => {
          if (!isAnswered) {
            selectAnswer(props.example);
            setIsAnswered(true);
          }
        }}
      >
        {props.example}
      </ChoiceButton>
    );
  };

  return (
    <MainWrapper>
      {isLoading && <Loading>Loading...</Loading>}

      {!isLoading && (
        <>
          <QuizHeader
            type={'select'}
            number={number}
            total={length}
            timer={timer}
            timerEnd={timerEnd}
          />

          <Content>
            {/* 문제 컴포넌트 */}
            {!isAnswered && mode === 'word' && (
              <Word>{currentAnswer?.word}</Word>
            )}
            {!isAnswered && mode === 'mean' && (
              <Word>{currentAnswer?.mean}</Word>
            )}

            {/* 정답 컴포넌트 */}
            {isAnswered && (
              <Answer>
                {/* 아래 부분 컴포넌트 이름 수정 필요 */}
                {mode === 'word' && (
                  <>
                    <Word>{currentAnswer?.word}</Word>
                    <Mean>{currentAnswer?.mean}</Mean>
                  </>
                )}
                {mode === 'mean' && (
                  <>
                    <Word>{currentAnswer?.mean}</Word>
                    <Mean>{currentAnswer?.word}</Mean>
                  </>
                )}

                {!showMessage && (
                  <GuideMessage>
                    <TopMessage>다 외우셨나요?</TopMessage>
                    <BotMessage>암기상태 활성화하기</BotMessage>
                    <Triangle />
                  </GuideMessage>
                )}

                <CheckButton onClick={onClickCheckButton}>
                  <CheckSVG fill={currentMemorize ? '#6E5FED' : '#DDDDE4'} />
                </CheckButton>
              </Answer>
            )}
          </Content>

          <ButtonWrapper>
            {/* 문제 컴포넌트 */}
            {
              /* !isAnswered */ true &&
                currentQuiz.map(
                  (items: { mean: string; word: string }, index) => {
                    if (mode === 'word')
                      return (
                        <CreateChoiceButtons
                          key={index}
                          example={items?.mean}
                        />
                      );
                    /*  (mode === 'mean') */ else
                      return (
                        <CreateChoiceButtons
                          key={index}
                          example={items?.word}
                        />
                      );
                  },
                )
            }
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

const Word = styled.div`
  font-family: ${({ theme }) => theme.fonts.pretendard};
  color: ${({ theme }) => theme.colors.black};
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Mean = styled.div`
  font-family: ${({ theme }) => theme.fonts.pretendard};
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const Answer = styled.div`
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
  //width: 126px;
  //height: 45px;
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

const CheckButton = styled.button`
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
  //margin-bottom: 32px;

  div {
    :nth-child(n + 2) {
      margin-top: 16px;
    }
  }
`;

const ChoiceButton = styled.button`
  width: 100%;
  height: 44px;
  padding: 15px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typography.pretendard.b1.sbd}
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.black};

  & + & {
    margin-top: 8px;
  }
`;

const BottomView = styled.div`
  width: 100%;
  height: 109px;
  padding: 32px 24px;
  padding-top: 25px;
`;
