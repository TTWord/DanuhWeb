import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import iconClose from '@/assets/svg/icons/icon-close.svg';

import { globalState } from '@/recoil';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

const FlashCardMeanPage = () => {
  const navigate = useNavigate();
  const memoList = [...useRecoilValue(globalState.memo.memoList)];

  const [pageNum, setPageNum] = useState(0);
  const [showWord, setShowWord] = useState(false);

  // 나가기 기능
  const onExitQuiz = () => {
    navigate('/quiz/flashcard');
  };

  const onNext = () => {
    if (!showWord) {
      setShowWord(true);
      return;
    }

    if (showWord) {
      if (pageNum === memoList.length - 1) {
        navigate('/quiz/flashcard');
        return;
      }

      setPageNum(pageNum + 1);
      setShowWord(false);
    }
  };

  return (
    <Container>
      <Header>
        <ExitButton onClick={onExitQuiz}>
          <img src={iconClose} alt="close-button" />
        </ExitButton>
      </Header>

      <Content>
        <Card>
          <Mean>{memoList[pageNum].mean}</Mean>
          <Word isShow={showWord}>{memoList[pageNum].word}</Word>
        </Card>
      </Content>

      <Footer>
        <NextButton onClick={onNext}>
          {showWord && pageNum === memoList.length - 1 && '돌아가기'}
          {showWord && pageNum !== memoList.length - 1 && '정답 보기'}
          {!showWord && '다음'}
        </NextButton>
      </Footer>
    </Container>
  );
};

export default FlashCardMeanPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const ExitButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 13px;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 280px;
  height: 360px;
  box-shadow: 0px 0px 16px rgba(203, 189, 243, 0.4);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Mean = styled.div`
  font-weight: 600;
  font-size: 36px;
`;

const Word = styled.div<{
  isShow: boolean;
}>`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary.default};
  display: none;

  ${({ isShow }) => isShow && `display: block`}
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`;

const NextButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.primary[200]};
  margin-bottom: 50px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.default};
  border: 1px solid ${({ theme }) => theme.colors.primary[400]};
`;
