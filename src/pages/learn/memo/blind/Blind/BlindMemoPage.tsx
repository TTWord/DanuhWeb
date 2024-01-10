import styled, { css } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConfirmPop from '@/components/common/popup/ConfirmPop';
import useGetBlindMemo from '@/pages/learn/memo/blind/Blind/hooks/useGetBlindMemo';
import TopAppBarClose from '@/components/common/header/TopAppBarClose';
import WideButton from '@/components/common/button/WideButton';

const ENDPOINT = 5;

const BlindMemoPage = () => {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  const getBlind = useGetBlindMemo();

  //variables
  const { bookIds, mode, quizCount } = location.state as ILearnOptions;
  // api로 받아온 데이터 저장 변수
  const [memoList, setMemoList] = useState([
    {
      word: '',
      mean: '',
    },
  ]);
  const [isConfirmPopOpen, setIsConfirmPopOpen] = useState(false);
  const [showWord, setShowWord] = useState(false);
  // 렌더링용 배열 데이터
  const [blindData, setBlindData] = useState([
    { word: '', mean: '' },
    { word: '', mean: '' },
    { word: '', mean: '' },
    { word: '', mean: '' },
  ]);

  // functions
  const getBlindAPI = async () => {
    const { data: response } = await getBlind({
      bookIds,
      count: quizCount,
    });

    const data = response.words;
    setMemoList(data);
  };
  // 나가기 기능
  const onExitQuiz = () => {
    setIsConfirmPopOpen(true);
  };

  // 초기 실행 함수
  const initFunction = () => {
    if (memoList.length !== 0) {
      //concat과 splice 정리해보기
      const newData = blindData.concat(memoList.splice(0, ENDPOINT));
      setBlindData(
        newData.filter((item) => item !== undefined) as {
          word: string;
          mean: string;
        }[],
      );
    }
  };

  // 그 다음 진행할 함수 (마지막 단어 세트가 가운데 올때까지 실행)
  const setNextWords = () => {
    if (blindData.length !== ENDPOINT) {
      blindData.shift();
      const newData = blindData.concat(memoList.splice(0, 1));
      setBlindData(
        newData.filter((item) => item !== undefined) as {
          word: string;
          mean: string;
        }[],
      );
    }
  };

  // 다음 버튼
  const onNext = () => {
    if (!showWord) {
      setShowWord(true);
      return;
    }

    if (showWord) {
      if (blindData.length === ENDPOINT) {
        navigate('/learn');
        return;
      }

      setNextWords();
      setShowWord(false);
    }
  };

  // useEffects
  useEffect(() => {
    if (bookIds) {
      getBlindAPI();
    }
  }, []);

  // 초기 세팅
  useEffect(() => {
    if (memoList[0].word !== '') {
      initFunction();
    }
  }, [memoList]);

  //Components
  // API 빈 배열 방지용
  if (blindData.length === 0 || !mode) return null;

  return (
    <Container>
      <ConfirmPop
        isOpen={isConfirmPopOpen}
        height="180px"
        cancelText="뒤로가기"
        confirmText="그만하기"
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
          <>
            <WordWrapper>
              {blindData.map((item, idx) => {
                return <WordBox key={idx}>{item.word}</WordBox>;
              })}
            </WordWrapper>
            <MeanWrapper>
              {blindData.map((item, idx) => {
                return (
                  <MeanBox key={idx} showWord={showWord}>
                    {item.mean}
                  </MeanBox>
                );
              })}
            </MeanWrapper>
          </>
        )}

        {mode === 'mean' && (
          <>
            <WordWrapper>
              {blindData.map((item, idx) => {
                return <WordBox key={idx}>{item.mean}</WordBox>;
              })}
            </WordWrapper>
            <MeanWrapper>
              {blindData.map((item, idx) => {
                return (
                  <MeanBox key={idx} showWord={showWord}>
                    {item.word}
                  </MeanBox>
                );
              })}
            </MeanWrapper>
          </>
        )}
      </Content>

      <Footer>
        <WideButton onClick={onNext}>
          {showWord && blindData.length === ENDPOINT && '돌아가기'}
          {showWord && blindData.length !== ENDPOINT && '다음'}
          {!showWord && '정답 보기'}
        </WideButton>
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

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  padding-bottom: 36px;
  overflow-y: hidden;
`;

const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const WordWrapper = styled(Wrapper)``;

const MeanWrapper = styled(Wrapper)``;

const Box = styled.div`
  width: 100%;
  height: 10%;
  flex-shrink: 0;
  display: flex;
  justify-content: start;
  align-items: center;
  ${({ theme }) => theme.typography.pretendard.t2.sbd};

  font: bold;

  & + & {
    margin-top: 1.25%;
  }

  :nth-child(5) {
    opacity: calc(n * 0.1);
  }

  :nth-child(4),
  :nth-child(6) {
    opacity: 0.4;
  }

  :nth-child(3),
  :nth-child(7) {
    opacity: 0.3;
  }

  :nth-child(2),
  :nth-child(8) {
    opacity: 0.2;
  }

  :nth-child(1),
  :nth-child(9) {
    opacity: 0.1;
  }
`;

const WordBox = styled(Box)``;

const MeanBox = styled(Box)<{ showWord: boolean }>`
  padding-left: 16px;
  color: ${({ theme }) => theme.colors.primary.default};

  :nth-child(n + 5) {
    color: transparent;
  }

  :nth-child(5) {
    ${({ showWord }) => {
      if (showWord) {
        return css`
          color: black;
        `;
      } else {
        return css`
          color: black;
          border-radius: 6px;
          border: 1px solid ${({ theme }) => theme.colors.gray[200]};
          background-color: rgba(248, 248, 252, 0.6);
          filter: blur(7px);
        `;
      }
    }}
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 48px;
  flex-shrink: 0;
  padding: 0 20px;
  margin-bottom: 32px;
`;
