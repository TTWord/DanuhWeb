import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import useGetUserInfo from '@/pages/setting//profile/Profile/hooks/useGetUserInfo';
import useChangeNickname from '@/pages/setting//profile/Profile/hooks/useChangeNickname';
import useChangeProfilePic from './hooks/useChangeProfilePic';
import backImg from '@/assets/svg/icons/icon-back-button.svg';
import uploadImg from '@/assets/svg/icons/icon-image-upload.svg';

const ProfilePage = () => {
  const navigate = useNavigate();
  const getUserInfo = useGetUserInfo();
  const changeNewNickname = useChangeNickname();

  const [nickname, setNickname] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [profilePic, setProfilePic] = useState<string>('');
  const [newNickname, setNewNickname] = useState<string>('');

  const changeProfilePic = useChangeProfilePic();
  const profilePicRef = useRef<any>(null);
  const [file, setFile] = useState<string | Blob>();

  const uploadImage = () => {
    // 파일 업로드
    const file: Blob = profilePicRef.current.files[0];
    setFile(file);
    // 업로드한 파일 미리보기
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        setProfilePic(String(reader.result));
      }
    };
  };

  // 버튼 클릭하여 none처리한 file input 버튼 클릭
  const uploadOnClick = () => {
    profilePicRef.current.click();
  };

  // 뒤로 가기 기능
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const setUserInfo = async () => {
      const { data: response } = await getUserInfo();
      setUsername(response.username);
      setNickname(response.nickname);
      setProfilePic(response.url);
    };
    setUserInfo();
  }, []);

  const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          if (file) {
            const formData = new FormData();
            formData.append('file', file);
            changeProfilePic(formData);
          }
          if (newNickname !== nickname && newNickname !== '') {
            changeNewNickname(newNickname);
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
