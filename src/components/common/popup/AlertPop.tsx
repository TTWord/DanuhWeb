import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import styled, { css, keyframes } from 'styled-components';

interface OkayPopProps {
  isOpen: boolean;
  onClose: () => void;
  okayText?: string;
  children: React.ReactNode;
}

const AlertPop: React.FC<OkayPopProps> = ({
  isOpen,
  onClose,
  okayText = '확인',
  children,
}) => {
  const [closeState, setCloseState] = useState(false);

  const onClickClose = () => {
    setCloseState(true);
  };

  useEffect(() => {
    if (closeState) {
      setTimeout(() => {
        onClose();
        setCloseState(false);
      }, 1000);
    }
  }, [closeState]);

  return (
    <ReactModal isOpen={isOpen}>
      <Background closeState={closeState} />
      <Transparent>
        <Box closeState={closeState}>
          <Content>{children}</Content>
          <Button onClick={onClickClose}>{okayText}</Button>
        </Box>
      </Transparent>
    </ReactModal>
  );
};

export default AlertPop;

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

const Box = styled.div<{
  closeState: boolean;
}>`
  width: 264px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  animation: ${BoxAnimation} 0.3s ease-in-out;
  border-radius: 10px;
  font-size: 16px;
  opacity: 1;

  ${({ closeState }) =>
    closeState &&
    css`
      opacity: 0;
      animation: ${BoxAnimationReverse} 0.3s ease-in-out;
    `}
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  height: 47px;
  color: ${({ theme }) => theme.colors.primary.default};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div``;
