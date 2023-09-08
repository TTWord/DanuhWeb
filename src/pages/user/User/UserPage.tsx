import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import TopAppBarStack from '@/components/common/header/TopAppBarStack';
import defaultProfile from '@/assets/svg/logos/logo-profile-default.svg';
import SharingBook from '@/pages/share/Share/components/SharingBook';
import ShareInfoBox from '@/pages/common/components/ShareInfoBox';
import useUserPageLogics from './hooks/useUserPageLogics';
import SortTypeSelectBox from './components/SortTypeSelectBox';

const UserPage = () => {
  const location = useLocation();
  const backURL = location.state.from;

  const userId = Number(useParams().id);
  const wordLimit = 200;
  const { userinfo, userBooks } = useUserPageLogics(userId);

  // API 에러 있음
  // => 토스트 메세지와 함께 이전페이지로 복귀 navigate(-1)
  if (!userinfo) return <WebWrapper></WebWrapper>;

  // API 에러 없음
  return (
    <WebWrapper>
      <TopAppBarStack
        type={'default'}
        navigate={backURL}
        title={`${userinfo.nickname}님의 프로필`}
      />

      <ProfileWrapper>
        <ProfilePic src={userinfo.url ?? defaultProfile} alt="profile" />
        <UserInfoWrapper>
          <Span>{userinfo.nickname}</Span>
          <Span>단어개수</Span>
          <Span>
            {userinfo.word_count}/{wordLimit}
          </Span>
        </UserInfoWrapper>
      </ProfileWrapper>

      <ShareInfoBox
        shareCount={userinfo.share_count}
        downloadCount={userinfo.download_count}
        recommendCount={userinfo.recommend_count}
      />

      <BookWrapper>
        <SortTypeSelectBox />

        {userBooks?.map((book, idx) => {
          return <SharingBook key={idx} book={book} />;
        })}
      </BookWrapper>
    </WebWrapper>
  );
};

export default UserPage;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  padding: 16px;
  margin-bottom: 6px;
`;

const ProfilePic = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  margin-right: 16px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Span = styled.span`
  ${({ theme }) => theme.typography.pretendard.t3.sbd};
  color: ${({ theme }) => theme.colors.gray[800]};

  :nth-child(2) {
    margin-top: 16px;
    ${({ theme }) => theme.typography.pretendard.t3.sbd};
  }

  :nth-child(3) {
    ${({ theme }) => theme.typography.pretendard.t3.sbd};
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const BookWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  overflow-y: scroll;
`;
