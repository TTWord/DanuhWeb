import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { globalState } from '@/recoil';
import { api } from '@/api';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import mascot from '@/assets/svg/logos/logo-character.svg';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useRecoilState(globalState.auth.username);
  const [userDomain, setUserDomain] = useRecoilState(globalState.auth.domain);
  const [userNickname, setUserNickname] = useRecoilState(
    globalState.auth.nickname,
  );
  const [isLoading, setIsLoading] = useState(false);

  const getUserInfo = async () => {
    try {
      const { data: response } = await api.user.getUserInfo();

      if (response.status === 'OK') {
        const username = response.data.username;
        setUserEmail(username.split('@')[0]);
        setUserDomain(username.split('@')[1]);
        setUserNickname(response.data.nickname);
        setIsLoading(true);
        setTimeout(() => {
          navigate('/book');
        }, 2000);
      }
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      const errorMessage = err?.response?.data.message;
      Swal.fire({
        icon: 'error',
        title: errorMessage,
      });
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
            <div>님</div>,
          </UserNameText>
          <Welcome>환영합니다</Welcome>
          <UserEmail>
            {userEmail ? userEmail + '@' + userDomain : null}
          </UserEmail>

          <Mascot src={mascot} alt="mascot" />
        </>
      )}
    </WebWrapper>
  );
};

export default WelcomePage;

// 스타일 정의
const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 0 32px;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  img {
    height: 249px;
  }
`;

const UserNameText = styled.div`
  font-weight: 300;
  font-size: 20px;
  color: #333333;
  display: flex;
  line-height: 1;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
`;

const UserName = styled.div`
  font-weight: 500;
`;

const Welcome = styled.div`
  font-weight: 500;
  font-size: 36px;
  line-height: 1;
  color: #5c369a;
  font-weight: 700;
  margin-top: 14px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
`;

const UserEmail = styled.div`
  font-weight: 300;
  color: #333333;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 200px;
`;

const Mascot = styled.img`
  position: absolute;
  bottom: 55px;
  right: 32px;
`;
