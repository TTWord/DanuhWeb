import styled, { css } from 'styled-components';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState, MouseEvent } from 'react';
import useGetSharedBooks from './hooks/useGetSharedBooks';
import SharingBook from './components/SharingBook';
import iconArrowUpRight from '@/assets/svg/icons/icon-arrow-up-right.svg';
import iconArrowDown from '@/assets/svg/icons/icon-arrow-down.svg';
import useNavigatePush from '@/hooks/useNavigatePush';
import TopAppBar from '@/components/common/header/TopAppBar';

const SharePage = () => {
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);
  const navigate = useNavigatePush();
  const { isLoading, getSharedBooks } = useGetSharedBooks();
  const [sharedBooks, setSharedBooks] = useState([]);

  const [sortType, setSortType] = useState('최신순');
  const [isTypeClicked, setIsTypeclicked] = useState(false);

  const getSharedBooksAPI = async () => {
    let typeFilter;
    switch (sortType) {
      case '최신순':
        typeFilter = 'updated_at';
        break;
      case '인기순':
        typeFilter = 'popularity';
        break;
      case '다운로드순':
        typeFilter = 'downloaded';
        break;
      default:
        typeFilter = 'updated_at';
        break;
    }
    const { data: response } = await getSharedBooks({ type: typeFilter });

    setSharedBooks(response);
  };

  const onClickType = () => {
    setIsTypeclicked((current) => !current);
  };

  const onClickTypeButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSortType(e.currentTarget.innerText);
    setIsTypeclicked(false);
  };

  useEffect(() => {
    getSharedBooksAPI();
  }, [sortType]);

  useEffect(() => {
    setActiveMenu(2);
  }, []);

  //// Functions ////
  const goMySharingBooks = () => {
    navigate('/share/mysharing');
  };

  const goSearchPage = () => {
    navigate('/share/search');
  };

  //// Components ////
  return (
    <WebWrapper>
      <TopAppBar type="search" title="Share" onClick={goSearchPage} />

      <MyShraingList onClick={goMySharingBooks}>
        <span>{'나의 공유 단어장'}</span>
        <img src={iconArrowUpRight} alt="arrowupright" />
      </MyShraingList>

      <Container>
        <SharingIndex>
          <IndexTitle>공유 단어장</IndexTitle>

          <SortType onClick={onClickType}>
            <CurrentType>{sortType}</CurrentType>
            <img src={iconArrowDown} alt="list" />
            <TypeList isActive={isTypeClicked}>
              <TypeButton onClick={onClickTypeButton}>최신순</TypeButton>
              <TypeButton onClick={onClickTypeButton}>인기순</TypeButton>
              <TypeButton onClick={onClickTypeButton}>다운로드순</TypeButton>
            </TypeList>
          </SortType>
        </SharingIndex>

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

const SharingIndex = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;

  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #333333;
  padding-bottom: 4px;
  margin-bottom: 15px;
`;

const IndexTitle = styled.span`
  ${({ theme }) => theme.typography.pretendard.t2.sbd};
  color: ${({ theme }) => theme.colors.black};
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

  &:active {
    background-color: ${({ theme }) => theme.colors.primary[100]};
  }

  &:nth-child(2) {
    border-radius: 0px;
    border-top: 1px solid ${({ theme }) => theme.colors.primary[100]};
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary[100]};
  }
`;

const SharingBookWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 108px;

  ::-webkit-scrollbar {
    display: none;
  }
`;
