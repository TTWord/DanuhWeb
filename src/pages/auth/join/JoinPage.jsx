import React, { useEffect, useState } from 'react';
import BackButtonImg from '@/assets/svg/icons/icon-back-button.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useSendmail from '@/pages/auth/hooks/useSendmail';
import { globalState } from '@/recoil';
import { useRecoilState } from 'recoil';

const AuthInputBox = props => {
  return (
    <AuthInputWrapper>
      <CodeBox>{props.kind}</CodeBox>
      <AuthInput
        placeholder={props.placeholder}
        onChange={props.onChange}
        type={props.type}
        autoComplete="off"
      ></AuthInput>
    </AuthInputWrapper>
  );
};

const JoinPage = () => {
  // Title 변경
  useEffect(() => {
    document.querySelector('title').innerHTML = '회원가입';
  }, []);

  const sendmail = useSendmail();
  const navigate = useNavigate();

  const [userNickname, SetUserNickname] = useRecoilState(
    globalState.auth.nickname,
  );
  const [userEmail, SetUserEmail] = useRecoilState(globalState.auth.username);
  const [userPW, SetUserPW] = useRecoilState(globalState.auth.password);
  const [userPWConfirm, SetUserPWConfirm] = useState('');

  const inputUserEmail = e => {
    SetUserEmail(e.target.value);
  };
  const inputUserPW = e => {
    SetUserPW(e.target.value);
  };
  const inputUserPWConfirm = e => {
    SetUserPWConfirm(e.target.value);
  };
  const inputUserNickname = e => {
    SetUserNickname(e.target.value);
  };

  const onJoin = () => {
    if (userPW !== userPWConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      sendmail(userEmail, userPW, userNickname);
    }
  };

  return (
    <MainWrapper>
      <BackButton
        onClick={() => {
          navigate('/auth/login', { state: { direction: 'navigate-pop' } });
        }}
      >
        <img src={BackButtonImg} alt="BackButton" />
      </BackButton>

      <SignInText>회원가입</SignInText>

      <SignInwrapper>
        <AuthInputBox
          kind="USERNAME"
          placeholder="이메일을 입력해주세요"
          type="text"
          onChange={inputUserEmail}
        />
        <AuthInputBox
          kind="PASSWORD"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          onChange={inputUserPW}
        />
        <AuthInputBox
          kind="PASSWORD CONFIRM"
          placeholder="비밀번호를 한번 더 입력해주세요"
          type="password"
          onChange={inputUserPWConfirm}
        />
        <AuthInputBox
          kind="NICKNAME"
          placeholder="닉네임을 입력해주세요"
          type="text"
          onChange={inputUserNickname}
        />
      </SignInwrapper>

      <NextButton onClick={onJoin}>다음</NextButton>
    </MainWrapper>
  );
};

export default JoinPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
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

const SignInText = styled.div`
  width: 100px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  color: #5c369a;
`;

const SignInwrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 28px;
  margin-bottom: 12;
`;
const AuthInputWrapper = styled.div`
  width: 248px;
  height: 46px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-bottom: 11px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 11px;
`;
const CodeBox = styled.div`
  font-weight: 500;
  font-size: 10px;
  color: #333333;
`;
const AuthInput = styled.input`
  font-weight: 300;
  font-size: 10px;
  color: #666666;
  outline: none;
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
