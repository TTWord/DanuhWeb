import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { globalState } from '@/recoil';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { instance } from '@/instance';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

import Footer from '@/components/layout/RootLayout/Footer';
import useLogout from '@/components/pages/setting/SettingPage/useLogout';
import useDeleteAccount from '@/components/pages/setting/SettingPage/useDeleteAccount';

import nextButton from '@/assets/svg/icons/icon-next-button.svg';

const getUserInfoAPI = async () => {
  try {
    const { data: response } = await instance.get('/user/userservice');

    return response;
  } catch (e: unknown) {
    const err = e as AxiosError<{
      message: string;
    }>;
    const errorMessage = err?.response?.data.message;
    Swal.fire({
      icon: 'error',
      title: errorMessage,
    });
  }
};

const ContentBox = (props: any) => {
  return (
    <Content onClick={props.onClick}>
      <div>{props.title}</div>
      <NextButton>
        <img src={nextButton} alt="nextButton" />
      </NextButton>
    </Content>
  );
};

const SettingPage = () => {
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

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await getUserInfoAPI();
      setUsername(response.data.username);
      setNickname(response.data.nickname);
      setProfile(response.data.url);
    };
    getUserInfo();
    setActiveMenu(3);
  }, []);

  const logout = useLogout();
  const deleteAccount = useDeleteAccount();
  const navigate = useNavigate();

  // 해당 페이지로 이동하는 함수들
  const moveProfilePage = () => {
    navigate('/setting/profile');
  };
  const moveNotificationPage = () => {
    navigate('/setting/notification');
  };
  const moveNoticePage = () => {
    navigate('/setting/notice');
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
        <ContentBox title="알림설정" onClick={moveNotificationPage} />
        <ContentBox title="공지사항" onClick={moveNoticePage} />
        <ContentBox title="서비스 이용약관" onClick={dummyFunction} />
        <ContentBox title="개인정보 처리방침" onClick={dummyFunction} />
        <ContentBox title="로그아웃" onClick={logout} />
        <ContentBox title="탈퇴하기" onClick={deleteAccount} />
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

const Content = styled.div`
  height: 64px;
  box-sizing: border-box;
  background: #ffffff;
  border-bottom: 1px solid #dddddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 26px 24px 30px;
  transition: 0.4s;

  div {
    font-weight: 300;
    font-size: 16px;
    text-align: center;
    line-height: 16px;
  }

  :hover {
    background-color: #694ac2;
    color: white;
    cursor: pointer;
  }
`;

const NextButton = styled.button`
  img {
    height: 12px;
  }
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  background: #ffffff;
`;
