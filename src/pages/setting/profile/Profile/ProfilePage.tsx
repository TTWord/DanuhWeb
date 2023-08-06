import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import useChangeNickname from '@/pages/setting//profile/Profile/hooks/useChangeNickname';
import useChangeProfilePic from './hooks/useChangeProfilePic';
import backIcon from '@/assets/svg/icons/icon-back-gray.svg';
import removeIcon from '@/assets/svg/icons/Icon-input-x-button.svg';
import useNavigatePop from '@/hooks/useNavigatePop';

const ProfilePage = () => {
  const navigatePop = useNavigatePop();
  // const getUserInfo = useGetUserInfo();
  const changeNewNickname = useChangeNickname();

  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [newNickname, setNewNickname] = useState('');

  const changeProfilePic = useChangeProfilePic();
  const profilePicRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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
    navigatePop('/setting');
  };

  const removeNickname = () => {
    if (inputRef.current) inputRef.current.value = '';
  };

  useEffect(() => {
    const setUserInfo = async () => {
      // const { data: response } = await getUserInfo();
      // setUsername(response.username);
      // setNickname(response.nickname);
      // setProfilePic(response.url);
    };
    setUserInfo();
  }, []);

  const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  return (
    <MainWrapper>
      <Header>
        <BackButton onClick={goBack}>
          <img src={backIcon} alt="backImg" />
        </BackButton>
        프로필 변경
      </Header>

      <ContentWrapper>
        <ImgWrapper onClick={uploadOnClick}>
          <ProfilePic src={profilePic} />
          <UploadImg
            type="file"
            ref={profilePicRef}
            onChange={uploadImage}
            accept=".jpg, .png, .jpeg"
          />
        </ImgWrapper>
        <NicknameWrapper>
          <Nickname
            ref={inputRef}
            type="text"
            placeholder={nickname}
            onChange={changeNickname}
          />
          <img onClick={removeNickname} src={removeIcon} alt="deleteIcon" />
        </NicknameWrapper>

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
        <ApplyButton>저장하기</ApplyButton>
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
  font-style: normal;
`;

const Header = styled.div`
  width: 100%;
  height: 56px;
  font-weight: 600;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  flex-shrink: 0;
`;

const BackButton = styled.button`
  margin-right: 16px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 56px;
`;

const ImgWrapper = styled.div`
  width: 140px;
  height: 140px;
  aspect-ratio: 1/1;
  background-color: ${({ theme }) => theme.colors.gray[400]};
  border-radius: 100%;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  border-radius: 140%;

  :hover {
    cursor: pointer;
  }
`;

const UploadImg = styled.input`
  display: none;
`;

const ProfilePic = styled.img`
  width: 140px;
  height: 140px;
  aspect-ratio: 1/1;
  border-radius: 140%;
`;

const NicknameWrapper = styled.div`
  width: 100%;
  padding: 10px 16px;
  color: #000000;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary[600]};
  margin-bottom: 12px;
  display: flex;
`;

const Nickname = styled.input`
  width: 100%;
  height: 100%;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  outline: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const Username = styled.div`
  font-weight: 300;
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const ProfileForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 20px;
`;

const ApplyButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.primary.default};
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
  text-align: center;
  color: #ffffff;
`;
