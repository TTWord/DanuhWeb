import styled, { StyledComponent, css, keyframes } from 'styled-components';
import CommonModalBackground from '../../components/common/modal/CommonModalBackground';
import { useEffect, useState } from 'react';

interface ConfirmPopProps {
  isOpen: boolean;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  height?: string;
}

const ConfirmPop: React.FC<ConfirmPopProps> & {
  Title: StyledComponent<'div', any, {}, never>;
  Comment: StyledComponent<'div', any, {}, never>;
} = ({
  isOpen,
  height,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
  children,
}) => {
  const [closeState, setCloseState] = useState(false);

  const onClickClose = () => {
    setCloseState(true);
  };

  useEffect(() => {
    if (closeState) {
      setTimeout(() => {
        onCancel();
        setCloseState(false);
      }, 1000);
    }
  }, [closeState]);

  return (
    <CommonModalBackground isOpen={isOpen}>
      <Background closeState={closeState} />
      <Transparent>
        <Container closeState={closeState} height={height}>
          <Content>{children}</Content>
          <ButtonGroup>
            <Button onClick={onClickClose}>{cancelText}</Button>
            <Button onClick={onConfirm}>{confirmText}</Button>
          </ButtonGroup>
        </Container>
      </Transparent>
    </CommonModalBackground>
  );
};

export default ConfirmPop;

const Title = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.bd};
`;

const Comment = styled.div`
  margin-top: 8px;
  ${({ theme }) => theme.typography.pretendard.b1.rg};
`;

ConfirmPop.Title = Title;
ConfirmPop.Comment = Comment;

const BackgroundAnimation = keyframes`
  0% {
    background-color: rgba(0, 0, 0, 0);
  }

  100% {
    background-color: rgba(72, 72, 72, 0.3);
  }
`;

const BackgroundAnimationReverse = keyframes`
  0% {
    background-color: rgba(72, 72, 72, 0.3);
  }

  100% {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const Background = styled.div<{
  closeState: boolean;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(72, 72, 72, 0.3);

  animation: ${BackgroundAnimation} 1s ease-in-out;

  ${({ closeState }) =>
    closeState &&
    css`
      background-color: rgba(0, 0, 0, 0);
      animation: ${BackgroundAnimationReverse} 1s ease-in-out;
    `}
`;

const BoxAnimation = keyframes`
  0% { transform: scale(0.9); opacity: 0; }
  50% { transform: scale(1.1); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
`;

const BoxAnimationReverse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.5; }
  100% { transform: scale(0.9); opacity: 0; }
`;

const Transparent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div<{
  closeState: boolean;
  height?: string;
}>`
  width: 264px;
  height: ${({ height }) => height ?? 'auto'};
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  opacity: 1;
  animation: ${BoxAnimation} 0.6s ease-in-out;

  ${({ closeState }) =>
    closeState &&
    css`
      opacity: 0;
      animation: ${BoxAnimationReverse} 0.6s ease-in-out;
    `}
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  bottom: 0;
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const Button = styled.button`
  width: 50%;
  height: 100%;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[400]};

  & + & {
    border-left: 1px solid ${({ theme }) => theme.colors.gray[200]};
    color: ${({ theme }) => theme.colors.primary.default};
  }
`;
