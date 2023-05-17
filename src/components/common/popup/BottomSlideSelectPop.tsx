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

interface BottomSlideSelectPopProps {
  isOpen: boolean;
  onPopClose: () => void;
  data: {
    text: string;
    onClick: () => void;
  }[];
}

const BottomSlideSelectPop: React.FC<BottomSlideSelectPopProps> = ({
  isOpen,
  onPopClose,
  data,
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
      <Slider isClose={isClose}>
        <SlideTopLine />
        <Items>
          {data.map(item => (
            <Item
              onClick={() => {
                item.onClick();
                onClose();
              }}
            >
              {item.text}
            </Item>
          ))}
        </Items>
      </Slider>
    </ReactModal>
  );
};

export default BottomSlideSelectPop;

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

const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Item = styled.button`
  padding: 12px 24px;
  width: 100%;
  text-align: left;
  font-size: 16px;
`;

const SlideTopLine = styled.div`
  width: 40px;
  height: 4px;
  background-color: #e7e7e7;
  margin: 16px auto 34px;
  border-radius: 2px;
`;
