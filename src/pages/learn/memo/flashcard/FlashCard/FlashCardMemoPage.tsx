import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import iconClose from '@/assets/svg/icons/icon-close.svg';
import { useEffect, useState } from 'react';
import ConfirmPop from '@/components/common/popup/ConfirmPop';
import useGetFlashcardMemo from './hooks/useGetFlashcardMemo';

const FlashCardMemoPage = () => {
  const navigate = useNavigate();
  const getMemo = useGetFlashcardMemo();
  const location = useLocation();
  const count = 10; // 옵션으로 빼야함

  const { bookIds, mode } = location.state as {
    bookIds: number[];
    mode: 'word' | 'mean';
  };

  const [memoList, setMemoList] = useState([
    { is_memorized: 0, mean: '', word: '' },
  ]);

  const [isConfirmPopOpen, setIsConfirmPopOpen] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [showWord, setShowWord] = useState(false);

  const getMemoList = async () => {
    const { data: response } = await getMemo({ bookIds, count });
    setMemoList(response.words);
  };

  useEffect(() => {
    if (bookIds) {
      getMemoList();
    }
  }, [bookIds]);

  // 나가기 기능
  const onExitQuiz = () => {
    setIsConfirmPopOpen(true);
  };

  const onNext = () => {
    if (!showWord) {
      setShowWord(true);
      return;
    }

    if (showWord) {
      if (pageNum === memoList.length - 1) {
        navigate('/learn/memo', {
          state: {
            type: 'flashcard',
          },
        });
        return;
      }

      setPageNum(pageNum + 1);
      setShowWord(false);
    }
  };

  if (memoList.length === 0) return null;

  return (
    <Container>
      <ConfirmPop
        isOpen={isConfirmPopOpen}
        cancelText="뒤로가기"
        confirmText="그만하기"
        height="180px"
        onCancel={() => setIsConfirmPopOpen(false)}
        onConfirm={() => {
          setIsConfirmPopOpen(false);
          navigate('/learn/memo', {
            state: {
              type: 'flashcard',
            },
          });
        }}
      >
        <ConfirmPop.Title>암기를 중단할까요?</ConfirmPop.Title>
      </ConfirmPop>
      <Header>
        <ExitButton onClick={onExitQuiz}>
          <img src={iconClose} alt="close-button" />
        </ExitButton>
      </Header>

      <Content>
        {mode === 'word' && (
          <Card>
            <BigText>{memoList[pageNum].word}</BigText>
            <SmallText isShow={showWord}>{memoList[pageNum].mean}</SmallText>
          </Card>
        )}
        {mode === 'mean' && (
          <Card>
            <BigText>{memoList[pageNum].mean}</BigText>
            <SmallText isShow={showWord}>{memoList[pageNum].word}</SmallText>
          </Card>
        )}
      </Content>

      <Footer>
        <NextButton onClick={onNext}>
          {showWord && pageNum === memoList.length - 1 && '돌아가기'}
          {showWord && pageNum !== memoList.length - 1 && '다음'}
          {!showWord && '정답 보기'}
        </NextButton>
      </Footer>
    </Container>
  );
};

export default FlashCardMemoPage;

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

const BigText = styled.div`
  font-weight: 600;
  font-size: 36px;
`;

const SmallText = styled.div<{
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
