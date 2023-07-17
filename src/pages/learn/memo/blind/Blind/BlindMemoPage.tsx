import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import iconClose from '@/assets/svg/icons/icon-close.svg';
import { useEffect, useState } from 'react';
import ConfirmPop from '@/components/common/popup/ConfirmPop';
import useGetBlindMemo from '@/pages/learn/memo/blind/Blind/hooks/useGetBlindMemo';

const BlindMemoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookIds, mode } = location.state as {
    bookIds: number[];
    mode: 'word' | 'mean';
  };
  const getBlind = useGetBlindMemo();
  const [memoList, setMemoList] = useState([
    {
      word: '',
      mean: '',
    },
  ]);

  const [isConfirmPopOpen, setIsConfirmPopOpen] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [showWord, setShowWord] = useState(false);

  const getBlindAPI = async () => {
    const { data: response } = await getBlind({
      bookIds,
      count: 10,
    });
    const data = response.problem;

    // 블라인드 api로부터 데이터에서 사용할 데이터 추출을 위한 임시 배열
    const tempArray: any = [];
    data.map((item: { answer: { word: string; mean: string } }) => {
      tempArray.push(item.answer);
    }),
      setMemoList(tempArray);
  };

  useEffect(() => {
    if (bookIds) {
      getBlindAPI();
    }
  }, [bookIds]);

  // 나가기 기능
  const onExitQuiz = () => {
    setIsConfirmPopOpen(true);
    // navigate('/learn/flashcard');
  };

  const onNext = () => {
    if (!showWord) {
      setShowWord(true);
      return;
    }

    if (showWord) {
      if (pageNum === memoList.length - 1) {
        navigate('/learn/flashcard');
        return;
      }

      setPageNum(pageNum + 1);
      setShowWord(false);
    }
  };

  if (memoList.length === 0 || !mode) return null;

  return (
    <Container>
      <ConfirmPop
        isOpen={isConfirmPopOpen}
        message="암기를 중단할까요?"
        cancelText="뒤로가기"
        confirmText="그만하기"
        onCancel={() => setIsConfirmPopOpen(false)}
        onConfirm={() => {
          setIsConfirmPopOpen(false);
          navigate('/learn/memo', {
            state: {
              type: 'blind',
            },
          });
        }}
      />
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
          {showWord && pageNum !== memoList.length - 1 && '정답 보기'}
          {!showWord && '다음'}
        </NextButton>
      </Footer>
    </Container>
  );
};

export default BlindMemoPage;

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
