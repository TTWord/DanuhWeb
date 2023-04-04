import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import BackButtonImg from '@/assets/svg/icons/icon-back-button.svg';
import { useNavigate } from 'react-router-dom';
import { globalState } from '@/recoil';
import { useRecoilValue } from 'recoil';
import useSignup from '../hooks/useSignup';

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

  //Title 변경
  useEffect(() => {
    document.querySelector('title').innerHTML = '코드인증';
  }, []);

  // 네비게이트
  const navigate = useNavigate();

  const [authCode, setAuthCode] = useState('');

  const getAuthCode = e => {
    const inputUserCode = e.target.value;
    setAuthCode(inputUserCode);
  };

  return (
    <MainWrapper>
      <BackButton
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src={BackButtonImg} alt="BackButton" />
      </BackButton>

      <AuthGuideBox>
        <AuthText>인증코드 입력</AuthText>
        <EmailBox>{userEmail}</EmailBox>
        <RequsetAuthCodeButton>인증코드 재발송</RequsetAuthCodeButton>
      </AuthGuideBox>

      <AuthInputBox>
        <CodeCounterBox>
          <CodeBox>CODE</CodeBox>
          <CounterBox>
            0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </CounterBox>
        </CodeCounterBox>
        <AuthInput
          placeholder="이메일에 적혀있는 인증코드를 입력해주세요."
          onChange={getAuthCode}
        ></AuthInput>
      </AuthInputBox>

      <NextButton
        onClick={() => {
          signup(userEmail, userPW, userNickname, authCode);
        }}
      >
        다음
      </NextButton>
    </MainWrapper>
  );
};

export default AuthCodePage;

// 스타일 정의 => 나중에 스타일파일로 옮길 예정
export const MainWrapper = styled.div`
  width: 100%;
  height: 852px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BackButton = styled.button`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 26px;
  left: 26px;
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
