import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import arrowBackImg from '@/assets/svg/icons/icon-arrow-back-button.svg';

const FlashCardPage = () => {
  const navigate = useNavigate();

  return (
    <MainWrapper>
      <Header>
        <BackButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={arrowBackImg} alt="arrowBackImg" />
        </BackButton>
      </Header>

      <Container>
        <QuizName>FLASHCARD</QuizName>
        <BookSelect>단어장 선택</BookSelect>
        <Book>단어장1</Book>
        <Book>단어장2</Book>
      </Container>

      <Footer>
        <WordQuizButton>단어암기</WordQuizButton>
        <MeanQuizButton>뜻암기</MeanQuizButton>
      </Footer>
    </MainWrapper>
  );
};

export default FlashCardPage;

const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 27px;
`;

//-- Header 영역 --//
const Header = styled.div`
  width: 100%;
  height: 61px;
  background: #ffffff;
  padding: 25px 0 0 21px;
  margin-bottom: 227px;
`;
const BackButton = styled.button`
  width: 36px;
  height: 36px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 95px;
`;
const QuizName = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 36px;
  line-height: 36px;
  text-align: center;
  color: #444444;
  margin-bottom: 23px;
`;
const BookSelect = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  text-align: center;
  color: #444444;
  margin-bottom: 27px;
`;
const Book = styled.div`
  width: 279px;
  height: 40px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 13px;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 23px;
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
`;
const WordQuizButton = styled.button`
  width: 158px;
  height: 72px;
  background: #724fab;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  font-weight: 300;
  font-size: 24px;
  display: felx;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const MeanQuizButton = styled(WordQuizButton)`
  margin-left: 19px;
`;
