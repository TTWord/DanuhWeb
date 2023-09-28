import styled from 'styled-components';
import { useCallback, useState } from 'react';
import useLogout from '@/pages/setting/Setting/hooks/useLogout';
import ContentBox from './components/ContentBox';
import ConfirmPop from '@/components/common/popup/ConfirmPop';
import iconInfo from '@/assets/svg/icons/icon-info.svg';
import defaultProfile from '@/assets/svg/logos/logo-profile-default.svg';
import useSettingPageLogic from './hooks/useSettingPageLogic';
import AlertPop from '@/components/common/popup/AlertPop';
import MeteorSVG from './components/MeteorSVG';
import TopAppBar from '@/components/common/header/TopAppBar';

const SettingPage = () => {
  const logout = useLogout();
  const {
    about,
    moveProfilePage,
    moveNoticePage,
    movePasswordPage,
    movePatchNotePage,
    moveReportPage,
    moveAccountDeletePage,
  } = useSettingPageLogic();

  const maxWords = 200;

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const onClickHelp = useCallback(() => {
    setIsAlertOpen(true);
  }, []);

  const [isConfirmPopOpen, setIsConfirmPopOpen] = useState(false);

  const onClickLogout = () => {
    setIsConfirmPopOpen(true);
  };

  if (!about) return null;

  return (
    <>
      <AlertPop
        type="custom"
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
      >
        <PictureArea>
          <MeteorSVG />
        </PictureArea>
        <AlertPopTitle>다운로드</AlertPopTitle>
        <AlertPopDesc>내 공유 단어장이 다운로드 된 횟수</AlertPopDesc>
        <Spliter />
        <PictureArea>
          <MeteorSVG />
        </PictureArea>
        <AlertPopTitle>추천</AlertPopTitle>
        <AlertPopDesc>내 공유 단어장이 추전받은 횟수</AlertPopDesc>
      </AlertPop>

      <Container>
        <TopAppBar type="setting" title="My Page" onClick={moveProfilePage} />

        <UserInfoWrapper>
          <ProfileWrapper>
            <Picture>
              <img src={about.url ?? defaultProfile} alt="profile" />
            </Picture>

            <ProfileContent>
              <ProfileNickname>{about.nickname}</ProfileNickname>
              <ProfileUsername>{about.username}</ProfileUsername>

              <WordNumTitle>단어개수</WordNumTitle>
              <WordNumText>
                {about.word_count}/{maxWords}
              </WordNumText>
            </ProfileContent>
          </ProfileWrapper>

          <ShareInfoWrapper>
            <ShareInfo>
              <InfoName>공유단어장</InfoName>
              <InfoNumber>
                {Number(about.share_count).toLocaleString()}
              </InfoNumber>
            </ShareInfo>
            <ShareInfo>
              <InfoName>
                다운로드
                <img
                  src={iconInfo}
                  alt="download"
                  onClick={() => {
                    onClickHelp();
                  }}
                />
              </InfoName>
              <InfoNumber>
                {Number(about.download_count).toLocaleString()}
              </InfoNumber>
            </ShareInfo>
            <ShareInfo>
              <InfoName>
                추천
                <img
                  src={iconInfo}
                  alt="recommend"
                  onClick={() => {
                    onClickHelp();
                  }}
                />
              </InfoName>
              <InfoNumber>
                {Number(about.recommend_count).toLocaleString()}
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
            type="title"
            title="정말 로그아웃 하시겠습니까?"
          />
          <ContentBox title="공지사항" onClick={moveNoticePage} />
          <ContentBox title="패치노트" onClick={movePatchNotePage} />
          <ContentBox title="건의하기 / 버그신고" onClick={moveReportPage} />
          {/* Local 가입 계정이 아니면 비밀번호 변경 미표시 */}
          {about.login_type === 'local' && (
            <ContentBox title="비밀번호 변경" onClick={movePasswordPage} />
          )}
          <ContentBox title="로그아웃" onClick={onClickLogout} />
          <ContentBox title="탈퇴하기" onClick={moveAccountDeletePage} />
        </ContentWrapper>
      </Container>
    </>
  );
};

export default SettingPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const UserInfoWrapper = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 24px 16px;
  justify-content: space-between;
  overflow-wrap: anywhere;
`;

const Picture = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
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
  padding-bottom: 72px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Spliter = styled.div`
  width: 100%;
  height: 24px;
`;

const PictureArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AlertPopTitle = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.bd};
  color: ${({ theme }) => theme.colors.gray[900]};
  text-align: center;
  margin-top: 4px;
`;

const AlertPopDesc = styled.div`
  ${({ theme }) => theme.typography.pretendard.b1.rg};
  color: ${({ theme }) => theme.colors.gray[600]};
  text-align: center;
  margin-top: 4px;

  & + ${AlertPopTitle} {
    margin-top: 24px;
  }
`;
