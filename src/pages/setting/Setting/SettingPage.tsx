import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { globalState } from '@/recoil';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

import useGetUserInfo from '@/pages/setting//profile/Profile/hooks/useGetUserInfo';
import useLogout from '@/pages/setting/Setting/hooks/useLogout';
import useDeleteAccount from '@/pages/setting/Setting/hooks/useDeleteAccount';
import ContentBox from './components/ContentBox';
import ConfirmPop from '@/components/common/popup/ConfirmPop';
import useNavigatePush from '@/hooks/useNavigatePush';

const SettingPage = () => {
  const getUserInfo = useGetUserInfo();
  const logout = useLogout();
  const deleteAccount = useDeleteAccount();
  const navigate = useNavigate();
  const navigatePush = useNavigatePush();

  const [nickname, setNickname] = useRecoilState<string>(
    globalState.auth.nickname,
  );

  const [username, setUsername] = useRecoilState<string>(
    globalState.auth.username,
  );

  const [profile, setProfile] = useRecoilState<string>(
    globalState.auth.profilePic,
  );

  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);

  const [isConfirmPopOpen, setIsConfirmPopOpen] = useState(false);

  useEffect(() => {
    const setUserInfo = async () => {
      const { data: response } = await getUserInfo();
      setUsername(response.username);
      setNickname(response.nickname);
      setProfile(response.url);
    };
    setUserInfo();
    setActiveMenu(3);
  }, []);

  // 해당 페이지로 이동하는 함수들
  const moveProfilePage = () => {
    navigatePush('/setting/profile');
  };

  const moveNotificationPage = () => {
    navigatePush('/setting/notification');
  };

  const moveNoticePage = () => {
    navigatePush('/setting/notice');
  };

  const deleteAccoutFunc = () => {
    setIsConfirmPopOpen(true);
  };

  // 코드 정상 동작을 위한 임의의 함수
  const dummyFunction = () => {};

  const ProfilePic = () => {
    if (profile === undefined) {
      return <div></div>;
    } else {
      return <img src={profile} alt="profile" />;
    }
  };

  return (
    <WebWrapper>
      <HeaderWrapper>
        <SettingText>Setting</SettingText>
        <ProfileWrapper>
          <ProfileImg>
            <ProfilePic />
          </ProfileImg>
          <ProfileContent>
            <ProfileNickname>{nickname}</ProfileNickname>
            <ProfileUsername>{username}</ProfileUsername>
            <ProfileChange onClick={moveProfilePage}>프로필변경</ProfileChange>
          </ProfileContent>
        </ProfileWrapper>
      </HeaderWrapper>

      <ContentWrapper>
        <ConfirmPop
          isOpen={isConfirmPopOpen}
          message="정밀 회원을 탈퇴하시나요?"
          cancelText="뒤로가기"
          confirmText="그만하기"
          onCancel={() => setIsConfirmPopOpen(false)}
          onConfirm={() => {
            setIsConfirmPopOpen(false);
            deleteAccount();
          }}
        />
        <ContentBox title="알림설정" onClick={moveNotificationPage} />
        <ContentBox title="공지사항" onClick={moveNoticePage} />
        <ContentBox title="서비스 이용약관" onClick={dummyFunction} />
        <ContentBox title="개인정보 처리방침" onClick={dummyFunction} />
        <ContentBox title="로그아웃" onClick={logout} />
        <ContentBox title="탈퇴하기" onClick={deleteAccoutFunc} />
        <ContentBox title="가져오기 / 내보내기" onClick={dummyFunction} />
      </ContentWrapper>
    </WebWrapper>
  );
};

export default SettingPage;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// 상단 부분
const HeaderWrapper = styled.div`
  width: 100%;
  height: 239px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  padding: 31px 0 31px 30px;
`;

const SettingText = styled.div`
  font-size: 36px;
  font-weight: 300;
  line-height: 36px;
  color: #000000;
  margin-bottom: 45px;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  height: 96px;
  display: flex;
`;

const ProfileImg = styled.div`
  width: 96px;
  height: 96px;
  background: #e0e0e0;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  border-radius: 17px;
  margin-right: 17px;
  display: flex;
  align-items: center;

  img {
    width: 96px;
    border-radius: 17px;
  }
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileNickname = styled.div`
  width: 100%;
  font-weight: 300;
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 7px;
`;

const ProfileUsername = styled.div`
  width: 100%;
  font-weight: 300;
  font-size: 12px;
  line-height: 12px;
  color: #333333;
  margin-bottom: 25px;
`;

const ProfileChange = styled.button`
  width: 95px;
  height: 31px;
  background: #7a7a7a;
  border-radius: 5px;
  font-weight: 300;
  font-size: 10px;
  color: white;
  text-align: center;
  align-items: center;
`;

//설정 메뉴
const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
