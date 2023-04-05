import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import xButton from '@/assets/svg/icons/icon-x-button.svg';

const ShortQuestionPage = () => {
  const navigate = useNavigate();

  const goChoice = () => {
    navigate('/quiz/choice');
  };

  const word = 'only';

  return (
    <MainWrapper>
      <Header>
        <button onClick={goChoice}>
          <img src={xButton} alt="" />
        </button>
        <div>문제풀기</div>
      </Header>

      <Content>
        <ProgressBar value={20} max={100} />

        <ProgressWrapper>
          <ProgressIndex>
            {1}/{10}
          </ProgressIndex>
          <ProgressTime value={20} max={100} />
        </ProgressWrapper>

        <Word>{word}</Word>

        <Answer type="text" />
      </Content>
    </MainWrapper>
  );
};

export default ShortQuestionPage;

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

const Answer = styled.input`
  width: 270px;
  border-bottom: 1px solid #000000;
  outline: none;
  text-align: center;
`;
