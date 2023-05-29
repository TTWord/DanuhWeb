import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, FC } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { globalState } from '@/recoil';
import { api } from '@/api';

import xButton from '@/assets/svg/icons/icon-x-button.svg';
import CheckSVG from '@/pages/quiz/choice/ChoiceQuestion/svg/CheckSVG';

const ChoiceQuestionPage = () => {
  const testQuizList = [
    {
      answer_index: 3,
      answers: [
        ['c', '씨'],
        ['mean', '뜻'],
        ['matter', '문제'],
        ['word', '단어'],
      ],
    },
    {
      answer_index: 2,
      answers: [
        ['a', '에이'],
        ['word', '단어'],
        ['cow', '소'],
        ['b', '비'],
      ],
    },
    {
      answer_index: 0,
      answers: [
        ['matter', '문제'],
        ['d', '디'],
        ['pig', '돼지'],
        ['c', '씨'],
      ],
    },
    {
      answer_index: 3,
      answers: [
        ['word', '단어'],
        ['d', '디'],
        ['cow', '소'],
        ['a', '에이'],
      ],
    },
    {
      answer_index: 2,
      answers: [
        ['matter', '문제'],
        ['d', '디'],
        ['pig', '돼지'],
        ['b', '비'],
      ],
    },
    {
      answer_index: 1,
      answers: [
        ['a', '에이'],
        ['b', '비'],
        ['c', '씨'],
        ['d', '디'],
      ],
    },
    {
      answer_index: 3,
      answers: [
        ['word', '단어'],
        ['pig', '돼지'],
        ['b', '비'],
        ['d', '디'],
      ],
    },
    {
      answer_index: 0,
      answers: [
        ['mean', '뜻'],
        ['c', '씨'],
        ['cow', '소'],
        ['word', '단어'],
      ],
    },
    {
      answer_index: 3,
      answers: [
        ['cow', '소'],
        ['pig', '돼지'],
        ['mean', '뜻'],
        ['c', '씨'],
      ],
    },
  ];

  const navigate = useNavigate();

  //const problems = [...useRecoilValue(globalState.quiz.quizList)];
  const [problems, setProblems] = useState([]);
  // 현재 문제 목록
  const [currentQuiz, setCurrentQuiz] = useState([]);
  // 정답 번호
  const [answerIndex, setAnswerIndex] = useState('');
  // 맞출 문제
  const [answer, SetAnswer] = useState([]);

  const [testResult, setTestResult] = useRecoilState(globalState.quiz.result);

  const memorizedFilter: boolean = false;

  const goChoice = () => {
    navigate('/quiz/choice');
  };

  // 맞춘 정답수
  const [result, setResult] = useState(0);
  // 문제 길이
  //const length = testQuizList.length;
  const length = problems.length;
  // 문제 진행도
  const [number, setNumber] = useState(0);

  // 문제 가져오기
  const extractQuiz = (value: any, number: number) => {
    const result = value[number];

    if (result) {
      setCurrentQuiz(result.answers);
      setAnswerIndex(result.answer_index);
      SetAnswer(result.answers[result.answer_index]);
    }
  };

  const getQuizList = async (
    bookID: string,
    count: number,
    memorizedFilter: boolean,
  ) => {
    try {
      const { data: response } = await api.quiz.getChoiceQuiz(
        bookID,
        count,
        memorizedFilter,
      );

      if (response.status === 'OK') {
        const getData = response.data.problem;
        setProblems(getData);
        extractQuiz(getData, number);
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(
    '전역: ',
    '테스트결과',
    testResult,
    '현재숫자',
    number,
    '총 문제수',
    length,
    '문제들',
    problems,
  );

  useEffect(() => {
    getQuizList('83', 10, false);
  }, []);

  useEffect(() => {
    //extractQuiz(problems, number);
    //console.log('2번째 useEffect 호출');
    //console.log(number, problems);
    extractQuiz(testQuizList, number);
  }, [number]);

  // 버튼에서 사용할 함수
  const selectAnswer = (select: string) => {
    console.log('현재 문제 번호와 전체 길이', number, length);

    if (number + 1 !== length) {
      if (select === answer[1]) {
        console.log(`${number + 1}의 고른 답과 정답: ${select}, ${answer[1]}`);
        //setResult(current => current + 1);
        setTestResult(current => current + 1);
      }
    } else {
      if (select === answer[1]) {
        console.log(`${number + 1}의 고른 답과 정답: ${select}, ${answer[1]}`);
        setTestResult(current => current + 1);
        console.log('테스트 종료: ', testResult, length);
      } else {
        console.log('테스트 종료: ', testResult, length);
      }

      navigate('/quiz/result', {
        state: {
          length: length,
          answer: testResult,
          result: (testResult / length) * 100,
        },
      });
    }
  };

  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const CreateChoiceButtons = (props: any) => {
    return (
      <ChoiceButton
        onClick={() => {
          selectAnswer(props.example);
          //setNumber(number + 1);
          console.log('버튼 내부');
          setIsAnswered(current => !current);
        }}
      >
        {props.example}
      </ChoiceButton>
    );
  };

  return (
    <MainWrapper>
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

          <ProgressTime value={20} max={100} />
        </ProgressWrapper>
      </Header>

      <Content>
        {/* 문제 컴포넌트 */}
        {!isAnswered && <Word>{answer[0]}</Word>}

        {/* 정답 컴포넌트 */}
        {isAnswered && (
          <div>
            <Word>{answer[0]}</Word>
            <Word>{answer[1]}</Word>
          </div>
        )}
      </Content>

      <Footer>
        {/* 문제 컴포넌트 */}
        {!isAnswered &&
          currentQuiz.map((items, index) => {
            return <CreateChoiceButtons key={index} example={items[1]} />;
          })}

        {/* 정답 컴포넌트 */}
        {isAnswered && (
          <button
            onClick={() => {
              setIsCheck(current => !current);
            }}
          >
            <CheckSVG fill={isCheck ? '#4ABC56' : '#FFFFFF'} />
          </button>
        )}
      </Footer>
    </MainWrapper>
  );
};

export default ChoiceQuestionPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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

const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 52px;
  margin-bottom: 32px;
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
  margin-bottom: 16px;
`;
