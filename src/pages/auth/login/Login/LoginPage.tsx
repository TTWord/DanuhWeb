import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import useLogin from '@/pages/auth/login/Login/hooks/useLogin';
import useSocialLogin from './hooks/useSocialLogin';
import BottomSlideSelectPop from '@/components/common/popup/BottomSlideSelectPop';

import backButtonImg from '@/assets/svg/icons/icon-back-button.svg';
import googleIcon from '@/assets/svg/icons/icon-google.svg';
import kakaoIcon from '@/assets/svg/icons/icon-kakao.svg';
import appleIcon from '@/assets/svg/icons/icon-apple.svg';
import iconArrowDown from '@/assets/svg/icons/icon-arrow-down.svg';
import useLoginPageNavigate from './hooks/useLoginPageNavigate';

const LoginPage = () => {
  const login = useLogin();
  const { kakaoLogin, googleLogin, appleLogin } = useSocialLogin();
  const { runAuthPage, runJoinPage } = useLoginPageNavigate();

  const domainList = [
    {
      text: 'naver.com',
      onClick: () => {
        setEmailDomain('naver.com');
        setDirectInput(false);
      },
    },
    {
      text: 'gmail.com',
      onClick: () => {
        setEmailDomain('gmail.com');
        setDirectInput(false);
      },
    },
    {
      text: 'daum.net',
      onClick: () => {
        setEmailDomain('daum.com');
        setDirectInput(false);
      },
    },
    {
      text: '직접입력',
      onClick: () => {
        setEmailDomain('');
        setDirectInput(true);
      },
    },
  ];

  // 비밀번호 표시용
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [emailID, setEmailID] = useState<string>('');
  const [emailDomain, setEmailDomain] = useState<string>('');
  const [isDirectInput, setDirectInput] = useState(false);
  const [isLoginFocus, setLoginFocus] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [isPassWDFocus, setPassWDFocus] = useState<boolean>(false);

  const [isOk, setIsOk] = useState<boolean>(false);

  const [isPopOpen, setIsPopOpen] = useState(false);
  const onSwitchPop = () => {
    setIsPopOpen(!isPopOpen);
  };

  const onPopClose = () => {
    setIsPopOpen(false);
  };

  const inputUserEmailEnd = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailDomain(e.target.value);
  };

  useEffect(() => {
    if (emailID.length > 0 && emailDomain.length > 0 && password.length > 0) {
      setIsOk(true);
    } else {
      setIsOk(false);
    }
  }, [emailID, emailDomain, password]);

  useEffect(() => {
    if (isDirectInput === true) {
      setEmailDomain('');
    }
  }, [isDirectInput]);

  return (
    <WebWrapper>
      <Header>
        <BackButton onClick={runAuthPage}>
          <img src={backButtonImg} alt="backButtonImg" />
        </BackButton>

        <Title>이메일로 로그인</Title>
      </Header>

      <Container>
        <FormBox>
          <span>아이디</span>
          <EmailBox isFocus={isLoginFocus}>
            <EmailID
              onChange={e => {
                setEmailID(e.target.value);
              }}
              type="text"
              placeholder="이메일"
              onFocus={() => {
                setLoginFocus(true);
              }}
              onBlur={() => {
                setLoginFocus(false);
              }}
            />
            <EmailCenter>@</EmailCenter>

            <EmailDomain
              onClick={() => {
                if (!isDirectInput) {
                  setLoginFocus(current => !current);
                  onSwitchPop();
                }
              }}
            >
              {!isDirectInput ? (
                <MailButton onClick={onSwitchPop}>
                  <MailText isActive={emailDomain.length > 0}>
                    {emailDomain.length > 0 ? emailDomain : '선택'}
                  </MailText>
                  <img src={iconArrowDown} alt="arrow" />
                </MailButton>
              ) : (
                <MailButton>
                  <DirectInput
                    onChange={inputUserEmailEnd}
                    placeholder="직접입력"
                    onFocus={() => {
                      setLoginFocus(true);
                    }}
                    onBlur={() => {
                      setLoginFocus(false);
                    }}
                  />
                  <img src={iconArrowDown} alt="arrow" onClick={onSwitchPop} />
                </MailButton>
              )}
              <BottomSlideSelectPop
                isOpen={isPopOpen}
                onPopClose={onPopClose}
                data={domainList}
              />
            </EmailDomain>
          </EmailBox>
        </FormBox>

        <FormBox>
          <span>비밀번호</span>
          <PasswordBox
            isFocus={isPassWDFocus}
            onChange={e => {
              setPassword(e.target.value);
            }}
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            onFocus={() => {
              setPassWDFocus(true);
            }}
            onBlur={() => {
              setPassWDFocus(false);
            }}
          />
        </FormBox>

        <Join>
          아직 계정이 없으신가요?
          <SignInButton onClick={runJoinPage}>회원가입</SignInButton>
        </Join>
      </Container>

      <Footer>
        <SocialWrapper>
          SNS로 로그인하기
          <SocialButtonWrapper>
            <GoogleLogin onClick={googleLogin}>
              <img src={googleIcon} alt="googleIcon" />
            </GoogleLogin>
            <KakaoLogin onClick={kakaoLogin}>
              <img src={kakaoIcon} alt="kakaoIcon" />
            </KakaoLogin>
            <AppleLogin onClick={appleLogin}>
              <img src={appleIcon} alt="appleIcon" />
            </AppleLogin>
          </SocialButtonWrapper>
        </SocialWrapper>
        <LoginButton
          isActive={isOk}
          onClick={() => {
            if (isOk) {
              login(`${emailID}@${emailDomain}`, password);
            }
          }}
        >
          로그인
        </LoginButton>
      </Footer>

      {/* 공간 분리 */}
    </WebWrapper>
  );
};

