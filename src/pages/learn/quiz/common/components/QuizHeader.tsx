import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TopAppBarClose from '@/components/common/header/TopAppBarClose';
import ConfirmPop from '@/components/common/popup/ConfirmPop';
import { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { globalState } from '@/recoil';
import useToast from '@/hooks/useToast';

interface QuizHeaderParams {
  number: number;
  total: number;
  hasQuiz: boolean;
  timerEnd: boolean;
}

const QuizHeader = ({ number, total, hasQuiz, timerEnd }: QuizHeaderParams) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [isAnswered, setIsAnswered] = useRecoilState(
    globalState.quiz.isAnswered,
  );
  const setIsWrong = useSetRecoilState(globalState.quiz.isWrong);
  const setTimerEnd = useSetRecoilState(globalState.quiz.quizTimerEnd);
  const [timer, setTimer] = useRecoilState(globalState.quiz.quizTimer);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formatMinutes = String(minutes).padStart(2, '0');
  const formatSeconds = String(seconds).padStart(2, '0');

  const [isConfirmPopOpen, setIsConfirmPopOpen] = useState(false);

  const onClose = () => {
    setIsConfirmPopOpen(true);
  };

  // 타이머
  useEffect(() => {
    if (!isAnswered && hasQuiz) {
      const timeOutId = setTimeout(() => {
        if (timer !== 0) {
          setTimer((current) => current - 1);
        }
        if (timer === 0) {
          setIsAnswered(true);
          toast.quiz('최악이에요...');
          setIsWrong(true);
          setTimerEnd(true);
          clearTimeout(timeOutId);
        }

        return () => clearTimeout(timeOutId);
      }, 1000);
    }
  }, [timer, isAnswered]);

  return (
    <Header>
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

      <TopAppBarClose title={`${number + 1}/${total}`} onClose={onClose} />

      <ProgressWrapper>
        <ProgressBar
          isEnd={number + 1 === total}
          value={(number + 1) * (100 / total)}
          max={100}
        />

        {!timerEnd && <Timer>{`${formatMinutes}:${formatSeconds}`}</Timer>}
      </ProgressWrapper>
    </Header>
  );
};

export default QuizHeader;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProgressWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProgressBar = styled.progress<{ isEnd: boolean }>`
  width: 100%;
  height: 4px;
  background-color: inherit;

  ::-webkit-progress-bar {
    background-color: #d9d9d9;
  }

  ::-webkit-progress-value {
    border-radius: 0 4px 4px 0;
    background-color: ${({ theme }) => theme.colors.primary.default};

    ${({ isEnd }) => {
      return (
        isEnd &&
        css`
          border-radius: 0;
        `
      );
    }};
  }
  margin-bottom: 8px;
`;

const Timer = styled.div`
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme }) => theme.colors.gray[600]};
  text-align: end;
  padding: 0 14px;
`;
