import { useState } from 'react';
import styled, { css } from 'styled-components';
import { useEffect, ChangeEvent } from 'react';
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

  const onClickOldPW = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const onClickNewPW = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const onClickConfirmPW = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
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
          <Line>
            <Title>기존 비밀번호</Title>
            <InputBox
              onChange={onClickOldPW}
              type="password"
              placeholder="기존 비밀번호를 입력해 주세요"
            />
          </Line>
          <Line>
            <Title>신규 비밀번호</Title>
            <InputBox
              onChange={onClickNewPW}
              type="password"
              placeholder="신규 비밀번호를 입력해 주세요"
            />
          </Line>
          <Line>
            <Title>신규 비밀번호 확인</Title>
            <InputBox
              onChange={onClickConfirmPW}
              type="password"
              placeholder="신규 비밀번호를 입력해 주세요"
            />
          </Line>
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

const Line = styled.div`
  width: 100%;
  font-size: 16px;

  & + & {
    margin-top: 44px;
  }
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.pretendard.b1.rg};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: 8px;
`;

const InputBox = styled.input`
  width: 100%;
  height: 44px;
  outline: none;
  padding: 0 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary.default};
  }

  ${({ theme }) => theme.typography.pretendard.t3.md};
  color: ${({ theme }) => theme.colors.gray[900]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const Footer = styled.footer`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const SubmitButton = styled.button<{
  isActive: boolean;
}>`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary.disabled};
  color: white;

  ${({ theme }) => theme.typography.gmarketSans.md[16]};
  font-size: 14px;

  ${({ isActive }) => {
    return (
      isActive &&
      css`
        background-color: ${({ theme }) => theme.colors.primary.default};
      `
    );
  }}
`;