export default LoginPage;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  padding-left: 16px;
`;

const BackButton = styled.button`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  height: 50px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-size: 18px;
  font-weight: 400;
  line-height: 140%;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  flex: 1;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #242424;
  margin-bottom: 24px;

  span {
    font-weight: bold;
  }
`;

const EmailBox = styled.div<{ isFocus: boolean }>`
  height: 42px;
  display: flex;
  font-size: 16px;
  background-color: white;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 6px;
  border-bottom: 1px solid #e7e7e7;

  ${({ isFocus }) => {
    return (
      isFocus &&
      css`
        border-bottom: 1px solid ${({ theme }) => theme.colors.primary.default};
      `
    );
  }}
`;

const EmailID = styled.input`
  width: 50%;
  height: 100%;
  padding-left: 16px;
  padding-right: 8px;
  display: flex;
  align-items: center;
  outline: none;

  ::placeholder {
    color: #dadada;
  }
`;

const EmailCenter = styled.div`
  width: 20px;
  flex-shrink: 0;
  text-align: center;
`;

const EmailDomain = styled.div`
  width: 50%;
  height: 100%;
  padding-left: 8px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  outline: none;
  color: #dadada;

  :hover {
    cursor: pointer;
  }
`;

const MailText = styled.div<{
  isActive: boolean;
}>`
  width: 100%;

  ${({ isActive }) =>
    isActive &&
    css`
      color: #111111;
    `}
`;

const MailButton = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;

  img {
    width: 11px;
  }
`;

const DirectInput = styled.input`
  width: 100%;
  height: 100%;
  padding-right: 16px;
  display: flex;
  align-items: center;
  outline: none;
  ::placeholder {
    color: #dadada;
  }
`;

const PasswordBox = styled.input<{ isFocus: boolean }>`
  height: 42px;
  padding-left: 16px;
  font-size: 16px;
  outline: none;
  margin-top: 6px;
  border-bottom: 1px solid #e7e7e7;
  border-radius: 0;

  ${({ isFocus }) => {
    return (
      isFocus &&
      css`
        border-bottom: 1px solid ${({ theme }) => theme.colors.primary.default};
      `
    );
  }}
`;

const Join = styled.div`
  width: auto;
  height: auto;
  font-size: 12px;
  margin-top: 8px;
`;

const SignInButton = styled.button`
  line-height: 120%;
  border-bottom: 1px solid;
  font-weight: 700;
  margin-left: 4px;
`;

const SocialWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialButtonWrapper = styled.div`
  width: 176px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 40px 0;
`;

const SocialLogin = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GoogleLogin = styled(SocialLogin)`
  border: 1px solid #e3e6ea;
`;

const KakaoLogin = styled(SocialLogin)`
  background-color: #ffdf37;
`;

const AppleLogin = styled(SocialLogin)`
  background-color: #000000;
`;

const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  padding-bottom: 36px;
`;

const LoginButton = styled.button<{
  isActive: boolean;
}>`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-weight: 400;
  font-size: 14px;
  color: white;
  text-align: center;
  background-color: #c5c6d0;

  ${({ isActive }) => {
    return (
      isActive &&
      css`
        background-color: ${({ theme }) => theme.colors.primary.default};
      `
    );
  }}
`;
