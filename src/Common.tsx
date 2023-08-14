import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Toast from './components/common/toast/Toast';

interface CommonProps {
  children: React.ReactNode;
}

const Common: React.FC<CommonProps> = ({ children }) => {
  return (
    <Container>
      <GlobalStyles />
      <Toast />
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
