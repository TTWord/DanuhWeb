import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TopAppBarClose from '@/components/common/header/TopAppBarClose';
import ConfirmPop from '@/components/common/popup/ConfirmPop';
import { useState } from 'react';

interface QuizHeaderParams {
  type: string;
  number: number;
  total: number;
  timer: number;
  timerEnd: boolean;
}

const QuizHeader = ({
  type,
  number,
  total,
  timer,
  timerEnd,
}: QuizHeaderParams) => {
  const navigate = useNavigate();

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formatMinutes = String(minutes).padStart(2, '0');
  const formatSeconds = String(seconds).padStart(2, '0');

  const [isConfirmPopOpen, setIsConfirmPopOpen] = useState(false);

  const onClose = () => {
    setIsConfirmPopOpen(true);
  };

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
          navigate('/learn/quiz', {
            state: {
              type,
            },
          });
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
