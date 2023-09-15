import styled from 'styled-components';
import TopAppBarStack from '@/components/common/header/TopAppBarStack';
import Title from '@/components/common/header/Title';
import Input from '@/components/common/input/Input';
import { useEffect, useState } from 'react';
import WideButton from '@/components/common/button/WideButton';
import CodeResendButton from '../../components/CodeResendButton';
import Counter from '../../join/AuthCode/components/Counter';
import usePasswordPageLogic from '../hooks/usePasswordPageLogic';
import { useLocation } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

const PasswordCode = () => {
  const { submitCertCode, certCodeLoading, resendCode } =
    usePasswordPageLogic();
  const location = useLocation();
  const username = location?.state?.username;
  const [code, setCode] = useState('');
  const [isActive, setIsActive] = useState(false);

  const reSendCode = () => {
    if (username) resendCode(username);
  };

  const submitCode = () => {
    if (isActive) submitCertCode({ username, code });
  };

  useEffect(() => {
    if (code !== '' && code.length === 6) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [code]);

  return (
    <WebWrapper>
      <TopAppBarStack type="default" navigate="/auth/password" />
      <Title title="비밀번호 찾기" />
      <GuideMessage>이메일로 발송된 인증번호를 입력해주세요</GuideMessage>
      <Content>
        <InputBox>
          <Type>인증번호</Type>
          <Input
            type={'default'}
            onChange={setCode}
            placeholder={'6자리 숫자 코드 입력'}
            value={code}
            maxLength={6}
          />
        </InputBox>
        <Counter />
        <ResendBox>
          <span>메일을 받지 못하셨나요?</span>
          <CodeResendButton onClick={reSendCode} />
        </ResendBox>
      </Content>
      <Bottom>
        <WideButton type="button" isActive={isActive} onClick={submitCode}>
          {certCodeLoading ? (
            <TailSpin
              height="30"
              width="30"
              radius="1"
              color="#ffffff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          ) : (
            '다음'
          )}
        </WideButton>
      </Bottom>
    </WebWrapper>
  );
};

export default PasswordCode;

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
  padding: 0 24px;
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

const InputBox = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 4px;
`;

const Type = styled.span`
  color: ${({ theme }) => theme.colors.gray[900]};
  ${({ theme }) => theme.typography.pretendard.b1.md};
  margin-bottom: 8px;
`;

const ResendBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;

  span {
    font-family: ${({ theme }) => theme.fonts.gmarketSans};
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    margin-bottom: 10px;
  }
`;

const Bottom = styled.div`
  width: 100%;
  height: auto;
  padding: 0 24px;
  margin-bottom: 36px;
`;
