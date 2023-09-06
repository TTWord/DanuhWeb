import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import styled, { css, keyframes } from 'styled-components';

interface AlertPopProps {
  isOpen: boolean;
  onClose: () => void;
  buttonText?: string;
  type?: 'custom' | 'title' | 'desc';
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

const AlertPop: React.FC<AlertPopProps> = ({
  isOpen,
  onClose,
  buttonText = '확인',
  children,
  type = 'custom',
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
        onClose();
        setCloseState(false);
      }, 500);
    }
  }, [closeState]);

  return (
    <ReactModal isOpen={isOpen}>
      <Background closeState={closeState} />
      <Transparent>
        <Box closeState={closeState}>
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
          <Button onClick={onClickClose}>{buttonText}</Button>
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
  min-height: 180px;
  background-color: white;
  display: flex;
  flex-direction: column;
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
  height: 48px;
  color: ${({ theme }) => theme.colors.primary.default};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border-radius: 0 0 10px 10px;

  &:active {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const Content = styled.div`
  padding: 32px 0;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
