import React, { ChangeEvent, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useSendmail from '@/pages/auth/hooks/useSendmail';
import { globalState } from '@/recoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TailSpin } from 'react-loader-spinner';
import iconArrowBack from '@/assets/svg/icons/icon-back-button.svg';
import useNavigatePop from '@/hooks/useNavigatePop';
import iconArrowDown from './svg/icon-arrow-down.svg';
import BottomSlideSelectPop from '@/components/common/popup/BottomSlideSelectPop';

const JoinPage = () => {
  const [isOk, setIsOk] = useState(false);

  const { isLoading, sendmail, error, setError } = useSendmail();
  const navigate = useNavigate();

  const [userEmailStart, setUserEmailStart] = useRecoilState(
    globalState.auth.username,
  );

  const [userEmailEnd, setUserEmailEnd] = useRecoilState(
    globalState.auth.domain,
  );

  const [userEmailEditMode, setUserEmailEditMode] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [userPw, setUserPW] = useRecoilState(globalState.auth.password);
  const [pwError, setPwError] = useState('');
  const [userPwConfirm, setUserPWConfirm] = useState('');
  const [pwConfirmError, setPwConfirmError] = useState('');
  const nickname = useRecoilValue(globalState.auth.nickname);

  const inputUserEmailStart = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmailStart(e.target.value);
  };

  const inputUserEmailEnd = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmailEnd(e.target.value);
  };

  const inputUserPw = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPW(e.target.value);
  };

  const inputUserPwConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPWConfirm(e.target.value);
  };

  useEffect(() => {
    setError('');
    setEmailError('');
    setPwError('');
    setPwConfirmError('');

    if (
      userEmailStart.length > 0 &&
      userEmailEnd.length > 0 &&
      userPw.length > 0 &&
      userPwConfirm.length > 0
    ) {
      setIsOk(true);
    } else {
      setIsOk(false);
    }
  }, [userEmailStart, userEmailEnd, userPw, userPwConfirm]);

  useEffect(() => {
    if (error.length > 0) {
      if (error === 'INVALID_FORMAT_USERNAME') {
        setEmailError('이메일을 형식에 맞게 입력해주세요');
      } else if (error === 'DUPLICATE_USERNAME') {
        setEmailError('이미 가입된 이메일입니다');
      } else if (error === 'INVALID_FORMAT_PASSWORD') {
        setPwError('비밀번호를 형식에 맞게 입력해주세요');
      }
    }
  }, [error]);

  const onJoin = () => {
    if (isOk) {
      if (userPw !== userPwConfirm) {
        setPwConfirmError('비밀번호가 일치하지 않습니다');
      } else {
        sendmail(userEmailStart + '@' + userEmailEnd, userPw, nickname);
      }
    }
  };

  const navigatePop = useNavigatePop();
  const onBack = () => {
    navigatePop('/auth/join');
  };

  const [isPopOpen, setIsPopOpen] = useState(false);
  const onSwitchPop = () => {
    setIsPopOpen(!isPopOpen);
  };

  const onPopClose = () => {
    setIsPopOpen(false);
  };

  return (
    <Layout>
      <Header>
        <img src={iconArrowBack} alt="back" onClick={onBack} />
        <Chapter>2/3</Chapter>
      </Header>
      <Content>
        <TopView>
          <MainText>아이디와 비밀번호를 설정해주세요</MainText>
        </TopView>

        <CenterView>
          <CenterViewWrapper>
            <InputBox>
              <InputTitle>아이디</InputTitle>
              <InputWrapper>
                <Input
                  type="text"
                  onChange={inputUserEmailStart}
                  placeholder="이메일"
                  tw="w-1/2"
                />
                <EmailCenter>@</EmailCenter>
                <SelectMail>
                  {!userEmailEditMode && (
                    <MailButton onClick={onSwitchPop}>
                      <MailText isActive={userEmailEnd.length > 0}>
                        {userEmailEnd.length > 0 ? userEmailEnd : '선택'}
                      </MailText>
                      <img src={iconArrowDown} alt="arrow" />
                    </MailButton>
                  )}
                  {userEmailEditMode && (
                    <MailButton>
                      <Input
                        type="text"
                        onChange={inputUserEmailEnd}
                        placeholder="직접입력"
                        tw="w-full px-0"
                      />
                      <img
                        src={iconArrowDown}
                        alt="arrow"
                        onClick={onSwitchPop}
                      />
                    </MailButton>
                  )}
                  <BottomSlideSelectPop
                    isOpen={isPopOpen}
                    onPopClose={onPopClose}
                    data={[
                      {
                        text: 'naver.com',
                        onClick: () => {
                          setUserEmailEnd('naver.com');
                          setUserEmailEditMode(false);
                        },
                      },
                      {
                        text: 'gmail.com',
                        onClick: () => {
                          setUserEmailEnd('gmail.com');
                          setUserEmailEditMode(false);
                        },
                      },
                      {
                        text: 'daum.net',
                        onClick: () => {
                          setUserEmailEnd('daum.com');
                          setUserEmailEditMode(false);
                        },
                      },
                      {
                        text: '직접입력',
                        onClick: () => {
                          setUserEmailEnd('');
                          setUserEmailEditMode(true);
                        },
                      },
                    ]}
                  />
                </SelectMail>
              </InputWrapper>
              <InputError>{emailError}</InputError>
            </InputBox>
            <InputBox>
              <InputTitle>
                비밀번호
                <Comment>영문포함, 숫자포함, 특수문자포함 8자 이상</Comment>
              </InputTitle>
              <InputWrapper>
                <Input type="password" onChange={inputUserPw} value={userPw} />
              </InputWrapper>
              <InputError>{pwError}</InputError>
            </InputBox>
            <InputBox>
              <InputTitle>비밀번호 확인</InputTitle>
              <InputWrapper>
                <Input
                  type="password"
                  onChange={inputUserPwConfirm}
                  value={userPwConfirm}
                />
              </InputWrapper>
              <InputError>{pwConfirmError}</InputError>
            </InputBox>
          </CenterViewWrapper>
        </CenterView>

        <BottomView>
          <Next isActive={isOk} onClick={onJoin}>
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
              '메일 인증하기'
            )}
          </Next>
        </BottomView>
      </Content>
    </Layout>
  );
};

