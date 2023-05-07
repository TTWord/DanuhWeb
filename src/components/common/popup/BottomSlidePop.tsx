import styled, { css, keyframes } from 'styled-components';
import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';

const modalStyle = {
  overlay: {
    backgroundColor: 'transparent',
    zIndex: 10,
    overflow: 'hidden',
  },
  content: {
    backgroundColor: 'transparent',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    borderRadius: 0,
    border: 0,
    padding: 0,
    overflow: 'hidden',
  },
};

interface BottomSlidePopProps {
  isOpen: boolean;
  onPopClose: () => void;
  children: React.ReactNode;
}

const BottomSlidePop: React.FC<BottomSlidePopProps> = ({
  isOpen,
  onPopClose,
  children,
}) => {
  const [isClose, setClose] = useState(false);

  const onClose = () => {
    setClose(true);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isClose) {
      timeout = setTimeout(() => {
        setClose(false);
        onPopClose();
      }, 300);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isClose]);

  return (
    <ReactModal isOpen={isOpen} style={modalStyle}>
      <Background onClick={onClose} isClose={isClose}></Background>
      <Slider isClose={isClose}>{children}</Slider>
    </ReactModal>
  );
};

export default BottomSlidePop;

const BackgroundFadeIn = keyframes`
	0% {
		background: rgba(0, 0, 0, 0);
	}
	100% {
		background: rgba(0, 0, 0, 0.5);
	}
`;

const BackgroundFadeOut = keyframes`
	0% {
		background: rgba(0, 0, 0, 0.5);
	}
	100% {
		background: rgba(0, 0, 0, 0);
	}
`;

const Background = styled.div<{ isClose: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0);
  animation: ${BackgroundFadeIn} 0.3s ease-in-out forwards;

  ${({ isClose }) => {
    return (
      isClose &&
      css`
        animation: ${BackgroundFadeOut} 0.3s ease-in-out forwards;
      `
    );
  }}
`;

const SliderSlideIn = keyframes`
	0% {
		bottom: -300px;
	}
	100% {
		bottom: 0px;
	}
`;

const SliderSlideOut = keyframes`
	0% {
		bottom: 0px;
	}
	100% {
		bottom: -300px;
	}
`;

const Slider = styled.div<{
  isClose: boolean;
}>`
  width: 100%;
  height: 300px;
  background-color: #ffffff;
  position: absolute;
  z-index: 10;
  bottom: -300px;
  animation: ${SliderSlideIn} 0.3s ease-in-out forwards;
  border-radius: 20px 20px 0px 0px;

  ${({ isClose }) => {
    return (
      isClose &&
      css`
        animation: ${SliderSlideOut} 0.3s ease-in-out forwards;
      `
    );
  }}
`;
