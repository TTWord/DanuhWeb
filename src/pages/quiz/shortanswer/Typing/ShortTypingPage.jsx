import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { globalState } from '@/recoil';
import xButton from '@/assets/svg/icons/icon-x-button.svg';

const ShortTypingPage = () => {
  const navigate = useNavigate();
  const answerRef = useRef();

  const problems = [...useRecoilValue(globalState.quiz.quizList)];
  const [currentQuiz, setCurrentQuiz] = useState([]);

  // 맞춘 정답수
  const [result, setResult] = useState(0);
  // 문제 길이
  const length = problems.length;
  // 문제 진행도
  const [number, setNumber] = useState(length !== 0 ? 1 : 0);

  const next = e => {
    if (e.target.innerText === '다음') {
      if (answerRef.current.value === currentQuiz[1]) {
        setResult(current => current + 1);
      }
      setNumber(number + 1);
      setCurrentQuiz(extractQuiz(problems, number));
      answerRef.current.value = '';
    } else if (e.target.innerText === '제출') {
      navigate('/quiz/result', { state: { result: (result / length) * 100 } });
    }
  };

  const goChoice = () => {
    navigate('/quiz/shortanswer');
  };

  // 퀴즈 목록에서 제일 앞 부분 가져오기 => shift 사용했음에도 problems의 요소 제거가 안되는 중
  // const extractQuiz = value => {
  //   const result = value.shift();
  //   console.log(value);
  //   if (result) {
  //     return result.answer;
  //   }
  // };

  // 문제 가져오기
  const extractQuiz = (value, number) => {
    const result = value[number];
    if (result) {
      return result.answer;
    }
  };

  useEffect(() => {
    // 받아온 퀴즈의 가장 앞 부분 추출, 요소 검사
    const firstQuiz = extractQuiz(problems, 0);
    if (firstQuiz) {
      setCurrentQuiz(firstQuiz);
    }
  }, []);

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

        <Word>{currentQuiz[0]}</Word>

        <Answer type="text" ref={answerRef} />
      </Content>
      <NextButton onClick={next}>
        {number === length ? '제출' : '다음'}
      </NextButton>
    </MainWrapper>
  );
};

export default ShortTypingPage;

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Answer = styled.input`
  width: 270px;
  border-bottom: 1px solid #000000;
  outline: none;
  text-align: center;
`;

const NextButton = styled.button`
  width: 216px;
  height: 72px;
  font-size: 20px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #724fab;
  margin-top: 200px;
  color: #ffffff;
  border-radius: 7px;
`;
