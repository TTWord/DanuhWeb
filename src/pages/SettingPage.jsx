import styled from 'styled-components';
import tw from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import { globalState } from '@/recoil';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

import { instance } from '@/instance';
import Footer from '@/components/layout/HomeLayout/Footer';
import nextButton from '@/assets/svg/icons/icon-next-button.svg';

import useLogout from './SettingPage/useLogout';

const getUserInfoAPI = async () => {
  try {
    const response = await instance.get('/user/userservice');
    return response;
  } catch (e) {
    console.log(e);
  }
};

const ContentBox = props => {
  return (
    <Content>
      <div>{props.title}</div>
      <NextButton onClick={props.onClick}>
        <img src={nextButton} alt="nextButton" />
      </NextButton>
    </Content>
  );
};

const UserSettingPage = () => {
  const [nickname, setNickname] = useRecoilState(globalState.auth.setNickname);
  const [username, setUsername] = useRecoilState(globalState.auth.setUsername);
  const [profile, setProfile] = useState();

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await getUserInfoAPI();
      setUsername(response.data.data.username);
      setNickname(response.data.data.nickname);
      setProfile(response.data.data.url);
    };
    getUserInfo();
  }, []);

  const logout = useLogout();
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
      return '';
    } else {
      return <img src={profile} alt="profile" />;
    }
  };

  return (
    <Container>
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
        <ContentBox title="탈퇴하기" onClick={dummyFunction} />
        <ContentBox title="가져오기 / 내보내기" onClick={dummyFunction} />
      </ContentWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Container>
  );
};

export default UserSettingPage;

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
  ::-webkit-scrollbar {
    display: none;
  }
  padding-bottom: 70px;
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
  div {
    font-weight: 300;
    font-size: 16px;
    text-align: center;
    line-height: 16px;
  }
`;
const NextButton = styled.button`
  img {
    height: 12px;
  }
`;

const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  display: flex;

  background: #ffffff;
`;
const Container = tw.div`w-[100%] h-[100%] overflow-hidden flex flex-col absolute`;
