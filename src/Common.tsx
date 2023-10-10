import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Toast from './components/common/toast/Toast';
import ReactModal from 'react-modal';

interface CommonProps {
  children: React.ReactNode;
}

const Common: React.FC<CommonProps> = ({ children }) => {
  return (
    <Container>
      <GlobalStyles />
      <ReactModal
        isOpen={true}
        style={{
          overlay: {
            backgroundColor: 'transparent',
            zIndex: 101,
            width: '100%',
            height: '0',
            position: 'fixed',
            bottom: 0,
          },
          content: {
            bottom: 0,
            backgroundColor: 'transparent',
            width: '100%',
            height: '0',
            outline: 'none',
          },
        }}
      >
        <ToastContainer>
          <Toast />
        </ToastContainer>
      </ReactModal>

      {children}
    </Container>
  );
};

export default Common;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: fixed;
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 0;
`;
