import styled from 'styled-components';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import useGetUserInfo from '@/pages/setting//profile/Profile/hooks/useGetUserInfo';
import useLogout from '@/pages/setting/Setting/hooks/useLogout';
import ContentBox from './components/ContentBox';
import ConfirmPop from '@/pages/test/ConfirmPop';
import useNavigatePush from '@/hooks/useNavigatePush';
import useToast from '@/hooks/useToast';
import iconSetting from '@/assets/svg/icons/icon-setting.svg';
import iconInfo from '@/assets/svg/icons/icon-info.svg';
import defaultProfile from '@/assets/svg/logos/logo-profile-default.svg';

const SettingPage = () => {
  const getUserInfo = useGetUserInfo();
  const logout = useLogout();
  const toast = useToast();
  const navigatePush = useNavigatePush();
  const [loginType, setLoginType] = useState('');

  const maxWords = 200;
  const [myinfo, setMyInfo] = useState({
    username: '',
    nickname: '',
    profile: '',
    wordCount: 0,
    shareCount: 0,
    downloadCount: 0,
    recommendCount: 0,
  });
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);
  const [isConfirmPopOpen, setIsConfirmPopOpen] = useState(false);

  const setUserInfo = async () => {
    const { data: response } = await getUserInfo();
    setLoginType(response.login_type);
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

  const movePatchNotePage = () => {
    navigatePush('/setting/patchnote');
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
      return <img src={defaultProfile} alt="profile" />;
    } else {
      return <img src={myinfo.profile} alt="profile" />;
    }
  };

  return (
    <WebWrapper>
      <Header>
        <Title>My page</Title>
        <UserChangeButton
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

            <WordNumTitle>단어개수</WordNumTitle>
            <WordNumText>
              {myinfo.wordCount}/{maxWords}
            </WordNumText>
          </ProfileContent>
        </ProfileWrapper>

        <ShareInfoWrapper>
          <ShareInfo>
            <InfoName>공유단어장</InfoName>
            <InfoNumber>
              {Number(myinfo.shareCount).toLocaleString()}
            </InfoNumber>
          </ShareInfo>
          <ShareInfo>
            <InfoName>
              다운로드
              <img
                src={iconInfo}
                alt="download"
                onClick={() => {
                  toast.comment('내 공유 단어장이 다운된 횟수');
                }}
              />
            </InfoName>
            <InfoNumber>
              {Number(myinfo.downloadCount).toLocaleString()}
            </InfoNumber>
          </ShareInfo>
          <ShareInfo>
            <InfoName>
              추천
              <img
                src={iconInfo}
                alt="recommend"
                onClick={() => {
                  toast.comment('내 공유 단어장이 추천받은 횟수');
                }}
              />
            </InfoName>
            <InfoNumber>
              {Number(myinfo.recommendCount).toLocaleString()}
            </InfoNumber>
          </ShareInfo>
        </ShareInfoWrapper>
      </UserInfoWrapper>

      <ContentWrapper>
        <ConfirmPop
          isOpen={isConfirmPopOpen}
          cancelText="뒤로가기"
          confirmText="로그아웃"
          height="180px"
          onCancel={() => setIsConfirmPopOpen(false)}
          onConfirm={() => {
            setIsConfirmPopOpen(false);
            logout();
          }}
        >
          <ConfirmPop.Title>정말 로그아웃 하시겠습니까?</ConfirmPop.Title>
        </ConfirmPop>
        <ContentBox title="공지사항" onClick={moveNoticePage} />
        <ContentBox title="패치노트" onClick={movePatchNotePage} />
        <ContentBox title="건의하기 / 버그신고" onClick={moveReportPage} />
        {/* Local 가입 계정이 아니면 비밀번호 변경 미표시 */}
        {loginType === 'local' && (
          <ContentBox title="비밀번호 변경" onClick={movePasswordPage} />
        )}
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
  height: 56px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-weight: bold;
  font-size: 18px;
  line-height: 1.4;
`;

const UserChangeButton = styled.img`
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
  justify-content: space-between;
  overflow-wrap: anywhere;
`;

const ProfileImg = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  box-sizing: border-box;
  //border: 1px solid #e0e0e0;
  border-radius: 17px;
  display: flex;
  align-items: center;
  border-radius: 100%;

  img {
    width: 100%;
    aspect-ratio: 1/1;
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
  width: 100%;
  margin-left: 16px;
`;

const ProfileNickname = styled.div`
  color: ${({ theme }) => theme.colors.gray[800]};
  ${({ theme }) => theme.typography.pretendard.t3.sbd};
`;

const ProfileUsername = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[400]};
  margin-bottom: 4px;
  width: 100%;
  ${({ theme }) => theme.typography.pretendard.b1.md};
`;

const WordNumTitle = styled.div`
  ${({ theme }) => theme.typography.pretendard.b1.sbd};
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const WordNumText = styled.div`
  ${({ theme }) => theme.typography.pretendard.b1.md};
  color: ${({ theme }) => theme.colors.gray[400]};
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
  justify-content: center;
`;

const ShareInfo = styled.div`
  width: 100px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 2px 10px 0px rgba(105, 74, 194, 0.08);
  padding: 12px;

  & + & {
    margin-left: 8px;
  }
`;

const InfoName = styled.div`
  ${({ theme }) => theme.typography.pretendard.b1.rg};
  color: ${({ theme }) => theme.colors.gray[600]};
  display: flex;
  font-size: 14px;
  justify-content: center;
  width: 100%;

  & > img {
    margin-left: 4px;
  }
`;

const InfoNumber = styled.div`
  width: 90%;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.primary.default};
  border: 1px solid ${({ theme }) => theme.colors.primary[200]};
  background-color: ${({ theme }) => theme.colors.primary[100]};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 6px 0;

  ${({ theme }) => theme.typography.pretendard.b1.sbd};
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
