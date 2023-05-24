import styled from 'styled-components';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import Footer from '@/components/layout/RootLayout/Footer';

const RankingPage = () => {
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);

  useEffect(() => {
    setActiveMenu(2);
  }, []);

  return (
    <WebWrapper>
      <Header>랭킹 페이지</Header>

      <Container>
        <div>지원은</div>
        <div>나중에...</div>
      </Container>
    </WebWrapper>
  );
};

export default RankingPage;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
`;

const FooterWrapper = styled.footer`
  width: 100%;
  height: 72px;
  display: flex;
  background: #ffffff;
`;
