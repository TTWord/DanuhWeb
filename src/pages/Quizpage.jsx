import styled from 'styled-components';
import tw from 'twin.macro';
import { useNavigate } from 'react-router-dom';

import Footer from '@/components/layout/HomeLayout/Footer';

const QuizPage = () => {
  const navigate = useNavigate();

  const goFlashcard = () => {
    navigate('/quiz/flashcard');
  };
  const goChoiceQuiz = () => {
    navigate('/quiz/choice');
  };
  const goShortQuiz = () => {
    navigate('/quiz/shortanswer');
  };

  return (
    <MainWrapper>
      <HeaderWrapper>
        <PageTitle>Quiz</PageTitle>
      </HeaderWrapper>

      <ContainerWrapper>
        <Container>
          <QuizTitle>암기하기</QuizTitle>
          <SelectWrapper>
            <SelectButton onClick={goFlashcard}>Flashcard</SelectButton>
          </SelectWrapper>
        </Container>
        <Container>
          <QuizTitle>문제 풀기</QuizTitle>
          <SelectWrapper>
            <SelectButton onClick={goChoiceQuiz}>객관식</SelectButton>
            <SelectButton onClick={goShortQuiz}>주관식</SelectButton>
          </SelectWrapper>
        </Container>
      </ContainerWrapper>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </MainWrapper>
  );
};

export default QuizPage;

//-- 웹 --//
const MainWrapper = tw.div`w-[100%] h-[100%] overflow-hidden flex flex-col absolute`;

//-- 헤더 --//
const HeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 43px;
`;
const PageTitle = styled.div`
  width: 100%;
  padding: 23px 0 0 23px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: black;
`;

//-- 컨테이너 --//
const ContainerWrapper = styled.div`
  width: 100%;
  padding-bottom: 70px;
`;
const Container = styled.div`
  width: 100%;
  margin-bottom: 48px;
`;
const QuizTitle = styled.div`
  width: 100%;
  padding: 0 0 13px 22px;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  color: #333333;
  color: black;
  border-bottom: 1px solid black;
  margin-bottom: 19px;
`;
const SelectWrapper = styled.div`
  width: 100%;
  padding: 0 14px 0 22px;
  display: flex;
  flex-wrap: wrap;
`;
const SelectButton = styled.button`
  width: 170px;
  height: 150px;
  background-color: #606060;
  border-radius: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  margin: 0 8px 8px 0;
`;

//-- 푸터 --//
const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  display: flex;
  background: #ffffff;
`;
