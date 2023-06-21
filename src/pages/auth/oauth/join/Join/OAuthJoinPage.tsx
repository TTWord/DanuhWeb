import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import iconArrowBack from '@/assets/svg/icons/icon-back-button.svg';

const OAuthJoinPage = () => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate('/auth/login');
  };

  const onNext = () => {
    navigate('/auth/oauth/join/nickname');
  };

  return (
    <MainWrapper>
      <Header>
        <img src={iconArrowBack} alt="back" onClick={onBack} />
      </Header>

      <Content>
        <Title>소셜 회원가입</Title>
        <Explain>
          소셜 로그인 최초 이용 시 필요한<br></br>추가 정보를 입력합니다.
        </Explain>
      </Content>

      <Footer>
        <Next onClick={onNext}>다음</Next>
      </Footer>
    </MainWrapper>
  );
};

export default OAuthJoinPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  font-family: ${({ theme }) => theme.fonts.pretendard};
`;

const Header = styled.header`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 140%;
  margin-bottom: 8px;
`;

const Explain = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: #5b5b5b;
`;

const Footer = styled.footer`
  width: 100%;
  height: 45px;
  flex-shrink: 0;
  margin-bottom: 28px;
`;

const Next = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary.default};
  color: white;
  border-radius: 8px;
`;
