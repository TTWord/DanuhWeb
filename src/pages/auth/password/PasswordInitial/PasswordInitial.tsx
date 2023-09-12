import styled from 'styled-components';
import TopAppBarStack from '@/components/common/header/TopAppBarStack';
import Title from '@/components/common/header/Title';
import Input from '@/components/common/input/Input';
import { useEffect, useState } from 'react';
import WideButton from '@/components/common/button/WideButton';
import useNavigatePush from '@/hooks/useNavigatePush';

const PasswordInitial = () => {
  const navigatePush = useNavigatePush();

  const [code, setCode] = useState('');
  const [isActive, setIsActive] = useState(false);

  const goinitialPage = () => {
    navigatePush('/auth/password/initial');
  };

  useEffect(() => {
    if (code !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [code]);

  return (
    <WebWrapper>
      <TopAppBarStack type="default" navigate="/auth/password/code" />
      <Title title="비밀번호 찾기" />
      <GuideMessage>이메일로 발송된 인증번호를 입력해주세요</GuideMessage>

      <Content>
        <PasswordWrapper>
          <InputBox>
            <Type>
              인증번호 <span>영문, 숫자, 특수문자 포함 8자 이상</span>
            </Type>
            <Input
              type={'password'}
              onChange={setCode}
              placeholder={'비밀번호 입력'}
              value={code}
            />
            <ErrorMessage>{'테스트'}</ErrorMessage>
          </InputBox>
          <InputBox>
            <Type>인증번호</Type>
            <Input
              type={'password'}
              onChange={setCode}
              placeholder={'비밀번호 재입력'}
              value={code}
            />
            <ErrorMessage>{'테스트'}</ErrorMessage>
          </InputBox>
        </PasswordWrapper>

        <WideButton type="button" isActive={isActive} onClick={goinitialPage}>
          다음
        </WideButton>
      </Content>
    </WebWrapper>
  );
};

export default PasswordInitial;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const GuideMessage = styled.div`
  color: ${({ theme }) => theme.colors.gray[900]};
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 140%;
  padding: 0 16px;
  margin-top: 8px;
  margin-bottom: 52px;
`;

const Content = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 24px;
  padding-bottom: 36px;
`;

const PasswordWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 32px;
  }
`;

const Type = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[900]};
  ${({ theme }) => theme.typography.pretendard.b1.md};
  margin-bottom: 8px;

  span {
    margin-left: 8px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.pretendard};
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: 140%;
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  ${({ theme }) => theme.typography.pretendard.c1.md};
  margin-top: 4px;
`;
