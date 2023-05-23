import Footer from '@/components/layout/RootLayout/Footer';
import { Outlet } from 'react-router-dom';
import tw from 'twin.macro';

const RootLayout = () => {
  return (
    <Container>
      <Content>
        <Outlet />
      </Content>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Container>
  );
};

export default RootLayout;
const Container = tw.div`w-[100%] h-[100%] overflow-hidden flex flex-col`;
const Content = tw.div`h-full overflow-y-auto`;
const FooterWrapper = tw.div`w-full h-[72px] shrink-0`;
