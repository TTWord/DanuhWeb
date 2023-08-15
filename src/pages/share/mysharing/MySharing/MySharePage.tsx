import styled, { css } from 'styled-components';
import iconBack from '@/assets/svg/icons/icon-back-gray.svg';
import { useEffect, useState, MouseEvent } from 'react';
import { api } from '@/api';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/recoil';
import MyShareBookList from './components/MyShareBookList';
import emptyIcon from '@/assets/svg/icons/icon-book-empty.svg';
import useNavigatePop from '@/hooks/useNavigatePop';
import iconArrowDown from '@/assets/svg/icons/icon-arrow-down.svg';

const MySharingPage = () => {
  const navigatePop = useNavigatePop();
  const [currentBooks, setCurrentBooks] = useState([]); // API로 받아온 공유 단어장
  const [mode, setMode] = useState('share'); // 화면 출력 단어장 리스트 선택
  const [order, setOrder] = useState('DESC'); // 단어장 order 선택
  const [sortType, setSortType] = useState('최신순'); // 정렬 필터
  const [isTypeClicked, setIsTypeclicked] = useState(false); // 정렬 팝업
  const [isToggle, setIsToggle] = useState(false); // 정렬 팝업 속 토글

  const getUserShareBooksAPI = async () => {
    try {
      const { data: response } = await api.share.getUserShareBooks({
        mode,
        order,
        filter: isToggle,
      });

      setCurrentBooks(response);
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const goBack = () => {
    navigatePop('/share');
  };

  const onClickType = () => {
    setIsTypeclicked(current => !current);
  };

  const onClickTypeButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (e.currentTarget.innerText === '최신순') {
      setOrder('DESC');
    } else {
      setOrder('ASC');
    }
    setSortType(e.currentTarget.innerText);
    setIsTypeclicked(false);
  };

  const onClickShareMode = () => {
    setIsToggle(false);
    setIsTypeclicked(false);
    setMode('share');
  };

  const onClickDownloadMode = () => {
    setIsTypeclicked(false);
    setMode('download');
  };

  /* UseEffect */
  useEffect(() => {
    getUserShareBooksAPI();
  }, [mode, order, isToggle]);

  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);
  useEffect(() => {
    setActiveMenu(2);
  }, []);

  /* 컴포넌트 */
  return (
    <MainWrapper>
      <Header>
        <img onClick={goBack} src={iconBack} alt="iconBack" />
        <div>내 공유 단어장 목록</div>
      </Header>

      <Container>
        <ModeWrapper>
          <Mode isSelected={mode === 'share'} onClick={onClickShareMode}>
            공유한
          </Mode>
          <Mode isSelected={mode === 'download'} onClick={onClickDownloadMode}>
            공유받은
          </Mode>
          <Mode>단어장</Mode>
        </ModeWrapper>

        <SortWrapper>
          <SortType onClick={onClickType}>
            <CurrentType>{sortType}</CurrentType>
            <img src={iconArrowDown} alt="list" />
            <TypeList
              isActive={isTypeClicked}
              isDownloadMode={mode === 'download'}
            >
              <TypeButton
                isDownloadMode={mode === 'download'}
                onClick={onClickTypeButton}
              >
                {'최신순'}
              </TypeButton>
              <TypeButton
                isDownloadMode={mode === 'download'}
                onClick={onClickTypeButton}
              >
                {'오래된순'}
              </TypeButton>
              {/* 공유받은 단어장일때만 토글 버튼 활성화 */}
              {mode === 'download' && (
                <TypeButton
                  isDownloadMode={mode === 'download'}
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    setIsToggle(current => !current);
                  }}
                >
                  <ToggleBox isToggle={isToggle}>
                    <ToggleButton />
                  </ToggleBox>
                  {'추천한 단어장만 보기'}
                </TypeButton>
              )}
            </TypeList>
          </SortType>
        </SortWrapper>

        {/* 빈 화면 */}
        {currentBooks.length === 0 && (
          <EmptyBook>
            <img src={emptyIcon} alt="empty" />
            <span>{!isToggle && '아직 공유한 단어장이 없어요'}</span>
            <span>{isToggle && '아직 추천한 단어장이 없어요'}</span>
            <span>Sharing is caring!</span>
          </EmptyBook>
        )}

        <BookWrapper>
          {currentBooks.length !== 0 &&
            currentBooks.map((book: any, idx) => (
              <MyShareBookList key={idx} book={book} mode={mode} />
            ))}
        </BookWrapper>
      </Container>
    </MainWrapper>
  );
};
export default MySharingPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.pretendard};
  background-color: #faf8ff;
