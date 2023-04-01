import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { globalState } from '@/recoil';
import backImg from '@/assets/svg/icons/icon-back-button.svg';
import uploadImg from '@/assets/svg/icons/icon-image-upload.svg';

const ProfilePage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const username = useRecoilValue(globalState.auth.setUsername);
  const nickname = useRecoilValue(globalState.auth.setNickname);
  const profilePic = useRecoilValue(globalState.auth.setProfilePic);

  return (
    <MainWrapper>
      <HeaderWrapper>
        <BackButton onClick={goBack}>
          <img src={backImg} alt="backImg" />
        </BackButton>
        프로필 변경
      </HeaderWrapper>

      <ContentWrapper>
        <ImgWrapper>
          <ProfilePic src={profilePic} />
          <button>
            <img src={uploadImg} alt="uploadImg" />
          </button>
        </ImgWrapper>
        <Nickname type="text" placeholder={nickname} />
        <Line />
        <Username>{username}</Username>
      </ContentWrapper>

      <ApplyButton>적용하기</ApplyButton>
    </MainWrapper>
  );
};

export default ProfilePage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 62px;
  border-bottom: 1px solid #666666;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BackButton = styled.button`
  position: absolute;
  left: 20px;
  img {
    height: 12px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;
const ImgWrapper = styled.div`
  position: relative;
  width: 216px;
  height: 216px;
  background: #e0e0e0;
  border-radius: 20px;
  margin-bottom: 17px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  button {
    position: absolute;
    right: 20px;
    bottom: 22px;
  }
`;
const ProfilePic = styled.img`
  width: 216px;
  height: auto;
`;

const Nickname = styled.input`
  width: 216px;
  font-weight: 300;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  color: #000000;
  ::placeholder {
    color: #000000;
  }
`;
const Line = styled.div`
  width: 216px;
  border: 1px solid #cfcfcf;
  margin: 6px 0 6px 0;
`;
const Username = styled.div`
  font-weight: 300;
  font-size: 12px;
  line-height: 12px;
  color: #333333;
`;

const ApplyButton = styled.button`
  position: fixed;
  bottom: 25px;
  width: 344px;
  height: 80px;
  background: #724fab;
  border-radius: 5px;
  font-weight: 300;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`;
