import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { instance } from '@/instance';
import useChangeProfilePic from './SettingPage/useChangeProfilePic';
import backImg from '@/assets/svg/icons/icon-back-button.svg';
import uploadImg from '@/assets/svg/icons/icon-image-upload.svg';

const getUserInfoAPI = async () => {
  try {
    const response = await instance.get('/user/userservice');
    return response;
  } catch (e) {
    console.log(e);
  }
};

const changeNicknameAPI = async newNickname => {
  try {
    const response = await instance.put('/user/userservice', {
      to_nickname: newNickname,
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

const ProfilePage = () => {
  const changeProfilePic = useChangeProfilePic();
  const profilePicRef = useRef();
  const [file, setFile] = useState(null);
  const uploadImage = () => {
    // 파일 업로드
    const file = profilePicRef.current.files[0];
    setFile(file);
    // 업로드한 파일 미리보기
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
  };

  // 버튼 클릭하여 none처리한 file input 버튼 클릭
  const uploadOnClick = () => {
    profilePicRef.current.click();
  };

  // 뒤로 가기 기능
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [newNickname, setNewNickname] = useState('');
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await getUserInfoAPI();
      setUsername(response.data.data.username);
      setNickname(response.data.data.nickname);
      setProfilePic(response.data.data.url);
    };
    getUserInfo();
  }, []);

  const changeNickname = e => {
    setNewNickname(e.target.value);
  };

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
          <UploadImg
            type="file"
            ref={profilePicRef}
            onChange={uploadImage}
            accept=".jpg, .png, .jpeg"
          />
          <button onClick={uploadOnClick}>
            <img src={uploadImg} alt="uploadImg" />
          </button>
        </ImgWrapper>
        <Nickname
          type="text"
          placeholder={nickname}
          onChange={changeNickname}
        />
        <Line />
        <Username>{username}</Username>
      </ContentWrapper>

      <ProfileForm
        onSubmit={e => {
          e.preventDefault();
          if (file !== null) {
            const formData = new FormData();
            formData.append('file', file);
            changeProfilePic(formData);
          }
          if (newNickname !== nickname && newNickname !== '') {
            changeNicknameAPI(newNickname);
          }
        }}
      >
        <ApplyButton>적용하기</ApplyButton>
      </ProfileForm>
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
const UploadImg = styled.input`
  display: none;
`;

const ProfilePic = styled.img`
  width: 216px;
  height: 216px;
  border-radius: 20px;
`;

const Nickname = styled.input`
  width: 216px;
  font-weight: 300;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  color: #000000;
  ::placeholder {
    color: #e0e0e0;
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

const ProfileForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
`;
