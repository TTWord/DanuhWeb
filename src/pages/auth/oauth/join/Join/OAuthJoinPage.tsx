import styled from 'styled-components';
import iconArrowBack from '@/assets/svg/icons/icon-back-button.svg';
import useNavigatePop from '@/hooks/useNavigatePop';
import useNavigatePush from '@/hooks/useNavigatePush';
import FooterButton from '@/components/common/button/FooterButton';

const OAuthJoinPage = () => {
  const navigatePop = useNavigatePop();
  const navigatePush = useNavigatePush();

  const onBack = () => {
    navigatePop('/auth/login');
  };

  const onNext = () => {
    navigatePush('/auth/oauth/join/nickname');
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

      <FooterButton onClick={onNext}>다음</FooterButton>
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
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
`;

const Header = styled.header`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  img {
    cursor: pointer;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: 0 36px;
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
