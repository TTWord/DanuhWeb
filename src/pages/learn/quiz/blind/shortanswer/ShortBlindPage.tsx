import styled, { css } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, KeyboardEvent, useState } from 'react';
import ConfirmPop from '@/components/common/popup/ConfirmPop';
import TopAppBarClose from '@/components/common/header/TopAppBarClose';
import WideButton from '@/components/common/button/WideButton';
import useBlindTypingLogics from './hooks/useBlindTypingLogics';
import useToast from '@/hooks/useToast';
import QuizBox from './components/QuizBox';
import AnswerBox from './components/AnswerBox';

const ENDPOINT = 5;

const ShortBlindPage = () => {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  //variables
  const { bookIds, memorizedFilter, mode, quizCount, quizTime, timerOption } =
    location.state as ILearnOptions;

  // api로 받아온 데이터 저장 변수
  const { blindQuizData } = useBlindTypingLogics({
    bookIds,
    count: quizCount,
    memorizedFilter,
  });

  const [isConfirmPopOpen, setIsConfirmPopOpen] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // 렌더링용 배열 데이터
  const [currentQuiz, setCurrentQuiz] = useState<IBlindCurrentQuiz[]>([
    { answer: { word: '', mean: '' }, is_memorized: false, word_id: 0 },
    { answer: { word: '', mean: '' }, is_memorized: false, word_id: 0 },
    { answer: { word: '', mean: '' }, is_memorized: false, word_id: 0 },
    { answer: { word: '', mean: '' }, is_memorized: false, word_id: 0 },
  ]);

  const [btnMsg, setBtnMsg] = useState('정답 보기'); // 돌아가기 다음 정답 보기

  // functions
  const setQuiz = () => {
    const newQuiz = [...currentQuiz];

    newQuiz[4] = {
      ...newQuiz[4], // 기존 요소의 값을 복사
      userAnswer: myAnswer, // 새로운 키와 값 추가
    };

    newQuiz.shift();

    setCurrentQuiz(newQuiz.concat(blindQuizData.splice(0, 1)));
  };

  // 다음 버튼
  const onNext = () => {
    if (!showAnswer) {
      setShowAnswer(true);
      setBtnMsg('정답 보기');
      return;
    }

    if (showAnswer) {
      if (currentQuiz.length === ENDPOINT) {
        localStorage.setItem('reviewNote', JSON.stringify(reviewNote));
        navigate('/learn/result', {
          state: {
            bookIds,
            count: quizCount,
            correct: result,
            quizType: 'select',
          },
        });
        toast.comment('퀴즈가 종료되었습니다.');
        return;
      }
      setMyAnswer('');
      setQuiz();
      setShowAnswer(false);
    }
  };

  // 나가기 기능
  const onExitQuiz = () => {
    setIsConfirmPopOpen(true);
  };

  // 답 제출
  const [myAnswer, setMyAnswer] = useState('');

  const inputMyAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setMyAnswer(e.target.value);
  };

  const inputEnterEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onNext();
    }
  };

  const [reviewNote, setReviewNote] = useState<IReviewNote[]>([]);

  const [result, setResult] = useState(0); // 맞춘 정답수

  // 초기 실행 함수
  const initFunction = () => {
    if (blindQuizData.length !== 0) {
      const newData = currentQuiz.concat(blindQuizData.splice(0, 5));

      setCurrentQuiz(
        newData.filter((item) => item !== undefined) as BlindQuizData[],
      );
    }
  };

  // 초기 세팅
  useEffect(() => {
    localStorage.removeItem('reviewNote');
    if (blindQuizData) {
      initFunction();
    }
  }, [blindQuizData]);

  // 오답노트
  useEffect(() => {
    let answer = '';
    if (currentQuiz[4]) {
      switch (mode) {
        case 'word':
          answer = currentQuiz[4].answer.mean;
          break;
        case 'mean':
          answer = currentQuiz[4].answer.mean;
          break;
        default:
          answer = currentQuiz[4].answer.mean;
          break;
      }
    }

    if (showAnswer && myAnswer !== answer) {
      setResult((count) => count + 1);

      setReviewNote((prevItem) => [
        ...prevItem,
        {
          word: currentQuiz[4].answer.word,
          mean: currentQuiz[4].answer.mean,
          isMemo: currentQuiz[4].is_memorized, // API 데이터로 요청할 것
          wordId: currentQuiz[4].word_id, // 숫자 변경 요망
        },
      ]);
    }
  }, [showAnswer, myAnswer]);

  //Components
  // API 빈 배열 방지용
  if (currentQuiz.length === 0 || !mode) return null;

  return (
    <Container>
      <ConfirmPop
        isOpen={isConfirmPopOpen}
        height="180px"
        cancelText="뒤로가기"
        confirmText="그만하기"
        onCancel={() => setIsConfirmPopOpen(false)}
        onConfirm={() => {
          setIsConfirmPopOpen(false);
          navigate('/learn');
        }}
        type="title"
        title="암기를 중단할까요?"
      />
      <TopAppBarClose onClose={onExitQuiz} />

      <Content>
        <QuizWrapper>
          {currentQuiz.map((item, idx) => {
            let quiz = '';
            if (mode === 'word') quiz = item.answer.word;
            if (mode === 'mean') quiz = item.answer.mean;

            return <QuizBox key={idx} word={quiz} />;
          })}
        </QuizWrapper>
        <AnswerWrapper>
          {currentQuiz.map((item, idx) => {
            let answer = '';
            if (mode === 'word') answer = item.answer.mean;
            if (mode === 'mean') answer = item.answer.word;

            if (idx === 4) {
              return (
                <Div key={idx}>
                  {!showAnswer && (
                    <UserInput
                      onChange={inputMyAnswer}
                      onKeyDown={inputEnterEvent}
                      placeholder="정답 입력"
                    />
                  )}
                  {showAnswer && (
                    <Result>
                      {myAnswer !== answer && (
                        <>
                          <MyAnswer isCorrect={false}>
                            {myAnswer === '' ? ' ' : myAnswer}
                          </MyAnswer>
                          <CorrectAnswer>{answer}</CorrectAnswer>
                        </>
                      )}

                      {myAnswer === answer && (
                        <MyAnswer isCorrect={true}>{answer}</MyAnswer>
                      )}
                    </Result>
                  )}
                </Div>
              );
            } else {
              return (
                <AnswerBox
                  key={idx}
                  showAnswer={showAnswer}
                  answer={answer}
                  userAnswer={item.userAnswer}
                />
              );
            }
          })}
        </AnswerWrapper>
      </Content>

      <Footer>
        {/* <WideButton onClick={onNext}>{btnMsg}</WideButton> */}
        <WideButton onClick={onNext}>
          {!showAnswer && '정답 보기'}
          {showAnswer && currentQuiz.length !== ENDPOINT && '다음'}
          {showAnswer && currentQuiz.length === ENDPOINT && '결과 보기'}
        </WideButton>
      </Footer>
    </Container>
  );
};

export default ShortBlindPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  padding-bottom: 36px;
`;

const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const QuizWrapper = styled(Wrapper)``;

const AnswerWrapper = styled(Wrapper)``;

const Div = styled.div`
  width: 100%;
  height: 10%;
  flex-shrink: 0;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 8px;
  margin-top: 1.25%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
  ${({ theme }) => theme.typography.pretendard.t2.sbd};
`;

const UserInput = styled.input`
  width: 100%;
  height: 100%;

  font-weight: bold;
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const Result = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const MyAnswer = styled.div<{ isCorrect: boolean }>`
  width: auto;
  height: 100%;
  margin-right: 8px;
  display: flex;
  justify-content: start;
  align-items: center;

  ${({ isCorrect }) => {
    if (isCorrect) {
      return css`
        color: ${({ theme }) => theme.colors.secondary.default};
      `;
    } else {
      return css`
        color: ${({ theme }) => theme.colors.error};
        text-decoration: line-through;
      `;
    }
  }}
`;

const CorrectAnswer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Footer = styled.footer`
  width: 100%;
  height: 48px;
  flex-shrink: 0;
  padding: 0 20px;
  margin-bottom: 32px;
`;
