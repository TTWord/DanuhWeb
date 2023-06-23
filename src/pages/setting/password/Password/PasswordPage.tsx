import { useState } from 'react';
import styled, { css } from 'styled-components';
import backIcon from '@/assets/svg/icons/icon-back-gray.svg';
import useNavigatePop from '@/hooks/useNavigatePop';

const PasswordPage = () => {
  const navigate = useNavigatePop();

  const onBack = () => {
    navigate('/setting');
  };

  return (
    <WebWrapper>
      <Header>
        <BackButton onClick={onBack} src={backIcon} alt="backButton" />
        비밀번호 변경하기
      </Header>
      <Content>
        <TypeBox>
          <Type>기존 비밀번호</Type>
          <InputBox />
        </TypeBox>
        <TypeBox>
          <Type>신규 비밀번호</Type>
          <InputBox />
        </TypeBox>
        <TypeBox>
          <Type>신규 비밀번호 확인</Type>
          <InputBox />
        </TypeBox>
      </Content>
      <Footer>
        <SubmitButton>변경하기</SubmitButton>
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

const SubmitButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: grey;
  color: white;
  font-size: 24px;
`;