export default JoinPage;

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
`;

const CenterViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: -50px;
`;

const InputBox = styled.div`
  & + & {
    margin-top: 20px;
  }
`;

const InputTitle = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const Comment = styled.span`
  font-size: 12px;
  color: #4ad9e2;
  margin-left: 12px;
`;

const InputWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #e7e7e7;
  outline: none;
  font-size: 16px;
  height: 42px;
  line-height: 42px;
  display: flex;
  background-color: white;
  justify-content: space-between;
`;

const Input = styled.input`
  outline: none;
  width: 100%;
  color: #111111;
  padding: 0 16px;

  &::placeholder {
    color: #dadada;
  }
`;

const SelectMail = styled.div`
  color: #dadada;
  padding: 0 16px;
  display: flex;
  width: 50%;
`;

const MailButton = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;

  img {
    width: 11px;
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

const EmailCenter = styled.div`
  width: 20px;
  flex-shrink: 0;
  text-align: center;
`;

const InputError = styled.div`
  height: 14px;
  font-size: 14px;
  color: #ff3a3a;
  margin-top: 8px;
`;

const BottomView = styled.div`
  width: 100%;
  height: 84px;
  flex-shrink: 0;
`;

const Next = styled.div<{
  isActive: boolean;
}>`
  width: 100%;
  height: 45px;
  display: flex;
  background-color: #999999;
  color: white;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s cubic-bezier(0.86, 0, 0.07, 1);

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #694ac2;
    `}
`;
