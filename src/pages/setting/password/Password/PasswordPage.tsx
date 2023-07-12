import { useState } from 'react';
import styled, { css } from 'styled-components';
import backIcon from '@/assets/svg/icons/icon-back-gray.svg';
import useNavigatePop from '@/hooks/useNavigatePop';
import { useEffect, ChangeEvent } from 'react';
import useChangePassword from './hooks/useChangePassword';

// 비밀번호 표시 버튼?
const PasswordPage = () => {
  const navigate = useNavigatePop();
  const changePassword = useChangePassword();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOk, setIsOk] = useState(false);

  const onBack = () => {
    navigate('/setting');
  };

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
      //a123456! a1234567!
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
    <WebWrapper>
      <Header>
        <BackButton onClick={onBack} src={backIcon} alt="backButton" />
        비밀번호 변경하기
      </Header>
      <Content>
        <TypeBox>
          <Type>기존 비밀번호</Type>
          <InputBox onChange={onClickOldPW} type="password" />
        </TypeBox>
        <TypeBox>
          <Type>신규 비밀번호</Type>
          <InputBox onChange={onClickNewPW} type="password" />
        </TypeBox>
        <TypeBox>
          <Type>신규 비밀번호 확인</Type>
          <InputBox onChange={onClickConfirmPW} type="password" />
        </TypeBox>
      </Content>
      <Footer>
        <SubmitButton onClick={onClickSubmit} isActive={isOk}>
          변경하기
        </SubmitButton>
      </Footer>
    </WebWrapper>
  );
};
export default PasswordPage;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.pretendard};
`;

const Header = styled.header`
  position: relative;
  width: 100%;
  height: 56px;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
`;

const BackButton = styled.img`
  position: absolute;
  left: 16px;
  :hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 24px 16px;
`;

const TypeBox = styled.div`
  width: 100%;
  font-size: 16px;

  & + & {
    margin-top: 44px;
  }
`;

const Type = styled.div``;

const InputBox = styled.input`
  width: 100%;
  height: 44px;
  outline: none;
  margin-top: 12px;
  padding: 0 8px;
  border: 1px solid black;
`;

const Footer = styled.footer`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitButton = styled.button<{
  isActive: boolean;
}>`
  width: 100%;
  height: 56px;
  background-color: grey;
  color: white;
  font-size: 24px;

  ${({ isActive }) => {
    return (
      isActive &&
      css`
        background-color: ${({ theme }) => theme.colors.primary.default};
      `
    );
  }}
`;
