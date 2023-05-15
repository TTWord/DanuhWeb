import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import useLogin from '@/pages/auth/LoginPage/hooks/useLogin';
import useSocialLogin from '@/pages/auth/hooks/useSocialLogin';
import backButtonImg from '@/assets/svg/icons/icon-back-button.svg';
import googleIcon from '@/assets/svg/icons/icon-google.svg';
import kakaoIcon from '@/assets/svg/icons/icon-kakao.svg';
import appleIcon from '@/assets/svg/icons/icon-apple.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useLogin();
  const socialLogin = useSocialLogin();

  const goBack = () => {
    navigate('/auth', { state: { direction: 'navigate-pop' } });
  };

  const kakaoLogin = () => {
    socialLogin('kakao');
  };
  const googleLogin = () => {
    socialLogin('google');
  };
  const appleLogin = () => {
    socialLogin('apple');
  };

  const goJoin = () => {
    navigate('/auth/join');
  };

  const domainList = [
    'naver.com',
    'gmail.com',
    'google.com',
    'hanmail.net',
    'daum.net',
  ];
  const domainRef = useRef<HTMLDivElement>(null);
  const [isSelectopen, setSelectOpen] = useState(false);
  const [isDirectInput, setDirectInput] = useState(false);

  // 비밀번호 표시용
  const [showPassWD, setShowPassWD] = useState<boolean>(false);

  const [emailID, setEmailID] = useState<string>('');
  const [emailDomain, setEmailDomain] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isLoginFocus, setLoginFocus] = useState<boolean>(false);
  const [isPassWDFocus, setPassWDFocus] = useState<boolean>(false);

  const [isOk, setIsOk] = useState<boolean>(false);

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
        <BackButton onClick={goBack}>
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
                  setSelectOpen(!isSelectopen);
                  setLoginFocus(current => !current);
                }
              }}
              ref={domainRef}
            >
              {!isDirectInput ? (
                '선택'
              ) : (
                <DirectInput
                  onChange={e => setEmailDomain(e.target.value)}
                  placeholder="직접입력"
                  onFocus={() => {
                    setLoginFocus(true);
                  }}
                  onBlur={() => {
                    setLoginFocus(false);
                  }}
                />
              )}
            </EmailDomain>
            <CustomSelectBox isActive={isSelectopen}>
              {domainList.map((items, idx) => {
                return (
                  <CustomSelect
                    key={idx}
                    onClick={(e: any) => {
                      const selectDomain = e.target.innerText;
                      // @ts-ignore
                      domainRef.current.innerText = selectDomain;
                      setEmailDomain(selectDomain);
                      setSelectOpen(!isSelectopen);
                      setLoginFocus(current => !current);
                    }}
                  >
                    {items}
                  </CustomSelect>
                );
              })}
              <CustomSelect
                onClick={() => {
                  setSelectOpen(!isSelectopen);
                  setDirectInput(!isDirectInput);
                  setLoginFocus(current => !current);
                }}
              >
                직접입력
              </CustomSelect>
            </CustomSelectBox>
          </EmailBox>
        </FormBox>

        <FormBox>
          <span>비밀번호</span>
          <PasswordBox
            isFocus={isPassWDFocus}
            onChange={e => {
              setPassword(e.target.value);
            }}
            type={showPassWD ? 'text' : 'password'}
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
          <SignInButton onClick={goJoin}>회원가입</SignInButton>
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
            login(`${emailID}@${emailDomain}`, password);
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
  padding: 20px 0 0 20px;
`;

const BackButton = styled.button`
  width: 100%;
  margin-bottom: 46px;
`;

const Title = styled.div`
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-size: 20px;
  font-weight: 400;
  line-height: 140%;
  display: flex;
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

  ${({ isFocus }) => {
    return isFocus
      ? 'border-bottom: 1px solid #694AC2;'
      : 'border-bottom: 1px solid #E7E7E7;';
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
  display: flex;
  align-items: center;
  outline: none;

  :hover {
    cursor: pointer;
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

const CustomSelectBox = styled.div<{
  isActive: boolean;
}>`
  display: none;
  width: auto;
  position: absolute;
  z-index: 1;
  right: 0;
  top: 100%;
  border: 1px solid;
  background-color: white;

  ${({ isActive }) =>
    isActive &&
    css`
      display: block;
    `}
`;

const CustomSelect = styled.button`
  width: 100%;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: #694ac2;
    color: white;
  }
`;

const PasswordBox = styled.input<{ isFocus: boolean }>`
  height: 42px;
  padding-left: 16px;
  font-size: 16px;
  outline: none;
  margin-top: 6px;

  ${({ isFocus }) => {
    return isFocus
      ? 'border-bottom: 1px solid #694AC2;'
      : 'border-bottom: 1px solid #E7E7E7;';
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

const LoginButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-weight: 400;
  font-size: 14px;
  color: white;
  text-align: center;

  ${({ isActive }) => {
    return isActive
      ? 'background-color: #734ae8;'
      : 'background-color: #C5C6D0;';
  }}
`;
