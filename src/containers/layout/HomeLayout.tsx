import Footer from '@/components/layout/HomeLayout/Footer';
import Header from '@/components/layout/HomeLayout/Header';
import { Outlet } from 'react-router-dom';
import tw from 'twin.macro';

const BaseLayout = () => {
  return (
    <Container>
      <HWrap>
        <Header />
      </HWrap>
      <Content>
        <Outlet />
      </Content>
      <FWrap>
        <Footer />
      </FWrap>
    </Container>
  );
};

export default BaseLayout;

const HWrap = tw.div`w-full h-[60px] shrink-0 bg-[#f5f5f5]`;
const Container = tw.div`w-full h-[100vh] overflow-hidden flex flex-col`;
const Content = tw.div`h-full overflow-y-auto`;
const FWrap = tw.div`w-full h-[70px] bg-[#f5f5f5] shrink-0`;
