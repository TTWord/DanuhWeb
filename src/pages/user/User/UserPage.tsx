import React, { useState, useEffect, MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import TopBarDefault from '@/components/common/header/TopBarDefault';
import defaultProfile from '@/assets/svg/logos/logo-profile-default.svg';
import iconInfo from '@/assets/svg/icons/icon-info.svg';
import useToast from '@/hooks/useToast';
import SharingBook from '@/pages/share/Share/components/SharingBook';
import { useLocation, useParams } from 'react-router-dom';
import { api } from '@/api';
import iconArrowDown from '@/assets/svg/icons/icon-arrow-down.svg';

const UserPage = () => {
  const toast = useToast();
  const location = useLocation();
  const backURL = location.state.from;

  const userId = Number(useParams().id);
  const [username, setUsername] = useState('야채시러');
  const [wordCount, setWordCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);
  const [recommendCount, setRecommendCount] = useState(0);
  const [wordLimit, setWordLimit] = useState(200);
  const [profile, setProfile] = useState(defaultProfile);
  const [books, setBooks] = useState([]);

  const [sortType, setSortType] = useState('최신순');
  const [isTypeClicked, setIsTypeclicked] = useState(false);

  const onClickType = () => {
    setIsTypeclicked(current => !current);
  };

  const onClickTypeButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSortType(e.currentTarget.innerText);
    setIsTypeclicked(false);
  };

  interface BookProps {
    book_id: number;
    book_name: string;
    downloaded: number;
    id: number;
    nickname: string;
    recommended: number;
    word_count: number;
  }

  const getUserProfile = async () => {
    try {
      const { data: response } = await api.user.getUserInfo(userId);

      const data = response.data;
      setUsername(data.nickname);
      setWordCount(data.word_count);
      setRecommendCount(data.recommend_count);
      setDownloadCount(data.download_count);
      setShareCount(data.share_count);
      if (data.url) setProfile(data.url);
    } catch (e) {
      console.log(e);
    }
  };

  // 필터 적용해야함
  const getUserShareBooks = async () => {
    try {
      const { data: response } = await api.share.getOtherUserShareBooks({
        userId,
        /* type: null,
        order: null, */
      });

      setBooks(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserProfile();
    getUserShareBooks();
  }, []);

  return (
    <MainWrapper>
      <TopBarDefault navigate={backURL} title={`${username}님의 프로필`} />

      <Container>
        <ProfileWrapper>
          <ProfilePic src={profile} alt="profile" />
          <UserInfoWrapper>
            <Span>{username}</Span>
            <Span>단어개수</Span>
            <Span>
              {wordCount}/{wordLimit}
            </Span>
          </UserInfoWrapper>
        </ProfileWrapper>

        <ShareInfoWrapper>
          <ShareInfo>
            <InfoName>공유단어장</InfoName>
            <InfoNumber>{shareCount}</InfoNumber>
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
            <InfoNumber>{downloadCount}</InfoNumber>
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
            <InfoNumber>{recommendCount}</InfoNumber>
          </ShareInfo>
        </ShareInfoWrapper>

        <SortWrapper>
          <SortType onClick={onClickType}>
            <CurrentType>{sortType}</CurrentType>
            <img src={iconArrowDown} alt="list" />
            <TypeList isActive={isTypeClicked}>
              <TypeButton onClick={onClickTypeButton}>{'최신순'}</TypeButton>
              <TypeButton onClick={onClickTypeButton}>{'인기순'}</TypeButton>
              <TypeButton onClick={onClickTypeButton}>
                {'다운로드순'}
              </TypeButton>
            </TypeList>
          </SortType>
        </SortWrapper>

        <BookWrapper>
          {books.map((book: BookProps) => {
            return <SharingBook key={book.id} book={book} />;
          })}
        </BookWrapper>
      </Container>
    </MainWrapper>
  );
};

export default UserPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding: 16px;
  padding-top: 0;

  ::-webkit-scrollbar {
    display: none;
  }
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

const SortWrapper = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: end;
  ${({ theme }) => theme.typography.pretendard.b1.sbd}
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-top: 16px;
  margin-bottom: 8px;
`;

const SortType = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  img {
    width: 12px;
    margin-left: 8px;
  }
`;

const CurrentType = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const TypeList = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 24px;
  right: 0;
  width: 188px;
  height: 168px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.primary[100]};
  border-radius: 8px;
  box-shadow: 0px 2px 10px 0px rgba(105, 74, 194, 0.08);
  z-index: 1;

  ${({ isActive }) => {
    return isActive
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `;
  }}
`;

const TypeButton = styled.button`
  height: 56px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  padding: 16px;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.gray[800]};

  :nth-child(2) {
    border-radius: 0px;
    border-top: 1px solid ${({ theme }) => theme.colors.primary[100]};
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary[100]};
  }
`;

const BookWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  //padding: 16px;

  ::-webkit-scrollbar {
    display: none;
  }
`;
