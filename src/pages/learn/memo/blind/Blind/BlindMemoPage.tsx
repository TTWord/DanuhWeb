import styled, { css } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import iconClose from '@/assets/svg/icons/icon-close.svg';
import { useEffect, useState } from 'react';
import ConfirmPop from '@/components/common/popup/ConfirmPop';
import useGetBlindMemo from '@/pages/learn/memo/blind/Blind/hooks/useGetBlindMemo';

const BlindMemoPage = () => {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  const getBlind = useGetBlindMemo();

  //variables
  const { bookIds, mode } = location.state as {
    bookIds: number[];
    mode: 'word' | 'mean';
  };
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
  ]);

  // functions
  const getBlindAPI = async () => {
    const { data: response } = await getBlind({
      bookIds,
      count: 10,
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
      const newData = blindData.concat(memoList.splice(0, 3));
      setBlindData(
        newData.filter(item => item !== undefined) as {
          word: string;
          mean: string;
        }[],
      );
    }
  };

  // 그 다음 진행할 함수 (마지막 단어 세트가 가운데 올때까지 실행)
  const setNextWords = () => {
    if (blindData.length !== 3) {
      blindData.shift();
      const newData = blindData.concat(memoList.splice(0, 1));
      setBlindData(
        newData.filter(item => item !== undefined) as {
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
      if (blindData.length === 3) {
        navigate('/learn/memo', {
          state: {
            type: 'blind',
          },
        });
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
  }, [bookIds]);

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
      </Content>

      <Footer>
        <NextButton onClick={onNext}>
          {showWord && blindData.length === 3 && '돌아가기'}
          {showWord && blindData.length !== 3 && '다음'}
          {!showWord && '정답 보기'}
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
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  position: relative;
  gap: 16px;
`;

const ExitButton = styled.button`
  position: absolute;
  left: 16px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  overflow-y: hidden;
`;

const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  overflow-y: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const WordWrapper = styled(Wrapper)``;

const MeanWrapper = styled(Wrapper)``;

const Box = styled.div`
  width: 100%;
  height: 18%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: gray;
  font: bold;

  :nth-child(3) {
    color: black;
    font: bold;
    font-size: 36px;
  }

  & + & {
    margin-top: 2.5%;
  }
`;

const WordBox = styled(Box)``;

const MeanBox = styled(Box)<{
  showWord: boolean;
}>`
  :nth-child(n + 3) {
    color: transparent;
  }

  :nth-child(3) {
    ${({ showWord }) => {
      if (showWord) {
        return css`
          color: black;
        `;
      } else {
        return css`
          color: transparent;
        `;
      }
    }}

    font: bold;
    font-size: 36px;
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 48px;
  flex-shrink: 0;
  padding: 0 20px;
  margin-bottom: 36px;
`;

const NextButton = styled.button`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.primary[400]};
  background-color: ${({ theme }) => theme.colors.primary[200]};
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.default};
  text-align: center;
`;
