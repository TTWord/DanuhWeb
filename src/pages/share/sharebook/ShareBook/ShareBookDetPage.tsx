import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';
import useGetSharedBookById from './hooks/useGetSharedBookById';
import { useEffect, useMemo, useState } from 'react';
import useNavigatePush from '@/hooks/useNavigatePush';
import useDownloadSharedBook from './hooks/useDownloadSharedBook';
import TopAppBarStack from '@/components/common/header/TopAppBarStack';
import DownloadButton from '@/components/common/button/DownloadButton';
import SharedWordBox from './components/SharedWordBox';
import iconDown from '@/assets/svg/icons/icon-arrow-down.svg-small.svg';
import profileDefault from '@/assets/svg/logos/logo-profile-default.svg';

const ShareBookDetPage = () => {
  const navigatePush = useNavigatePush();
  const getSharedBookByIdAPI = useGetSharedBookById();
  const downloadSharedBookAPI = useDownloadSharedBook();

  const shareId = Number(useParams().id);
  const [userinfo, setuserInfo] = useState({
    bookName: '',
    nickname: '',
    comment: '',
    profilePic: '',
    userId: 0,
    viewCount: 0,
    downloadCount: 0,
    recommendCount: 0,
  });
  const [words, setWords] = useState([]);
  const height = useMemo(() => {
    return userinfo.comment.split('\n').length;
  }, [userinfo.comment]);
  const [showMore, setShowMore] = useState(false);

  const getSharedBookById = async () => {
    const { data: response } = await getSharedBookByIdAPI(shareId);
    // 유저 정보
    setuserInfo({
      bookName: response.book_name,
      nickname: response.nickname,
      comment: response.comment,
      profilePic: response?.url,
      userId: response.user_id,
      viewCount: response.checked,
      downloadCount: response.downloaded,
      recommendCount: response.recommended,
    });
    // 단어장의 단어
    setWords(response.words);
  };

  useEffect(() => {
    getSharedBookById();
  }, []);

  const donwloadSharedBook = async () => {
    const response = await downloadSharedBookAPI(shareId);
  };

  const goUserProfile = () => {
    navigatePush(`/user/${userinfo.userId}`, {
      state: {
        from: `/share/sharingbook/${shareId}`,
      },
    });
  };

  return (
    <MainWrapper>
      <TopAppBarStack
        type={'button'}
        navigate={'/share'}
        title={userinfo.bookName}
        buttonComponent={<DownloadButton onClick={donwloadSharedBook} />}
      />

      <Container>
        <BookInfo>
          <InfoHeader>
            <BookCreator onClick={goUserProfile}>
              <ProFile>
                <ProFilePic
                  src={
                    userinfo.profilePic ? userinfo.profilePic : profileDefault
                  }
                  alt="profilePic"
                />
              </ProFile>
              <Name>{userinfo.nickname}</Name>
            </BookCreator>
          </InfoHeader>

          {userinfo.comment && (
            <BookComment>
              <CommentText height={height} showMore={showMore}>
                {userinfo.comment}
              </CommentText>
              {height > 5 && (
                <ShowMore
                  onClick={() => {
                    setShowMore((current) => !current);
                  }}
                  showMore={showMore}
                >
                  {showMore ? '접기' : '더보기'}
                  <img src={iconDown} alt="down" />
                </ShowMore>
              )}

              <Triangle />
            </BookComment>
          )}

          <Indicator>
            <IndiBox>
              <Type>조회</Type>
              <Value>{userinfo.viewCount}</Value>
            </IndiBox>
            <IndiBox>
              <Type>다운로드</Type>
              <Value>{userinfo.downloadCount}</Value>
            </IndiBox>
            <IndiBox>
              <Type>추천</Type>
              <Value>{userinfo.recommendCount}</Value>
            </IndiBox>
          </Indicator>
        </BookInfo>

        <WordWrapper>
          {words.map((words, idx) => (
            <SharedWordBox key={idx} words={words} />
          ))}
        </WordWrapper>
      </Container>
    </MainWrapper>
  );
};
export default ShareBookDetPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 16px;
  padding-bottom: 56px;
`;

const BookInfo = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const InfoHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const BookCreator = styled.button`
  display: flex;
`;

const ProFile = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  background-color: white;
  display: flex;
  align-items: center;
`;

const ProFilePic = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 100%;
`;

const Name = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.sbd}
  padding-top: 2px;
  margin-left: 8px;
`;

const Indicator = styled.div`
  height: 20px;
  padding: 0 2px;
  display: flex;
  align-items: center;
`;

const IndiBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  & + & {
    margin-left: 6px;
    padding-left: 6px;
    border-left: 1px solid ${({ theme }) => theme.colors.gray[300]};
  }
`;

const Type = styled.span`
  ${({ theme }) => theme.typography.pretendard.b1.rg}
  color: ${({ theme }) => theme.colors.gray[600]};
  display: flex;
  align-items: center;
`;

const Value = styled.span`
  ${({ theme }) => theme.typography.pretendard.b1.sbd}
  color: ${({ theme }) => theme.colors.primary.default};
  width: 48px;
  margin-left: 8px;
  display: flex;
  align-items: center;
`;

const BookComment = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 12px;
  ${({ theme }) => theme.typography.pretendard.b1.rg}
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  overflow: visible;
  border-radius: 4px;
  margin-bottom: 16px;
  transition: all 0.5s;
`;

const CommentText = styled.div<{
  height: number;
  showMore: boolean;
}>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  white-space: pre-wrap;
  overflow-y: hidden;

  ${({ height, showMore }) => {
    if (height > 5 && !showMore) {
      // comment가 5줄 초과 & 더보기 미클릭
      return css`
        transition: all 0.3s;
        height: calc(20 * 5px);
      `;
    } else if (height > 5 && showMore) {
      // comment가 5줄 초과 & 더보기 클릭
      return css`
        transition: all 0.5s;
        height: calc(20 * ${height}px);
      `;
    } else {
      // comment가 5줄 이하일 때
      return css`
        height: calc(20 * ${height}px);
      `;
    }
  }}
`;

const ShowMore = styled.button<{ showMore: boolean }>`
  ${({ theme }) => theme.typography.pretendard.b1.sbd}
  color: ${({ theme }) => theme.colors.gray[600]};
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    cursor: pointer;

    ${({ showMore }) => {
      return (
        showMore &&
        css`
          rotate: 180deg;
        `
      );
    }}
  }
`;

const Triangle = styled.div`
  position: absolute;
  top: -8px;
  left: 8px;
  width: 0px;
  height: 0px;
  border-bottom: 8px solid white;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
`;

const WordWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 8px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
