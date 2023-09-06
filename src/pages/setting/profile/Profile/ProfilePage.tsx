import React, { useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import useChangeNickname from '@/pages/setting//profile/Profile/hooks/useChangeNickname';
import useChangeProfilePic from './hooks/useChangeProfilePic';
import { useMutation, useQuery } from 'react-query';
import { api } from '@/api';
import InputAndCheck from '@/components/common/input/InputAndCheck';
import defaultProfile from '@/assets/svg/logos/logo-profile-default.svg';
import iconPencil from './svg/icon-pencil.svg';
import { instance } from '@/instance';
import StackLayout from '@/components/layout/StackLayout';
import WideButton from '@/components/common/button/WideButton';

const ProfilePage = () => {
  const changeNewNickname = useChangeNickname();
  const [error, setError] = useState<string | null>(null);
  const [isOk, setIsOk] = useState(false);

  const { data: about } = useQuery('MyPage/GetMyAbout', async () => {
    const { data: response } = await api.user.getMyInfo();

    return response.data;
  });

  useEffect(() => {
    if (about) {
      setNickname(about.nickname);
      setNewNickname(about.nickname);
      setProfilePic(about.url);
    }
  }, [about]);

  const [nickname, setNickname] = useState('');
  const [profilePic, setProfilePic] = useState<string | undefined>();
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

  const { mutateAsync: checkNickname } = useMutation(
    async (nickname: string) => {
      const { data: response } = await instance.post('/auth/check/nickname', {
        nickname,
      });

      return response;
    },
    {
      onError: () => {
        setError('해당 닉네임을 사용하실 수 없습니다');
      },
    },
  );

  return (
    <StackLayout
      topBar={{
        title: '프로필 변경',
        back: {
          location: '/setting',
        },
      }}
    >
      <ContentWrapper>
        <Picture onClick={uploadOnClick}>
          <ProfilePic src={profilePic ?? defaultProfile} />
          <UploadImg
            type="file"
            ref={profilePicRef}
            onChange={uploadImage}
            accept=".jpg, .png, .jpeg"
          />
          <PicEditButton>
            <img src={iconPencil} alt="pencil" />
          </PicEditButton>
        </Picture>

        <InputAndCheck
          onChange={(value) => {
            setError(null);
            setNewNickname(value);
          }}
          value={newNickname}
          onClickButton={async () => {
            await checkNickname(newNickname);

            setError('해당 닉네임을 사용하실 수 있습니다');
            setIsOk(true);
          }}
        />

        <Error isActive={isOk}>{error}</Error>
      </ContentWrapper>

      <ProfileForm
        onSubmit={(e) => {
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
        <WideButton isActive={error === null || isOk}>저장하기</WideButton>
      </ProfileForm>
    </StackLayout>
  );
};

export default ProfilePage;

const Error = styled.div<{
  isActive: boolean;
}>`
  width: 100%;
  font-size: 14px;
  height: 20px;
  color: #ff3a3a;
  margin-top: 8px;

  ${({ isActive }) =>
    isActive &&
    css`
      color: #0ac54a;
    `}
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const Picture = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  aspect-ratio: 1/1;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 100%;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
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

const PicEditButton = styled.button`
  width: 28px;
  height: 28px;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.primary.default};
  border-radius: 50%;
  overflow: hidden;
  padding: 5px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ProfileForm = styled.form`
  width: 100%;
  flex-shrink: 0;
  padding: 0 24px;
  padding-bottom: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
