import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { globalState } from '@/recoil';

import mascot from '@/assets/svg/logos/logo-character.svg';

const WelcomePage = () => {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(globalState.auth.username);
  const userDomain = useRecoilValue(globalState.auth.domain);
  const userNickname = useRecoilValue(globalState.auth.nickname);

  // Title 변경
  useEffect(() => {
    setTimeout(() => {
      navigate('/book');
    }, 3000);
  }, []);

  return (
    <WebWrapper>
      <UserNameText>
        <UserName>{userNickname}</UserName>
        <div>님</div>,
      </UserNameText>
      <Welcome>환영합니다</Welcome>
      <UserEmail>{userEmail ? userEmail + '@' + userDomain : null}</UserEmail>

      <Mascot src={mascot} alt="mascot" />
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
