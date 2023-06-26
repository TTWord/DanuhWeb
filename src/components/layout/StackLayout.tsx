import styled from 'styled-components';
import iconBackGray from '@/assets/svg/icons/icon-back-gray.svg';
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
          <img src={iconBackGray} alt="back" />
        </Back>
        <Title>{topBar?.title}</Title>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

export default StackLayout;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: ${({ theme }) => theme.fonts.pretendard};
`;

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 12px 16px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Back = styled.button`
  width: 11px;
  height: 19px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.div`
  font-size: 16px;
  margin-left: 16px;
  font-weight: 600;
`;
