import styled, { StyledComponent, css, keyframes } from 'styled-components';
import CommonModalBackground from '../modal/CommonModalBackground';
import { useEffect, useState } from 'react';

interface ConfirmPopProps {
  isOpen: boolean;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  height?: string;
  type?: 'custom' | 'title' | 'desc';
  title?: string;
  description?: string;
}

const ConfirmPop: React.FC<ConfirmPopProps> = ({
  isOpen,
  height,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
  children,
  type,
  title,
  description,
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
          <Content>
            {type === 'custom' && children}
            {type === 'title' && <Title>{title}</Title>}
            {type === 'desc' && (
              <>
                <Title>{title}</Title>
                <Desc>{description}</Desc>
              </>
            )}
          </Content>
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

  animation: ${BackgroundAnimation} 0.5s ease-in-out;

  ${({ closeState }) =>
    closeState &&
    css`
      background-color: rgba(0, 0, 0, 0);
      animation: ${BackgroundAnimationReverse} 0.5s ease-in-out;
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
  animation: ${BoxAnimation} 0.3s ease-in-out;

  ${({ closeState }) =>
    closeState &&
    css`
      opacity: 0;
      animation: ${BoxAnimationReverse} 0.3s ease-in-out;
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

const Title = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.bd}
  color: ${({ theme }) => theme.colors.gray[800]};
  text-align: center;
  word-break: break-all;
`;

const Desc = styled.div`
  color: ${({ theme }) => theme.colors.gray[600]};
  ${({ theme }) => theme.typography.pretendard.b1.rg};
  word-break: break-all;
  text-align: center;

  ${Title} + & {
    margin-top: 4px;
  }
`;
