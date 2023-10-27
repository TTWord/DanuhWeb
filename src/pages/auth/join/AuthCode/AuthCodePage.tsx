import React, { useState, ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import { globalState } from '@/recoil';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import useSignup from '@/pages/auth/join/AuthCode/hooks/useSignup';
import { TailSpin } from 'react-loader-spinner';
import WideButton from '@/components/common/button/WideButton';
import useSendmail from '@/pages/auth/join/Join/hooks/useSendmail';
import Counter from './components/Counter';
import TopAppBarStack from '@/components/common/header/TopAppBarStack';
import Title from '@/components/common/header/Title';
import CodeResendButton from '../../components/CodeResendButton';
import { useLocation } from 'react-router-dom';

const AuthCodePage = () => {
  const location = useLocation();
  const username: string = location.state.username;

  const userEmail = username.split('@')[0];
  const userDomain = username.split('@')[1];
  const userPw = location.state.password;
  const userNickname = location.state.nickname;

  const signup = useSignup();
  const { isLoading, sendmail, error, setError } = useSendmail();

  //const [timer, setTimer] = useState(1);
  const setTimer = useSetRecoilState(globalState.auth.timer);
  const [codeTimeOut, setCodeTimeOut] = useRecoilState(
    globalState.auth.codeTimeOut,
  );
  const [isOk, setOk] = useState(false);
  const [authCode, setAuthCode] = useState('');

  const onChangeAuthCode = (e: ChangeEvent<HTMLInputElement>) => {
    const inputUserCode = e.target.value;
    if (inputUserCode.length === 6) {
      setOk(true);
    } else {
      setOk(false);
    }
    setAuthCode(inputUserCode);
  };

  const onClickRequestCode = async () => {
    // 실행 조건 정해야함
    if (codeTimeOut) {
      await sendmail(userEmail + '@' + userDomain, userPw, userNickname);
      setCodeTimeOut(false);
      setTimer(180);
    }
  };

  return (
    <Layout>
      <TopAppBarStack
        type={'page'}
        navigate="/auth/join/info"
        currentPage={3}
        lastPage={3}
      />
      <Title title="인증코드가 발송되었어요" />
      <Content>
        <CenterView>
          <AuthGuideBox>
            <AuthEmail>{userEmail + '@' + userDomain}</AuthEmail>
            <GuideComment>
              이메일로 발송된 인증코드를 입력해주세요.
            </GuideComment>
          </AuthGuideBox>
          <AuthInputBox>
            <AuthInput
              type="text"
              placeholder="000000"
              onChange={onChangeAuthCode}
              value={authCode}
              maxLength={6}
            />
          </AuthInputBox>
          <CounterBox>
            <Counter />
          </CounterBox>
          <RequestAuthCodeComment>
            메일을 받지 못하셨나요?
          </RequestAuthCodeComment>

          <CodeResendButton onClick={onClickRequestCode} />
        </CenterView>

        <BottomView>
          <WideButton
            isActive={isOk}
            onClick={() => {
              if (isOk) {
                signup(username, userPw, userNickname, authCode);
              }
            }}
          >
            {isLoading ? (
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
              '시작하기'
            )}
          </WideButton>
        </BottomView>
      </Content>
    </Layout>
  );
};

export default AuthCodePage;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 64px);
  justify-content: space-between;
`;

const CenterView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const AuthGuideBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AuthEmail = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 1;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary.default};
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
`;

const GuideComment = styled.div`
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: #666666;
  margin-top: 16px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
`;

const AuthInputBox = styled.div`
  width: 206px;
  height: 76px;
  background: #f8f7fb;
  border-radius: 10px;
  margin-top: 24px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AuthInput = styled.input`
  width: 166px;
  height: 52px;
  font-weight: 300;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.secondary.default};
  outline: none;
  padding: 0 6px;
  letter-spacing: 4px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  border-bottom: 1px solid #e7e7e7;
  box-sizing: border-box;
  text-align: center;
  caret-color: black;
  transition: all 0.3s;
  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary.default};
  }

  &::placeholder {
    color: #eeeef2;
  }
`;

const CounterBox = styled.div`
  width: 206px;
  height: auto;
  padding: 0 8px;
`;

const RequestAuthCodeComment = styled.div`
  width: 100%;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  color: #666666;
  font-size: 12px;
  font-weight: 300;
  margin-top: 36px;
  margin-bottom: 16px;
`;

const BottomView = styled.div`
  width: 100%;
  flex-shrink: 0;
  padding: 0 24px;
  margin-bottom: 36px;
`;
