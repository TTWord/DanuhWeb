import styled from 'styled-components';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { api } from '@/api';
import Swal from 'sweetalert2';
import useToast from '@/hooks/useToast';
import xButton from '@/assets/svg/icons/icon-x-button.svg';
import CheckSVG from '@/pages/quiz/choice/Select/svg/CheckSVG';

interface IGetQuiz {
  bookId: string;
  count: number;
  memorizedFilter: boolean;
}

interface IAnswerData {
  mean: string;
  word: string;
}

const ChoiceBlindPage = () => {
  console.log('객관식 블라인드 페이지 파일만 생성');
  //// hooks ////
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  //// Varaiables ////
  // Timer Vars
  const timeMax = 10000;
  const [timer, setTimer] = useState(0);

  // Quiz Api Vars
  const bookId = String(useParams().id);
  const memorizedFilter: boolean = false;
  const count: number = 10; // 퀴즈페이지의 단어장 선택 시 넘겨줄 것
  const [isLoading, setIsLoading] = useState(true);
  const [problems, setProblems] = useState([]); // 전체 문제
  const [length, setLength] = useState(0); // 문제 길이 //useRecoilState(globalState.quiz.quizCount);
  const mode = searchParams.get('mode');

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
  const [result, setResult] = useState(0); // 맞춘 정답수 //useRecoilState(globalState.quiz.result);
  const [isMemorize, setMemorized] = useState(0); // 암기 체크수 // useRecoilState(globalState.quiz.memorize); // recoil 변수 추가

  // Components Vars
  const [number, setNumber] = useState(0); // 문제 진행도
  const [isCheck, setIsCheck] = useState(false); // 암기 체크 여부
  const [isAnswered, setIsAnswered] = useState(false); // 정답 화면 표기용
  const [isCorrect, setIsCorrect] = useState(false); // 위 변수 통합용(체크 or 타임 아웃)

  //// Functions ////
  const goChoice = () => {
    navigate('/quiz/choice');
  };

  // 퀴즈 API
  const getQuizAPI = async ({ bookId, count, memorizedFilter }: IGetQuiz) => {
    try {
      const { data: response } = await api.quiz.getChoiceQuiz(
        bookId,
        count,
        memorizedFilter,
      );

      if (response.status === 'OK') {
        setIsLoading(false);
        const getData = response.data.problem;

        setProblems(getData);
        setLength(getData.length);
        extractQuiz(getData, number);
      }
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorMessage = err?.response?.data.message;
      let swalMessage: string = '';
      switch (errorMessage) {
        case 'BOOK_NOT_FOUND':
          swalMessage = '단어장이 선택되지 않았습니다';
          break;
        case 'WORD_LESS_THAN_COUNT':
          swalMessage = '단어의 개수가 4개 미만입니다';
          break;
      }
      Swal.fire({
        icon: 'error',
        title: swalMessage,
      }).then(() => {
        goChoice();
      });
    }
  };

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

  // 문항 선택 버튼에서 사용할 함수
  const selectAnswer = (select: string) => {
    if (select === currentAnswer?.mean) {
      setResult(current => current + 1);
      setIsCorrect(true);
    }
  };

  // 체크버튼 함수
  const onClickCheckButton = async () => {
    setCurrentMemorize(current => !current);

    try {
      const { data: response } = await api.memo.patchMemorizedStatus({
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
    setIsAnswered(current => !current);
    setIsCorrect(false);
    setTimer(0);
    if (number + 1 === length) {
      navigate('/quiz/result', {
        state: {
          length: length,
          answer: result,
          memorize: 0, // 값 넣어야함
          quizType: 'choice',
        },
      });
    }
  };

  //// useEffects ////
  // 객관식 퀴즈 가져옴
  useEffect(() => {
    getQuizAPI({
      bookId,
      count,
      memorizedFilter,
    });
  }, []);

  // 가져온 퀴즈를 화면에 뿌려줌
  useEffect(() => {
    extractQuiz(problems, number);
  }, [number]);

  // 타이머
  useEffect(() => {
    if (!isAnswered) {
      const timeOutId = setTimeout(() => {
        if (timer !== 10000) {
          setTimer(current => current + 500);
        }
        if (timer === 10000) {
          setIsAnswered(true);
          clearTimeout(timeOutId);
        }

        return () => clearTimeout(timeOutId);
      }, 500);
    }
  }, [timer, isAnswered]);

  //// Components ////

  const CreateChoiceButtons = (props: any) => {
    return (
      <ChoiceButton
        onClick={() => {
          selectAnswer(props.example);
          setIsAnswered(current => !current);
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
          <Header>
            <TitleWrapper>
              <button onClick={goChoice}>
                <img src={xButton} alt="" />
              </button>
              <Title>문제풀기</Title>
            </TitleWrapper>

            <ProgressWrapper>
              <ProgressBar value={(number + 1) * (100 / length)} max={100} />

              <ProgressIndex>
                {number + 1}/{length}
              </ProgressIndex>

              <ProgressTime value={(timer / timeMax) * 100} max={100} />
            </ProgressWrapper>
          </Header>

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
                <Correct>{isCorrect ? '정답!' : '오답!'}</Correct>
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

                <CheckButton onClick={onClickCheckButton}>
                  <CheckSVG fill={currentMemorize ? '#4ABC56' : '#FFFFFF'} />
                </CheckButton>
              </Answer>
            )}
          </Content>

          <Footer>
            {/* 문제 컴포넌트 */}
            {!isAnswered &&
              currentQuiz.map((items: any, index) => {
                return (
                  <div key={index}>
                    {mode === 'word' && (
                      <CreateChoiceButtons example={items?.mean} />
                    )}
                    {mode === 'mean' && (
                      <CreateChoiceButtons example={items?.word} />
                    )}
                  </div>
                );
              })}

            {/* 정답 컴포넌트 */}
            {isAnswered && (
              <NextButton onClick={onClickNextButton}>
                {number + 1 === length ? '결과보기' : '다음'}
              </NextButton>
            )}
          </Footer>
        </>
      )}
    </MainWrapper>
  );
};

export default ChoiceBlindPage;

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

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    position: absolute;
    left: 12px;
  }
`;

const Title = styled.div`
  font-weight: 300;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  color: #0d0d0d;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ProgressBar = styled.progress`
  width: 100%;
  height: 2px;
  ::-webkit-progress-bar {
    background: #d9d9d9;
  }
  ::-webkit-progress-value {
    background: #e67979;
  }
  margin-bottom: 9px;
`;

const ProgressWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProgressIndex = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 12px;
  line-height: 10px;
  text-align: center;
  color: #0d0d0d;
`;

const ProgressTime = styled.progress`
  position: absolute;
  right: 9px;
  width: 54px;
  height: 2px;
  ::-webkit-progress-bar {
    background: #d9d9d9;
  }
  ::-webkit-progress-value {
    transition: 0.5s linear;
    background: #e67979;
  }
`;

const Word = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 64px;
  color: #0d0d0d;
`;

const Answer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Mean = styled.div`
  font-size: 36px;
`;

const Correct = styled.div`
  font-size: 36px;
`;

const CheckButton = styled.button``;

const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 52px;
  margin-bottom: 32px;

  div {
    :nth-child(n + 2) {
      margin-top: 16px;
    }
  }
`;

const ChoiceButton = styled.button`
  width: 278px;
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  font-weight: 700;
  font-size: 30px;
  text-align: center;
  color: #0d0d0d;
`;

const NextButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.primary.default};
  color: white;
`;
