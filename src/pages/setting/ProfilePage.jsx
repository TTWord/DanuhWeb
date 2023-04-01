import React, { useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import backImg from '@/assets/svg/icons/icon-back-button.svg';
import { useNavigate } from 'react-router-dom';
import uploadImg from '@/assets/svg/icons/icon-image-upload.svg';

const ProfilePage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [nickname, setNickname] = useState('박수봉');

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
          <button>
            <img src={uploadImg} alt="uploadImg" />
          </button>
        </ImgWrapper>
        <Nickname type="text" placeholder={nickname} />
        <Line />
        <Username>tnqhd1139@naver.com</Username>
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
  button {
    position: absolute;
    right: 20px;
    bottom: 22px;
  }
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
