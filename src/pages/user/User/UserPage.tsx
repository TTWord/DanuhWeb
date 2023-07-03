import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import iconBack from '@/assets/svg/icons/icon-back-gray.svg';

const UserPage = () => {
  const [username, setUsername] = useState('야채시러');
  const [nickname, setNickname] = useState('yachesiro@naver.com');
  const [wordCount, setWordCount] = useState(10);
  const [recommendCount, setRecommendCount] = useState(10);
  const [downloadCount, setDownloadCount] = useState(10);
  const [wordLimit, setWordLimit] = useState(200);

  const UserBook = () => {
    return (
      <Book>
        <InfoTop>
          <div>{'단어장1'}</div>
          <div>단어 {200}개</div>
        </InfoTop>
        <InfoBot>
          <div>{'2015.03.21'}</div>
          <div>
            조회 {200} 다운로드 {200}
            추천 {200}
          </div>
        </InfoBot>
      </Book>
    );
  };

  return (
    <MainWrapper>
      <Header>
        <button>
          <img src={iconBack} alt="back" />
        </button>
        <div>유저 프로필</div>
      </Header>

      <Container>
        <ProfileWrapper>
          <ProfilePic />
          <UserInfoWrapper>
            <div>{nickname}</div>
            <span>{username}</span>
            <div>
              단어수{' '}
              <span>
                {wordCount}/{wordLimit}
              </span>
            </div>
            <div>
              전체 추천수 <span>{recommendCount}</span>
            </div>
            <div>
              전체 다운로드 횟수<span>{downloadCount}</span>
            </div>
          </UserInfoWrapper>
        </ProfileWrapper>
        <SharingBookWrapper>
          <SharingCount>
            공유중인 단어장 <span>{4}개</span>
          </SharingCount>
          <BookWrapper>
            <UserBook />
            <UserBook />
            <UserBook />
            <UserBook />
            <UserBook />
            <UserBook />
            <UserBook />
            <UserBook />
          </BookWrapper>
        </SharingBookWrapper>
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

const Header = styled.div`
  width: 100%;
  height: 56px;
  flex-shrink: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    position: absolute;
    left: 16px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`;

const ProfilePic = styled.img`
  width: 115px;
  height: 115px;
  background-color: gray;
  border-radius: 10px;
  margin-right: 16px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SharingBookWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SharingCount = styled.div`
  margin-bottom: 12px;
`;

const BookWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 182px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Book = styled.div`
  width: 100%;
  height: 72px;
  flex-shrink: 0;
  border: 1px solid black;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & + & {
    margin-top: 8px;
  }
`;

const InfoTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const InfoBot = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
