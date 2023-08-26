import styled from 'styled-components';
import useNavigatePush from '@/hooks/useNavigatePush';
import FooterButton from '@/components/common/button/FooterButton';
import TopBar from '@/components/common/header/TopBar';

const OAuthJoinPage = () => {
  const navigatePush = useNavigatePush();

  const onNext = () => {
    navigatePush('/auth/oauth/join/nickname');
  };

  return (
    <MainWrapper>
      <TopBar type="default" navigate="/auth/login" />

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
