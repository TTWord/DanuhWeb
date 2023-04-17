import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const percentage = location.state.result;

  const goQuiz = () => {
    navigate('/quiz');
  };

  return (
    <MainWrapper>
      <Header>RESULT</Header>
      <ContentWrapper>
        <AnswerRate>정답률</AnswerRate>
        <Percentage>{percentage || 0}%</Percentage>
      </ContentWrapper>
      <CompleteButton onClick={goQuiz}>완료</CompleteButton>
    </MainWrapper>
  );
};

export default ResultPage;

const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Header = styled.div`
  position: absolute;
  top: 27px;
  font-weight: 700;
  font-size: 36px;
  line-height: 36px;
  text-align: center;
  color: #0d0d0d;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const AnswerRate = styled.div`
  font-weight: 300;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  color: #0d0d0d;
  margin-bottom: 15px;
`;

const Percentage = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 46px;
  text-align: center;
  color: #0d0d0d;
`;

const CompleteButton = styled.button`
  position: absolute;
  bottom: 42px;
  width: 216px;
  height: 72px;
  background: #724fab;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  font-weight: 400;
  font-size: 24px;
  line-height: 35px;
  text-align: center;
  color: #ffffff;
`;
