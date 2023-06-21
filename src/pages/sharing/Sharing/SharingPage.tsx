import styled from 'styled-components';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

const SharingPage = () => {
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);

  useEffect(() => {
    setActiveMenu(2);
  }, []);

  return (
    <WebWrapper>
      <Header>
        <Title>Share</Title>
        <Search>🔍</Search>
      </Header>

      <Container>
        <div>지원은</div>

        <div>나중에...</div>
      </Container>
    </WebWrapper>
  );
};

export default SharingPage;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;

  overflow: auto;
`;

const Header = styled.header`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
`;

const Search = styled.div`
  width: 24px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
`;
