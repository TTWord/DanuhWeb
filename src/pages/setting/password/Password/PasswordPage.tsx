import { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import useChangePassword from './hooks/useChangePassword';
import StackLayout from '@/components/layout/StackLayout';
import WideButton from '@/components/common/button/WideButton';
import Input from '@/components/common/input/Input';

// 비밀번호 표시 버튼?
const PasswordPage = () => {
  const changePassword = useChangePassword();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOk, setIsOk] = useState(false);

  const onClickOldPW = (input: string) => {
    setOldPassword(input);
  };

  const onClickNewPW = (input: string) => {
    setNewPassword(input);
  };

  const onClickConfirmPW = (input: string) => {
    setConfirmPassword(input);
  };

  const onClickSubmit = async () => {
    if (isOk) {
      changePassword(oldPassword, newPassword);
    }
  };

  useEffect(() => {
    if (
      oldPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmPassword.length > 0 &&
      newPassword === confirmPassword
    ) {
      setIsOk(true);
    } else {
      setIsOk(false);
    }
  }, [oldPassword, newPassword, confirmPassword]);

  return (
    <StackLayout
      topBar={{
        title: '비밀번호 변경',
        back: {
          isShow: true,
          location: '/setting',
        },
      }}
    >
      <Container>
        <Content>
          <Title>기존 비밀번호</Title>
          <Input
            type="password"
            placeholder="기존 비밀번호를 입력해 주세요"
            value={oldPassword}
            onChange={onClickOldPW}
          />

          <Title>신규 비밀번호</Title>
          <Input
            type="password"
            placeholder="신규 비밀번호를 입력해 주세요"
            value={newPassword}
            onChange={onClickNewPW}
          />

          <Title>신규 비밀번호 확인</Title>
          <Input
            type="password"
            placeholder="신규 비밀번호를 입력해 주세요"
            value={confirmPassword}
            onChange={onClickConfirmPW}
          />
        </Content>
        <Footer>
          <WideButton onClick={onClickSubmit} isActive={isOk}>
            변경하기
          </WideButton>
        </Footer>
      </Container>
    </StackLayout>
  );
};
export default PasswordPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 24px;
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.pretendard.b1.rg};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: 8px;
  margin-top: 32px;

  :first-child {
    margin-top: 0px;
  }
`;

const Footer = styled.footer`
  width: 100%;
  flex-shrink: 0;
  padding: 0 24px;
  padding-bottom: 36px;
`;
