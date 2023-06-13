import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import { globalState } from '@/recoil';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useSignup from '@/pages/auth/join/AuthCode/hooks/useSignup';
import iconArrowBack from '@/assets/svg/icons/icon-back-button.svg';
import useNavigatePop from '@/hooks/useNavigatePop';
import { TailSpin } from 'react-loader-spinner';

import useSendmail from '@/pages/auth/join/Join/hooks/useSendmail';
import Counter from './components/Counter';

const AuthCodePage = () => {
  const userEmail = useRecoilValue(globalState.auth.username);
  const userDomain = useRecoilValue(globalState.auth.domain);
  const userPw = useRecoilValue(globalState.auth.password);
  const userNickname = useRecoilValue(globalState.auth.nickname);

  const signup = useSignup();
  const { isLoading, sendmail, error, setError } = useSendmail();

  //const [timer, setTimer] = useState(1);
  const setTimer = useSetRecoilState(globalState.auth.timer);
  const setCodeTimeOut = useSetRecoilState(globalState.auth.codeTimeOut);

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

  const navigatePop = useNavigatePop();

  const onBack = () => {
    navigatePop('/auth/join/info');
  };

  const onClickRequestCode = async () => {
    try {
      await sendmail(userEmail + '@' + userDomain, userPw, userNickname);
      setCodeTimeOut(false);
      setTimer(180);
    } catch {}
  };

  return (
    <Layout>
      <Header>
        <img src={iconArrowBack} alt="back" onClick={onBack} />
        <Chapter>3/3</Chapter>
      </Header>

      <Content>
        <TopView>
          <MainText>인증코드가 발송되었어요</MainText>
        </TopView>
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
            />
          </AuthInputBox>
          <Counter />
          <RequestAuthCodeComment>
            메일을 받지 못하셨나요?
          </RequestAuthCodeComment>
          <RequsetAuthCodeButton onClick={onClickRequestCode}>
            인증코드 재발송
          </RequsetAuthCodeButton>
          {isLoading && (
            <TailSpin
              height="30"
              width="30"
              radius="1"
              color="#5c369a"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          )}
        </CenterView>

        <BottomView>
          <CodeError>인증코드를 다시 확인해주세요</CodeError>
          <NextButton
            isActive={isOk}
            onClick={() => {
              if (isOk) {
                signup(
                  userEmail + '@' + userDomain,
                  userPw,
                  userNickname,
                  authCode,
                );
              }
            }}
          >
            시작하기
          </NextButton>
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
  color: #5c369a;
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
  color: #666666;
  outline: none;
  padding: 0 6px;
  letter-spacing: 4px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  border-bottom: 1px solid #e7e7e7;
  box-sizing: border-box;
  text-align: center;

  &::placeholder {
    color: #eeeef2;
  }
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

const RequsetAuthCodeButton = styled.button`
  width: 87px;
  height: 24px;
  background: #694ac2;
  border-radius: 20px;
  font-size: 10px;
  color: white;
  margin-bottom: 16px;
`;

const BottomView = styled.div`
  width: 100%;
  height: 134px;
  flex-shrink: 0;
`;

const CodeError = styled.div`
  width: 195px;
  height: 34px;
  background-color: rgba(74, 208, 226, 0.06);
  border: 1px solid #4ad0e2;
  border-radius: 8px;
  color: #4ad0e2;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 16px;
  font-weight: 400;
  opacity: 0;
`;

const NextButton = styled.button<{
  isActive: boolean;
}>`
  width: 100%;
  height: 54px;
  background: #c5c6d0;
  border-radius: 10px;
  font-size: 24px;
  color: white;
  font-size: 14px;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #694ac2;
    `}
`;
