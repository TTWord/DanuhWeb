import styled from 'styled-components';
import { globalState } from '@/recoil';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

import useGetUserInfo from '@/pages/setting//profile/Profile/hooks/useGetUserInfo';
import useLogout from '@/pages/setting/Setting/hooks/useLogout';
import ContentBox from './components/ContentBox';
import ConfirmPop from '@/components/common/popup/ConfirmPop';
import { toastStatus } from '@/components/common/toast/Toast';
import useNavigatePush from '@/hooks/useNavigatePush';

const SettingPage = () => {
  const getUserInfo = useGetUserInfo();
  const logout = useLogout();
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
  const setToast = useSetRecoilState(toastStatus);
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

  // 해당 페이지로 이동하는 함수
  const moveProfilePage = () => {
    navigatePush('/setting/profile');
  };

  const moveNoticePage = () => {
    navigatePush('/setting/notice');
  };

  const moveReportPage = () => {
    navigatePush('/setting/report');
  };

  const movePasswordPage = () => {
    navigatePush('/setting/password');
  };

  // onClick에 사용하는 함수
  const onClickVersion = () => {
    setToast({
      isOpen: true,
      timer: 2500,
      message: '버전 0.3',
    });
  };
  const onClickLogout = () => {
    setIsConfirmPopOpen(true);
  };

  const onClickDeleteAccout = () => {
    navigatePush('/setting/delete');
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
          <ImgWrapper>
            <ProfileImg>
              <ProfilePic />
            </ProfileImg>
            <ProfileChange onClick={moveProfilePage}>프로필변경</ProfileChange>
          </ImgWrapper>

          <ProfileContent>
            <ProfileNickname>{nickname}</ProfileNickname>
            <ProfileUsername>{username}</ProfileUsername>

            <ProfileNickname>{'단어개수'}</ProfileNickname>
            <ProfileUsername>{'0/200'}</ProfileUsername>
          </ProfileContent>
        </ProfileWrapper>
      </HeaderWrapper>

      <ContentWrapper>
        <ConfirmPop
          isOpen={isConfirmPopOpen}
          message="정말 로그아웃 하시겠습니까?"
          cancelText="뒤로가기"
          confirmText="로그아웃"
          onCancel={() => setIsConfirmPopOpen(false)}
          onConfirm={() => {
            setIsConfirmPopOpen(false);
            logout();
          }}
        />
        <ContentBox title="공지사항" onClick={moveNoticePage} />
        <ContentBox title="패치노트" onClick={onClickVersion} />
        <ContentBox title="건의하기 / 버그신고" onClick={moveReportPage} />
        <ContentBox title="비밀번호 변경" onClick={movePasswordPage} />
        <ContentBox title="로그아웃" onClick={onClickLogout} />
        <ContentBox title="탈퇴하기" onClick={onClickDeleteAccout} />
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
const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  padding: 30px 30px;
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
  display: flex;
`;

const ImgWrapper = styled.div`
  width: 96px;
  display: flex;
  flex-direction: column;
  margin-right: 16px;
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
  margin-bottom: 12px;

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
