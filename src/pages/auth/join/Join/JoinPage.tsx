import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import useSendmail from '@/pages/auth/join/Join/hooks/useSendmail';
import { globalState } from '@/recoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TailSpin } from 'react-loader-spinner';
import FooterButton from '@/components/common/button/FooterButton';
import TopBar from '@/components/common/header/TopBar';
import Title from '@/components/common/header/Title';
import InputLogin from '@/components/common/input/InputLogin';
import Input from '@/components/common/input/Input';

const JoinPage = () => {
  const buttonRef = useRef(null);
  const [isOk, setIsOk] = useState(false);
  const { isLoading, sendmail, error, setError } = useSendmail();

  const [userEmailStart, setUserEmailStart] = useRecoilState(
    globalState.auth.emailId,
  );
  const [userEmailEnd, setUserEmailEnd] = useRecoilState(
    globalState.auth.emailDomain,
  );
  const [emailError, setEmailError] = useState('');

  const [userPw, setUserPW] = useRecoilState(globalState.auth.password);
  const [pwError, setPwError] = useState('');
  const [userPwConfirm, setUserPWConfirm] = useState('');
  const [pwConfirmError, setPwConfirmError] = useState('');

  const nickname = useRecoilValue(globalState.auth.nickname);

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
      if (error === 'USER_INVALID_FORMAT_USERNAME') {
        setEmailError('이메일을 형식에 맞게 입력해주세요');
      } else if (error === 'USER_DUPLICATE_USERNAME') {
        setEmailError('이미 가입된 이메일입니다');
      } else if (error === 'USER_INVALID_FORMAT_PASSWORD') {
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onJoin();
  };

  return (
    <Layout>
      <TopBar type="page" navigate="/auth/join" currentPage={2} lastPage={3} />
      <Title title="아이디와 비밀번호를 설정해주세요" />

      <Content onSubmit={onSubmit}>
        <CenterView>
          <CenterViewWrapper>
            <InputBox>
              <InputTitle>아이디</InputTitle>
              <InputLogin
                setEmailId={setUserEmailStart}
                setDomain={setUserEmailEnd}
              />
              <InputError>{emailError}</InputError>
            </InputBox>

            <InputBox>
              <InputTitle>
                비밀번호
                <Comment>영문포함, 숫자포함, 특수문자포함 8자 이상</Comment>
              </InputTitle>
              <Input
                type="password"
                onChange={setUserPW}
                value={userPw}
                placeholder="비밀번호"
              />
              <InputError>{pwError}</InputError>
            </InputBox>

            <InputBox>
              <InputTitle>비밀번호 확인</InputTitle>
              <Input
                type="password"
                onChange={setUserPWConfirm}
                value={userPwConfirm}
                placeholder="비밀번호 확인"
              />
              <InputError>{pwConfirmError}</InputError>
            </InputBox>
            {/*  */}
          </CenterViewWrapper>
        </CenterView>

        <BottomView>
          <FooterButton ref={buttonRef} isActive={isOk} onClick={onJoin}>
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
          </FooterButton>
        </BottomView>
      </Content>
      {/* Form 태그로 바꾸기 */}
    </Layout>
  );
};

export default JoinPage;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Content = styled.form`
  display: flex;
  flex-direction: column;
  height: calc(100% - 56px - 50px);
  justify-content: space-between;
`;

const CenterView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
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
  ${({ theme }) => theme.typography.pretendard.b1.md};
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const Comment = styled.span`
  font-size: 12px;
  color: #4ad9e2;
  margin-left: 12px;
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
