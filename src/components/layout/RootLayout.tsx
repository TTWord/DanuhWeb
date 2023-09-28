import Footer from '@/components/layout/RootLayout/Footer';
import { Outlet } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

const RootLayout = () => {
  return (
    <NewContainer>
      <Content>
        <Outlet />
      </Content>
      <NewFooterWrapper>
        <Footer />
      </NewFooterWrapper>
    </NewContainer>
  );
};

export default RootLayout;

const Container = tw.div`w-[100%] h-[100%] overflow-hidden flex flex-col`;
const NewContainer = styled(Container)`
  position: relative;
`;
const Content = tw.div`h-full overflow-y-auto`;
const FooterWrapper = tw.div`w-full h-[72px] shrink-0`;
const NewFooterWrapper = styled(FooterWrapper)`
  position: fixed;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
`;
