import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConfirmPop from '@/components/common/popup/ConfirmPop';
import useGetFlashcardMemo from './hooks/useGetFlashcardMemo';
import TopAppBarClose from '@/components/common/header/TopAppBarClose';

const FlashCardMemoPage = () => {
  const navigate = useNavigate();
  const getMemo = useGetFlashcardMemo();
  const location = useLocation();

  const { bookIds, mode, quizCount } = location.state as {
    bookIds: number[];
    mode: 'word' | 'mean';
    quizCount: number;
  };

  const count = quizCount; // 옵션으로 빼야함

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

  const showMessage = localStorage.getItem('showMemoMessage');

  const onNext = () => {
    if (showMessage !== '1') {
      localStorage.setItem('showMemoMessage', '1');
    }

    if (!showWord) {
      setShowWord(true);
      return;
    }

    if (showWord) {
      if (pageNum === memoList.length - 1) {
        navigate('/learn');
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
          navigate('/learn');
        }}
        type="title"
        title="암기를 중단할까요?"
      />

      <TopAppBarClose onClose={onExitQuiz} />

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
        {showMessage !== `1` && (
          <GuideMessage>
            <Message>정답을 살짝 확인할 수 있어요</Message>
            <Triangle />
          </GuideMessage>
        )}
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
  margin-bottom: 8px;
`;

const SmallText = styled.div<{
  isShow: boolean;
}>`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary.default};
  display: none;
  justify-content: center;

  ${({ isShow }) => isShow && `display: block`}
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  position: relative;
`;

const GuideMessage = styled.div`
  position: absolute;
  bottom: 112px;
  right: 50%;
  transform: translateX(50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray[900]};
`;

const Message = styled.span`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 15.84px */
  letter-spacing: -0.6px;
`;

const Triangle = styled.div`
  position: absolute;
  bottom: -8px;
  right: 36%;
  width: 0px;
  height: 0px;
  border-top: 8px solid ${({ theme }) => theme.colors.gray[900]};
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
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
