import styled from 'styled-components';
import xButton from '@/assets/svg/icons/icon-x-button.svg';
import { useNavigate } from 'react-router-dom';

interface QuizHeaderParams {
  type: string;
  number: number;
  total: number;
  timer: number;
  timeMax: number;
}

const QuizHeader = ({
  type,
  number,
  total,
  timer,
  timeMax,
}: QuizHeaderParams) => {
  const navigate = useNavigate();
  const goChoice = () => {
    navigate('/learn/quiz', {
      state: {
        type,
      },
    });
  };

  return (
    <Header>
      <TitleWrapper>
        <button onClick={goChoice}>
          <img src={xButton} alt="xButton" />
        </button>
        <Title>문제풀기</Title>
      </TitleWrapper>

      <ProgressWrapper>
        <ProgressBar value={(number + 1) * (100 / total)} max={100} />

        <ProgressIndex>
          {number + 1}/{total}
        </ProgressIndex>

        <ProgressTime value={(timer / timeMax) * 100} max={100} />
      </ProgressWrapper>
    </Header>
  );
};

export default QuizHeader;

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

const ProgressWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
