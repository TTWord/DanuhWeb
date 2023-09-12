import styled from 'styled-components';
import TopAppBarStack from '@/components/common/header/TopAppBarStack';
import Title from '@/components/common/header/Title';
import InputLogin from '@/components/common/input/InputLogin';
import { FormEvent, useEffect, useState } from 'react';
import WideButton from '@/components/common/button/WideButton';
import useNavigatePush from '@/hooks/useNavigatePush';

const PasswordPage = () => {
  const navigatePush = useNavigatePush();

  const [emailId, setEmailId] = useState('');
  const [domain, setDomain] = useState('');
  const [isActive, setIsActive] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(emailId, domain);
    navigatePush('/auth/password/code');
  };

  useEffect(() => {
    if (emailId !== '' && domain !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [emailId, domain]);

  return (
    <WebWrapper>
      <TopAppBarStack type="default" navigate="/auth/login" />
      <Title title="비밀번호 찾기" />
      <GuideMessage>
        회원가입 할 때 사용한 이메일 주소를 입력해주세요
      </GuideMessage>
      <Content>
        <EmailForm onSubmit={onSubmit}>
          <EmailBox>
            <Type>아이디</Type>
            <InputLogin setEmailId={setEmailId} setDomain={setDomain} />
          </EmailBox>

          <WideButton isActive={isActive} type="submit">
            다음
          </WideButton>
        </EmailForm>
      </Content>
    </WebWrapper>
  );
};

export default PasswordPage;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
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

const EmailForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 24px;
  padding-bottom: 36px;
`;

const EmailBox = styled.div`
  width: 100%;
  height: auto;
`;

const Type = styled.span`
  color: ${({ theme }) => theme.colors.gray[900]};
  ${({ theme }) => theme.typography.pretendard.b1.md};
  margin-bottom: 8px;
`;
