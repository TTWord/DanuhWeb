import styled, { css, keyframes } from 'styled-components';
import ReactModal from 'react-modal';
import { MouseEvent, useEffect, useState } from 'react';

interface BottomSlidePopProps {
  isOpen: boolean;
  onPopClose: () => void;
  children: React.ReactNode;
  height: number;
}

const BottomSlidePop: React.FC<BottomSlidePopProps> = ({
  isOpen,
  onPopClose,
  children,
  height,
}) => {
  const [popIsOpen, setPopIsOpen] = useState(false);
  const [isClose, setClose] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPopIsOpen(true);
    } else {
      setClose(true);
    }
  }, [isOpen]);

  const onClose = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setClose(true);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isClose) {
      timeout = setTimeout(() => {
        setClose(false);
        setPopIsOpen(false);
        onPopClose();
      }, 300);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isClose]);

  return (
    <ReactModal isOpen={popIsOpen}>
      <Background onClick={onClose} isClose={isClose}></Background>
      <Slider isClose={isClose} height={height}>
        {children}
      </Slider>
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

const SliderSlideIn = (height: number) => keyframes`
	0% {
		bottom: -${height}px;
	}
	100% {
		bottom: 0px;
	}
`;

const SliderSlideOut = (height: number) => keyframes`
	0% {
		bottom: 0px;
	}
	100% {
		bottom: -${height}px;
	}
`;

const Slider = styled.div<{
  isClose: boolean;
  height: number;
}>`
  width: 100%;
  height: ${({ height }) => height}px;
  background-color: #ffffff;
  position: absolute;
  z-index: 10;
  bottom: -${({ height }) => height}px;
  animation: ${({ height }) => SliderSlideIn(height)} 0.3s ease-in-out forwards;
  border-radius: 12px 12px 0px 0px;
  transition: height 0.3s ease-in-out;

  ${({ isClose, height }) => {
    return (
      isClose &&
      css`
        animation: ${SliderSlideOut(height)} 0.3s ease-in-out forwards;
      `
    );
  }}
`;
