import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { globalState } from '@/recoil';
import { useRecoilValue } from 'recoil';
import useSignup from '../hooks/useSignup';
import iconArrowBack from '@/assets/svg/icons/icon-back-button.svg';
import useNavigatePop from '@/hooks/useNavigatePop';

const AuthCodePage = () => {
  const userEmail = useRecoilValue(globalState.auth.username);
  const userPW = useRecoilValue(globalState.auth.password);
  const userNickname = useRecoilValue(globalState.auth.nickname);

  const signup = useSignup();

  // 카운트 다운
  const [minutes, setMinutes] = useState(3); // 1분으로 초기화
  const [seconds, setSeconds] = useState(0); // 0초로 초기화

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(intervalId);
        } else {
          setMinutes(prevMinutes => prevMinutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [minutes, seconds]);

  // 네비게이트
  const navigate = useNavigate();

  const [authCode, setAuthCode] = useState('');

  const onChangeAuthCode = (e: ChangeEvent<HTMLInputElement>) => {
    const inputUserCode = e.target.value;
    setAuthCode(inputUserCode);
  };

  const navigatePop = useNavigatePop();

  const onBack = () => {
    navigatePop('/auth/join/info');
  };

  return (
    <Layout>
      <Header>
        <img src={iconArrowBack} alt="back" onClick={onBack} />
        <Chapter>3/3</Chapter>
      </Header>

      <Content>
        <TopView>
          <MainText>아이디와 비밀번호를 설정해주세요</MainText>
        </TopView>
        <AuthGuideBox>
          <AuthText>인증코드 입력</AuthText>
          <EmailBox>{userEmail}</EmailBox>
          <RequsetAuthCodeButton>인증코드 재발송</RequsetAuthCodeButton>
        </AuthGuideBox>

        <AuthInputBox>
          <CodeCounterBox>
            <CodeBox>CODE</CodeBox>
            <CounterBox>
              {minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </CounterBox>
          </CodeCounterBox>
          <AuthInput
            placeholder="이메일에 적혀있는 인증코드를 입력해주세요."
            onChange={onChangeAuthCode}
          ></AuthInput>
        </AuthInputBox>

        <NextButton
          onClick={() => {
            signup(userEmail, userPW, userNickname, authCode);
          }}
        >
          다음
        </NextButton>
      </Content>
    </Layout>
  );
};

export default AuthCodePage;

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 64px);
  justify-content: space-between;
`;

const TopView = styled.div`
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  color: #171717;
  font-weight: medium;
  margin-top: 25px;
  flex-shrink: 0;
`;

const MainText = styled.div`
  font-size: 18px;
`;

const AuthGuideBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AuthInputBox = styled.div`
  width: 248px;
  height: 46px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-top: 24px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;
const AuthText = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  color: #5c369a;
`;
const CodeBox = styled.div`
  width: 35px;
  height: 10px;
  font-weight: 300;
  font-size: 10px;
  line-height: 10px;
  text-align: center;
  color: #333333;
`;
const EmailBox = styled.div`
  width: 119px;
  height: 10px;
  font-weight: 300;
  font-size: 10px;
  line-height: 10px;
  text-align: center;
  color: #333333;
  margin-top: 7px;
  margin-bottom: 10px;
`;
const RequsetAuthCodeButton = styled.button`
  width: 85px;
  height: 20px;
  background: linear-gradient(180deg, #734ae7 0%, #4c2f9c 100%);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-size: 10px;
  color: white;
`;
const NextButton = styled.button`
  width: 249px;
  height: 72px;
  background: linear-gradient(180deg, #734ae7 0%, #4c2f9c 100%);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-size: 24px;
  color: white;
`;
const CodeCounterBox = styled.div`
  width: 229px;
  display: flex;
  justify-content: space-between;
`;
const CounterBox = styled.div`
  width: 27px;
  height: 10px;
  font-weight: 300;
  font-size: 10px;
  line-height: 10px;
  color: #666666;
`;
const AuthInput = styled.input`
  width: 229px;
  font-weight: 300;
  font-size: 10px;
  line-height: 10px;
  color: #666666;
  outline: none;
`;
