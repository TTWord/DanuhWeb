import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import xButton from '@/assets/svg/icons/icon-x-button.svg';
import arrowButton from '@/assets/svg/icons/icon-next-arrow.svg';

const FlashCardMeanPage = () => {
  const navigate = useNavigate();

  const word = '오직';

  const dummy = () => {
    console.log(1);
  };

  const goFlashcard = () => {
    navigate('/quiz/flashcard');
  };
  return (
    <MainWrapper>
      <Header>
        <QuitButton onClick={goFlashcard}>
          <img src={xButton} alt="xbutton" />
        </QuitButton>
        <Title>한글 암기</Title>
      </Header>

      <Content>
        <PreviousButton onClick={dummy} src={arrowButton} />
        <Word>{word}</Word>
        <NextButton onClick={dummy} src={arrowButton} />
      </Content>

      <Footer>
        <FooterButton>정답보기</FooterButton>
      </Footer>
    </MainWrapper>
  );
};

export default FlashCardMeanPage;

const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  position: absolute;
  top: 31px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const QuitButton = styled.button`
  position: absolute;
  left: 32px;
  img {
    width: 20px;
  }
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 0px;
  color: #444444;
  padding-top: 4px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
const Word = styled.div`
  font-weight: 700;
  font-size: 64px;
  line-height: 93px;
  text-align: center;
  color: #0d0d0d;
  margin: 0 80px;
`;

const PreviousButton = styled.img`
  transform: rotate(180deg);
  :hover {
    cursor: pointer;
  }
  //filter: invert(81%) sepia(1%) saturate(652%) hue-rotate(339deg) brightness(98%) contrast(84%);
`;
const NextButton = styled.img`
  :hover {
    cursor: pointer;
  }
`;

const Footer = styled.div`
  position: absolute;
  bottom: 35px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const FooterButton = styled.button`
  width: 215px;
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
