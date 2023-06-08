import ConfirmPop from '@/components/common/popup/ConfirmPop';
import useNavigatePush from '@/hooks/useNavigatePush';
import { useState } from 'react';
import styled from 'styled-components';
import backImg from '@/assets/svg/icons/icon-back-button.svg';
import useDeleteAccount from '@/pages/setting/Setting/hooks/useDeleteAccount';

const DeleteAccountPage = () => {
  const navigatePush = useNavigatePush();
  const deleteAccount = useDeleteAccount();
  const [isConfirmPopOpen, setIsConfirmPopOpen] = useState(false);

  const onClick = () => {
    setIsConfirmPopOpen(true);
  };

  const goBack = () => {
    navigatePush('/setting');
  };

  return (
    <MainWrapper>
      <Header>
        <BackButton onClick={goBack}>
          <img src={backImg} alt="backImg" />
        </BackButton>
        탈퇴하기
      </Header>

      <Content>
        <ConfirmPop
          isOpen={isConfirmPopOpen}
          message="정밀 회원을 탈퇴하시나요?"
          cancelText="뒤로가기"
          confirmText="그만하기"
          onCancel={() => setIsConfirmPopOpen(false)}
          onConfirm={() => {
            setIsConfirmPopOpen(false);
            deleteAccount;
          }}
        />
        <Text>탈퇴하면 계정은 다시 복구할 수 없습니다.</Text>
        <Text>정말 탈퇴하시겠습니까?</Text>
      </Content>

      <Footer>
        <Button onClick={onClick}>탈퇴하기</Button>
      </Footer>
    </MainWrapper>
  );
};

export default DeleteAccountPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #666666;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  img {
    height: 12px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px 20px;
`;

const Text = styled.div`
  font-size: 16px;
`;

const Footer = styled.footer`
  padding: 0 22px;
  padding-bottom: 22px;
`;

const Button = styled.button`
  width: 100%;
  height: 56px;
  background-color: #bebebe;
  border-radius: 5px;
  color: white;
`;
