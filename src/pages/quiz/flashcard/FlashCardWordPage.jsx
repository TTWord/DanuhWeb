import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import xButton from '@/assets/svg/icons/icon-x-button.svg';
import arrowButton from '@/assets/svg/icons/icon-next-arrow.svg';
import checkButton from '@/assets/svg/icons/icon-check.svg';

import { globalState } from '@/recoil';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

const FlashCardWordPage = () => {
  const navigate = useNavigate();
  const memoList = [...useRecoilValue(globalState.memo.memoList)];
  const [currentWord, setCurrentWord] = useState('');
  const [currentMean, setCurrentMean] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  // 정답을 봤는지 체크
  const [isDone, setIsDone] = useState(false);

  // 리스트에서 단어와 뜻 가져오기
  const setWordMean = () => {
    if (memoList[currentIndex]) {
      setCurrentWord(memoList[currentIndex].word);
      setCurrentMean(memoList[currentIndex].mean);
    }
  };

  useEffect(() => {
    setWordMean();
  }, [currentIndex]);

  // 암기할 단어의 총 개수
  const max = memoList.length;

  //이전 단어 보기
  const previous = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  // 다음 단어 보기
  const next = () => {
    if (currentIndex !== max - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // 나가기 기능
  const goFlashcard = () => {
    navigate('/quiz/flashcard');
  };

  // 이전 버튼
  const Previous = () => {
    if (currentIndex === 0) {
      return <PreviousButton lock onClick={previous} src={arrowButton} />;
    } else {
      return <PreviousButton onClick={previous} src={arrowButton} />;
    }
  };
  // 다음 버튼
  const Next = () => {
    if (currentIndex === max - 1) {
      return <NextButton lock onClick={next} src={arrowButton} />;
    } else {
      return <NextButton onClick={next} src={arrowButton} />;
    }
  };
  // 암기 단어 표시 부분
  const Memo = () => {
    if (isDone === false) {
      return <Word>{currentWord}</Word>;
    } else {
      return (
        <MemoWrapper>
          <Word>{currentWord}</Word>
          <Mean>{currentMean}</Mean>
        </MemoWrapper>
      );
    }
  };
  // 하단 버튼 부분
  const InteractionButton = () => {
    const [isCheck, setIsCheck] = useState(false);

    if (isDone === false) {
      return (
        <FooterButton
          onClick={() => {
            setIsDone(current => !current);
          }}
        >
          정답보기
        </FooterButton>
      );
    } else {
      if (currentIndex !== max - 1) {
        return (
          <>
            <CheckButton
              isCheck={isCheck}
              onClick={() => {
                setIsCheck(current => !current);
              }}
              src={checkButton}
              alt=""
            />
            <CompleteText>암기완료</CompleteText>
            <FooterButton
              onClick={() => {
                if (currentIndex !== max - 1) {
                  setCurrentIndex(currentIndex + 1);
                }
                setIsDone(current => !current);
              }}
            >
              다음으로
            </FooterButton>
          </>
        );
      } else {
        return (
          <>
            <CheckButton
              isCheck={isCheck}
              onClick={() => {
                setIsCheck(current => !current);
              }}
              src={checkButton}
              alt=""
            />
            <CompleteText>암기완료</CompleteText>
            <FooterButton onClick={goFlashcard}>종료</FooterButton>
          </>
        );
      }
    }
  };

  return (
    <MainWrapper>
      <Header>
        <QuitButton onClick={goFlashcard}>
          <img src={xButton} alt="xbutton" />
        </QuitButton>
        <Title>영어 암기</Title>
      </Header>

      <Content>
        <Previous />
        <Memo />
        <Next />
      </Content>

      <Footer>
        <InteractionButton />
      </Footer>
    </MainWrapper>
  );
};

export default FlashCardWordPage;

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

const MemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Word = styled.div`
  font-weight: 700;
  font-size: 64px;
  line-height: 93px;
  text-align: center;
  color: #0d0d0d;
  margin: 0 80px;
`;
const Mean = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  color: #0d0d0d;
  margin-top: 57px;
`;

const PreviousButton = styled.img`
  transform: rotate(180deg);
  :hover {
    cursor: pointer;
  }
  filter: ${props =>
    props.lock
      ? 'invert(81%) sepia(1%) saturate(652%) hue-rotate(339deg) brightness(98%) contrast(84%)'
      : 'none'};
`;
const NextButton = styled.img`
  :hover {
    cursor: pointer;
  }
  filter: ${props =>
    props.lock
      ? 'invert(81%) sepia(1%) saturate(652%) hue-rotate(339deg) brightness(98%) contrast(84%)'
      : 'none'};
`;

const Footer = styled.div`
  position: absolute;
  bottom: 35px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const CheckButton = styled.img`
  color: #6fad6e;
  :hover {
    cursor: pointer;
  }
  filter: ${props =>
    props.isCheck
      ? 'invert(66%) sepia(47%) saturate(339%) hue-rotate(70deg) brightness(86%) contrast(89%)'
      : 'none'};

  margin-bottom: 10px;
`;
const CompleteText = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #0d0d0d;
  margin-bottom: 33px;
`;
