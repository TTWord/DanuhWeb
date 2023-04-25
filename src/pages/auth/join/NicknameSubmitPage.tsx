import iconArrowBack from '@/assets/svg/icons/icon-back-button.svg';
import styled from 'styled-components';

const NicknameSubmitPage = () => {
  return (
    <Layout>
      <Header>
        <img src={iconArrowBack} alt="back" />
        <Chapter>1/3</Chapter>
      </Header>
      <Content></Content>
    </Layout>
  );
};

export default NicknameSubmitPage;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f8f8fc;
  padding: 0 20px;
`;

const Header = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Chapter = styled.div`
  font-size: 12px;
  padding: 4px 8px;
  line-height: 16px;
  border-radius: 20px;
  background-color: #c7b3ff;
  color: #ffffff;
`;

const Content = styled.div``;
