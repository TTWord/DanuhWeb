import ReactModal from 'react-modal';
import styled, { css, keyframes } from 'styled-components';
import useExportLogics from '../hooks/useExportLogics';

interface ExportOptionProps {
  isOpen: boolean;
  close: () => void;
}

/** 로그인 로딩 팝업의 경우 type='login' 명시 필수 */
const ExportOptionPop = ({ isOpen, close }: ExportOptionProps) => {
  const { exportBook } = useExportLogics();

  return (
    <ReactModal isOpen={isOpen}>
      <Background onClick={close} isClose={!isOpen}></Background>
      <Div>
        <ButtonBox>
          <ExportButton onClick={exportBook('each')}>
            한 파일로 내보내기
          </ExportButton>
          <ExportButton onClick={exportBook('all')}>
            단어장별 파일로 내보내기
          </ExportButton>
        </ButtonBox>
      </Div>
    </ReactModal>
  );
};

export default ExportOptionPop;

const Div = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 48px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ButtonBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  flex-shrink: 0;
  z-index: 10;
`;

const ExportButton = styled.button`
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  cursor: pointer;

  :last-child {
    border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }

  :active {
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

const BackgroundFadeIn = keyframes`
	0% {
		background-color: rgba(0, 0, 0, 0);
	}
	100% {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

const BackgroundFadeOut = keyframes`
	0% {
		background-color: rgba(0, 0, 0, 0.1);
	}
	100% {
		background-color: rgba(0, 0, 0, 0);
	}
`;

const Background = styled.div<{ isClose: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  animation: ${BackgroundFadeIn} 150ms ease-in-out forwards;

  ${({ isClose }) => {
    return (
      isClose &&
      css`
        animation: ${BackgroundFadeOut} 150ms ease-in-out forwards;
      `
    );
  }}
`;
