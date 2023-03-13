import Footer from '@/components/layout/HomeLayout/Footer';
import Header from '@/components/layout/HomeLayout/Header';
import { Outlet } from 'react-router-dom';
import tw from 'twin.macro';

const HomeLayout = () => {
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

export default HomeLayout;

const HWrap = tw.div`w-full h-[85px] shrink-0`;
const Container = tw.div`w-[100%] h-[100%] overflow-hidden flex flex-col`;
const Content = tw.div`h-full overflow-y-auto`;
const FWrap = tw.div`w-full h-[70px] shrink-0`;
