import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api';
import { AxiosError } from 'axios';
import iconMemo from '@/assets/svg/icons/icon-memo.svg';
import iconBook from '@/assets/svg/icons/icon-book-new.svg';
import iconDrawer from '@/assets/svg/icons/icon-drawer.svg';
import useToast from '@/hooks/useToast';

const WelcomePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [userNickname, setUserNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getUserInfo = async () => {
    try {
      const { data: response } = await api.user.getMyInfo();

      if (response.status === 'OK') {
        setUserNickname(response.data.nickname);
        setIsLoading(true);
        setTimeout(() => {
          navigate('/book');
        }, 3000);

        return;
      }
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorMessage = err?.response?.data.message;
      switch (errorMessage) {
        default:
          toast.error('에러가 발생하였습니다.');
          break;
      }
    }
  };

  // 정보 가져오기
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <WebWrapper>
      {!isLoading && <></>}

      {isLoading && (
        <>
          <UserNameText>
            <UserName>{userNickname}</UserName>
            <Span>님,</Span>
          </UserNameText>
          <Welcome>환영합니다</Welcome>

          <IconWrapper>
            <Icon src={iconMemo} alt="iconMemo" />
            <Icon src={iconBook} alt="iconBook" />
            <Icon src={iconDrawer} alt="iconDrawer" />
          </IconWrapper>
        </>
      )}
    </WebWrapper>
  );
};

export default WelcomePage;

// 스타일 정의
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
100% {
    opacity: 1;
  }
`;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 32px;
  justify-content: center;
  align-items: flex-start;
  position: relative;
`;

const UserNameText = styled.div`
  display: flex;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[700]};
  opacity: 0;
  animation: ${fadeIn} 1.5s linear forwards;
  animation-delay: 0s;
`;

const UserName = styled.div`
  background-color: ${({ theme }) => theme.colors.primary[200]};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[700]};
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 2px;
  padding-top: 5px;
`;

const Span = styled.span`
  color: ${({ theme }) => theme.colors.gray[700]};
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  line-height: 100%;
  display: flex;
  align-items: end;
`;

const Welcome = styled.div`
  line-height: 1;
  color: ${({ theme }) => theme.colors.gray[700]};
  font-weight: 700;
  font-size: 36px;
  margin-top: 14px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  opacity: 0;
  animation: ${fadeIn} 2s linear forwards;
  animation-delay: 1s;
`;

const IconWrapper = styled.div`
  position: absolute;
  bottom: 120px;
  right: 32px;
  display: flex;
`;

const Icon = styled.img`
  & + & {
    margin-left: 27px;
  }
`;
