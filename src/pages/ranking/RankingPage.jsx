import styled from 'styled-components';
import { globalState } from '@/recoil';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import Footer from '@/components/layout/HomeLayout/Footer';

const RankingPage = () => {
  const [activeMenu, setActiveMenu] = useRecoilState(
    globalState.layout.activeMenuNumber,
  );

  useEffect(() => {
    setActiveMenu(2);
  }, []);

  return (
    <div>
      <div>랭킹 페이지</div>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </div>
  );
};

export default RankingPage;

const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  display: flex;

  background: #ffffff;
`;
