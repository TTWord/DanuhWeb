import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { globalState } from '@/recoil';

import mascot from '@/assets/svg/logo-character.svg';

const WelcomePage = () => {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(globalState.auth.username);
  const userNickname = useRecoilValue(globalState.auth.nickname);

  // Title 변경
  useEffect(() => {
    setTimeout(() => {
      navigate('/book');
    }, 3000);
  }, []);

  return (
    <MainWrapper>
      <UserNameBox>
        {userNickname}
        <div>님</div>,
      </UserNameBox>
      <WelcomeBox>환영합니다</WelcomeBox>
      <UserEmailBox>{userEmail}</UserEmailBox>

      <Mascot src={mascot} alt="mascot" />
    </MainWrapper>
  );
};

export default WelcomePage;

// 스타일 정의
const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  //align-items: flex-end;
  gap: 9px;
  position: absolute;
  top: 28%;
  left: 4%;
  img {
    height: 249px;
  }
`;

const UserNameBox = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 16px;
  color: #333333;
  display: flex;
  margin-bottom: 14px;
  div {
    font-weight: 300;
  }
`;
const WelcomeBox = styled.div`
  font-weight: 500;
  font-size: 36px;
  line-height: 24px;
  color: #5c369a;
  margin-bottom: 8px;
`;
const UserEmailBox = styled.div`
  font-weight: 300;
  font-size: 14px;
  line-height: 10px;
  color: #333333;
  //margin-bottom: 178px;
`;

const Mascot = styled.img`
  position: fixed;
  bottom: 6.8%;
  right: 10.8%;
`;