`;

const Header = styled.header`
  width: 100%;
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 16px;

  img {
    height: 24px;
    :hover {
      cursor: pointer;
    }
  }

  div {
    margin-left: 16px;
    ${({ theme }) => theme.typography.pretendard.t3.sbd};
  }
`;

const Container = styled.header`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ModeWrapper = styled.div`
  width: 100%;
  height: 32px;
  padding: 0 16px;
  display: flex;
  ${({ theme }) => theme.typography.pretendard.t2.sbd};
`;

const Mode = styled.div<{ isSelected?: boolean }>`
  height: 28px;
  color: ${({ theme }) => theme.colors.primary[200]};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 4px;
  padding-bottom: 2px;

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: ${({ theme }) => theme.colors.primary.default};
      padding-bottom: 0px;
      border-bottom: 2px solid var(--primary-primary, #6e5fed);
    `}

  :nth-child(3) {
    cursor: default;
    color: ${({ theme }) => theme.colors.primary.default};
  }
`;

const SortWrapper = styled.div`
  width: 100%;
  height: 24px;
  padding: 0 16px;
  margin: 8px 0;
  display: flex;
  justify-content: end;
  align-items: center;
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

const TypeList = styled.div<{ isActive: boolean; isDownloadMode: boolean }>`
  position: absolute;
  top: 24px;
  right: 0;
  width: 188px;
  height: 112px;
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

  ${({ isDownloadMode }) => {
    return (
      isDownloadMode &&
      css`
        height: 168px;
      `
    );
  }}
`;

const TypeButton = styled.button<{
  isDownloadMode: boolean;
}>`
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

  :nth-child(2) {
    border-radius: 0 0 8px 8px;
    border-top: 1px solid ${({ theme }) => theme.colors.primary[100]};
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary[100]};
    ${({ isDownloadMode }) => {
      return (
        isDownloadMode &&
        css`
          border-radius: 0px;
        `
      );
    }}
  }

  :nth-child(3) {
    border-radius: 0 0 8px 8px;
    background-color: ${({ theme }) => theme.colors.primary[100]};
  }
`;

const ToggleBox = styled.div<{ isToggle: boolean }>`
  width: 32px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.gray[300]};
  display: flex;
  align-items: center;
  transition: all 0.3s;
  padding: 2px;
  margin-right: 6px;

  ${({ isToggle }) => {
    return (
      isToggle &&
      css`
        padding-left: 14px;
        background-color: ${({ theme }) => theme.colors.primary.default};
      `
    );
  }}
`;

const ToggleButton = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const EmptyBook = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin-bottom: 24px;
  }

  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 160%;
    color: ${({ theme }) => theme.colors.gray[500]};
  }
`;

const BookWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Book = styled.button`
  width: 100%;
  height: 72px;
  flex-shrink: 0;
  background: #ffffff;
  border: 1px solid #bebebe;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 12px 12px;
  //flex: 1;
  & + & {
    margin-top: 15px;
  }
`;

const BookInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;
`;

const BookName = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #6c6c6c;
`;

const Username = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #666666;
`;

const BookUpdateinfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
`;

const UpdateDate = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 10px;
  color: black;
`;

const SharingInfo = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: black;
`;

const Footer = styled.footer`
  width: 100%;
  height: 48px;
`;
