import styled from 'styled-components';
import SharingBook from './components/SharingBook';
import iconArrowUpRight from '@/assets/svg/icons/icon-arrow-up-right.svg';
import TopAppBar from '@/components/common/header/TopAppBar';
import SelectPop from '@/pages/test/SelectPop';
import useSharePageLogics from './hooks/useSharePageLogics';

const SharePage = () => {
  const {
    sharedBooks,
    sortType,
    setSortType,
    setTypeFilter,

    goMySharingBooks,
    goSearchPage,
  } = useSharePageLogics();

  const selectList = [
    {
      text: '최신순',
      onClick: () => {
        setSortType('최신순');
        setTypeFilter('updated_at');
      },
    },
    {
      text: '인기순',
      onClick: () => {
        setSortType('인기순');
        setTypeFilter('popularity');
      },
    },
    {
      text: '다운로드순',
      onClick: () => {
        setSortType('다운로드순');
        setTypeFilter('downloaded');
      },
    },
  ];

  return (
    <WebWrapper>
      <TopAppBar type="search" title="Share" onClick={goSearchPage} />

      <MyShraingList onClick={goMySharingBooks}>
        <span>{'나의 공유 단어장'}</span>
        <img src={iconArrowUpRight} alt="arrowupright" />
      </MyShraingList>

      <Container>
        <SelectPop
          title="공유 단어장"
          selectList={selectList}
          sortType={sortType}
        />

        <SharingBookWrapper>
          {sharedBooks.map((book: any) => (
            <SharingBook key={book.id} book={book} />
          ))}
        </SharingBookWrapper>
      </Container>
    </WebWrapper>
  );
};

export default SharePage;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.pretendard};
`;

const MyShraingList = styled.button`
  width: 142px;
  height: 35px;
  background-color: ${({ theme }) => theme.colors.primary[100]};
  border-radius: 8px;
  color: black;
  padding: 8px;
  margin: 8px 0px 5px 16px; // 아래 Container 컴포넌트에 padding 속성적용
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  &:active {
    background-color: ${({ theme }) => theme.colors.primary[200]};
  }

  span {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: ${({ theme }) => theme.colors.primary.default};
  }

  img {
    width: 16px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const SharingBookWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 108px;
`;
