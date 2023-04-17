import styled from 'styled-components';
import icoArrowBack from '@/assets/svg/icons/icon-arrow-back-button.svg';
import { useNavigate } from 'react-router-dom';

interface StackLayoutProps {
  children: React.ReactNode;
  topBar?: {
    isShow?: boolean;
    title?: string;
    back?: {
      isShow?: boolean;
      location?: string;
    };
  };
}

const StackLayout: React.FC<StackLayoutProps> = ({ children, topBar }) => {
  const navigate = useNavigate();

  const onBack = () => {
    if (topBar && topBar?.back && topBar?.back?.location) {
      navigate(topBar.back.location, {
        state: {
          direction: 'navigate-pop',
        },
      });
    }
  };

  return (
    <Container>
      <Header>
        <Back onClick={onBack}>
          <img src={icoArrowBack} alt="back" />
        </Back>
        <Title>{topBar?.title}</Title>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

export default StackLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  align-items: center;
  padding: 0 14px;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const Back = styled.button`
  width: 32px;
  height: 32px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.div`
  padding-top: 4px;
  font-weight: 500;
  font-size: 24px;
  margin-left: 20px;
  font-weight: 500;
`;
