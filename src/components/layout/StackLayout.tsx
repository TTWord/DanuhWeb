import styled from 'styled-components';
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <path
              d="M12.6045 17.7414L5.58366 10.7414C5.50033 10.658 5.44144 10.5678 5.40699 10.4705C5.37199 10.3733 5.35449 10.2692 5.35449 10.158C5.35449 10.0469 5.37199 9.94276 5.40699 9.84554C5.44144 9.74832 5.50033 9.65804 5.58366 9.57471L12.6045 2.55387C12.7989 2.35943 13.042 2.26221 13.3337 2.26221C13.6253 2.26221 13.8753 2.36637 14.0837 2.57471C14.292 2.78304 14.3962 3.0261 14.3962 3.30387C14.3962 3.58165 14.292 3.82471 14.0837 4.03304L7.95866 10.158L14.0837 16.283C14.2781 16.4775 14.3753 16.7169 14.3753 17.0014C14.3753 17.2864 14.2712 17.533 14.0628 17.7414C13.8545 17.9497 13.6114 18.0539 13.3337 18.0539C13.0559 18.0539 12.8128 17.9497 12.6045 17.7414Z"
              fill="#6B6C76"
            />
          </svg>
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
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 8px 16px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Back = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;

  &:active {
    path {
      fill: ${({ theme }) => theme.colors.gray[500]};
    }
  }
`;

const Title = styled.div`
  font-size: 16px;
  margin-left: 8px;
  font-weight: 600;
  padding-top: 2px;
`;
