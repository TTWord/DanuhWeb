import styled from 'styled-components';
import { globalState } from '@/recoil';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

import useGetUserInfo from '@/pages/setting//profile/Profile/hooks/useGetUserInfo';
import useLogout from '@/pages/setting/Setting/hooks/useLogout';
import ContentBox from './components/ContentBox';
import ConfirmPop from '@/components/common/popup/ConfirmPop';
import useNavigatePush from '@/hooks/useNavigatePush';
import useToast from '@/hooks/useToast';
import iconSetting from '@/assets/svg/icons/icon-setting.svg';

const SettingPage = () => {
  const getUserInfo = useGetUserInfo();
  const logout = useLogout();
  const toast = useToast();
  const navigatePush = useNavigatePush();

  const maxWords = 200;
  const [myinfo, setMyInfo] = useState({
    username: '',
    nickname: '',
    profile: '',
    wordCount: '',
    shareCount: '',
    downloadCount: '',
    recommendCount: '',
  });
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);
  const [isConfirmPopOpen, setIsConfirmPopOpen] = useState(false);

  const setUserInfo = async () => {
    const { data: response } = await getUserInfo();
    setMyInfo({
      username: response.username,
      nickname: response.nickname,
      profile: response?.url,
      wordCount: response.word_count,
      shareCount: response.share_count,
      downloadCount: response.download_count,
      recommendCount: response.recommend_count,
    });
  };

  useEffect(() => {
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
    toast.comment('버전 0.3');
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
    if (myinfo.profile === undefined) {
      return null;
    } else {
      return <img src={myinfo.profile} alt="profile" />;
    }
  };

  return (
    <WebWrapper>
      <Header>
        <ProfileChange
          onClick={moveProfilePage}
          src={iconSetting}
          alt="ProfileChange"
        />
      </Header>

      <UserInfoWrapper>
        <ProfileWrapper>
          <ProfileImg>
            <ProfilePic />
          </ProfileImg>

          <ProfileContent>
            <ProfileNickname>{myinfo.nickname}</ProfileNickname>
            <ProfileUsername>{myinfo.username}</ProfileUsername>

            <ProfileNickname>{'단어개수'}</ProfileNickname>
            <ProfileUsername>
              {myinfo.wordCount}/{maxWords}
            </ProfileUsername>
          </ProfileContent>
        </ProfileWrapper>

        <ShareInfoWrapper>
          <ShareInfo>
            <InfoNumber>{myinfo.shareCount}</InfoNumber>
            <InfoName>공유단어장</InfoName>
          </ShareInfo>
          <ShareInfo>
            <InfoNumber>{myinfo.downloadCount}</InfoNumber>
            <InfoName>다운로드 횟수</InfoName>
          </ShareInfo>
          <ShareInfo>
            <InfoNumber>{myinfo.recommendCount}</InfoNumber>
            <InfoName>추천수</InfoName>
          </ShareInfo>
        </ShareInfoWrapper>
      </UserInfoWrapper>

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
        {/* <ContentBox title="건의하기 / 버그신고" onClick={moveReportPage} /> */}
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
const Header = styled.div`
  width: 100%;
  height: 44px;
  padding-right: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ProfileChange = styled.img`
  :hover {
    cursor: pointer;
  }
`;

const UserInfoWrapper = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 0 16px;
  padding-bottom: 16px;
`;

const ProfileImg = styled.div`
  width: 78px;
  height: 78px;
  background: #e0e0e0;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  border-radius: 17px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  border-radius: 100%;
  margin-right: 16px;
  img {
    width: 100%;
    border-radius: 100%;
  }
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  //flex-shrink: 0;
`;

const ProfileNickname = styled.div`
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const ProfileUsername = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[400]};
  margin-bottom: 4px;
`;

const ShareInfoWrapper = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 300;
  line-height: 36px;
  color: black;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  padding: 16px;

  display: flex;
`;

const ShareInfo = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & + & {
    margin-left: 5%;
  }
`;

const InfoNumber = styled.div`
  width: 50%;
  height: 50%;
  border-radius: 100%;
  color: black;
  background-color: ${({ theme }) => theme.colors.primary[100]};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10%;
`;

const InfoName = styled.div`
  line-height: 100%;
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
  padding: 0 16px;

  ::-webkit-scrollbar {
    display: none;
  }
`;
