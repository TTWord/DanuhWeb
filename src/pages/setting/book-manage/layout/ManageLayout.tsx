import TopAppBarStack from '@/components/common/header/TopAppBarStack';

import styled, { css } from 'styled-components';

interface ManageLayoutProps {
  children: React.ReactNode;
  type: 'import' | 'export';
}

const ManageLayout = ({ children, type }: ManageLayoutProps) => {
  const pageType = { import: '가져오기', export: '내보내기' };

  return (
    <Container>
      <TopAppBarStack
        type="default"
        title="단어장 가져오기 / 내보내기"
        navigate="/setting/book-manage/"
      />
      <Header>
        <Title>단어장 {pageType[type]}</Title>
        <SubTitle type={type}>book {type}</SubTitle>
      </Header>
      <Main>{children}</Main>
    </Container>
  );
};

export default ManageLayout;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-flow: column;
  margin-top: 16px;
  padding: 0 25px;
`;

const Title = styled.div`
  color: #000;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 24px */
  margin-bottom: 10px;
`;

const SubTitle = styled.div<{ type: 'import' | 'export' }>`
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 16px */
  text-transform: uppercase;

  ${({ type }) => {
    if (type === 'export')
      return css`
        color: #4c98c3;
      `;
    else
      return css`
        color: ${({ theme }) => theme.colors.primary.default};
      `;
  }}
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  overflow: hidden;
`;
