import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { globalState } from '@/recoil';
import xButton from '@/assets/svg/icons/icon-x-button.svg';

const ChoiceQuestionPage = () => {
  const navigate = useNavigate();

  const problems = [...useRecoilValue(globalState.quiz.quizList)];
  // 현재 문제 목록
  const [currentQuiz, setCurrentQuiz] = useState([]);
  // 정답 번호
  const [answerIndex, setAnswerIndex] = useState('');
  // 맞출 문제
  const [answer, SetAnswer] = useState([]);

  const goChoice = () => {
    navigate('/quiz/choice');
  };

  // 맞춘 정답수
  const [result, setResult] = useState(0);
  // 문제 길이
  const length = problems.length;
  // 문제 진행도
  const [number, setNumber] = useState(length !== 0 ? 1 : 0);

  // 문제 가져오기
  const extractQuiz = (value, number) => {
    const result = value[number];

    if (result) {
      setCurrentQuiz(result.answers);
      setAnswerIndex(result.answer_index);
      SetAnswer(result.answers[result.answer_index]);
    }
  };

  useEffect(() => {
    // 받아온 퀴즈의 가장 앞 부분 추출, 요소 검사
    extractQuiz(problems, 0);
  }, []);

  // 버튼에서 사용할 함수
  const selectAnswer = select => {
    if (number !== 10) {
      if (select === answer[1]) {
        setResult(current => current + 1);
      }
      setNumber(number + 1);
      extractQuiz(problems, number);
    } else {
      navigate('/quiz/result', { state: { result: (result / length) * 100 } });
    }
  };

  const CreateChoiceButtons = props => {
    return (
      <ChoiceButton
        onClick={() => {
          selectAnswer(props.example);
        }}
      >
        {props.example}
      </ChoiceButton>
    );
  };

  return (
    <MainWrapper>
      <Header>
        <button onClick={goChoice}>
          <img src={xButton} alt="" />
        </button>
        <div>문제풀기</div>
      </Header>

      <Content>
        <ProgressBar value={number * (100 / length)} max={100} />

        <ProgressWrapper>
          <ProgressIndex>
            {number}/{length}
          </ProgressIndex>
          <ProgressTime value={20} max={100} />
        </ProgressWrapper>

        <Word>{answer[0]}</Word>

        <ChoiceWrapper>
          {currentQuiz.map((items, index) => {
            return <CreateChoiceButtons key={index} example={items[1]} />;
          })}
        </ChoiceWrapper>
      </Content>
    </MainWrapper>
  );
};

export default ChoiceQuestionPage;

const MainWrapper = styled.div`
  width: 100%;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    position: absolute;
    left: 12px;
  }
  div {
    padding-top: 6px;
    font-weight: 300;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    color: #0d0d0d;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  font-weight: 700;
  font-size: 64px;
  line-height: 93px;
  text-align: center;
  color: #0d0d0d;
  margin: 120px 0 132px 0;
`;

const ChoiceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ChoiceButton = styled.button`
  width: 278px;
  height: 73px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  font-weight: 700;
  font-size: 32px;
  line-height: 46px;
  text-align: center;
  color: #0d0d0d;
  margin-bottom: 16px;
`;
