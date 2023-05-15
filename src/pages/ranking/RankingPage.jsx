import styled from 'styled-components';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import Footer from '@/components/layout/HomeLayout/Footer';

const RankingPage = () => {
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);

  useEffect(() => {
    setActiveMenu(2);
  }, []);

  return (
    <WebWrapper>
      <Container>랭킹 페이지</Container>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </WebWrapper>
  );
};

export default RankingPage;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid black;
  flex: 1;
`;

const FooterWrapper = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 72px;
  display: flex;
  background: #ffffff;
`;
