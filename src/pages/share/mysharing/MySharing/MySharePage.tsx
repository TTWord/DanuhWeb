import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { api } from '@/api';
import MyShareBookList from './components/MyShareBookList';
import emptyIcon from '@/assets/svg/icons/icon-book-empty.svg';
import TopAppBarStack from '@/components/common/header/TopAppBarStack';
import SelectPop from '@/pages/test/SelectPop';
import useMySharePageLogics from './hooks/useMySharePageLogics';

const MySharingPage = () => {
  //리팩토링 중//

  const {
    sortType,
    mode,
    onClickDownloadMode,
    onClickShareMode,
    selectList,
    onToggle,
    currentBooks,
    isToggle,
  } = useMySharePageLogics();

  /* 컴포넌트 */
  return (
    <MainWrapper>
      <TopAppBarStack
        type="default"
        title="내 공유 단어장 목록"
        navigate="/share"
        backgroundColor="#faf8ff"
      />

      <Container>
        <ModeWrapper>
          <Mode isSelected={mode === 'share'} onClick={onClickShareMode}>
            공유하는
          </Mode>
          <Mode isSelected={mode === 'download'} onClick={onClickDownloadMode}>
            공유받은
          </Mode>
          <Mode>단어장</Mode>
        </ModeWrapper>

        <SelectPop
          selectList={selectList}
          sortType={sortType}
          isToggle={isToggle}
          onToggle={onToggle}
        />

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

const Container = styled.header`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0 16px;
`;

const ModeWrapper = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  ${({ theme }) => theme.typography.pretendard.t1.sbd};
`;

const Mode = styled.div<{ isSelected?: boolean }>`
  height: 36px;
  color: ${({ theme }) => theme.colors.primary[200]};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 4px;
  box-sizing: border-box;
  cursor: pointer;

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: ${({ theme }) => theme.colors.primary.default};
      padding-bottom: 0px;
      border-bottom: 2px solid ${({ theme }) => theme.colors.primary.default};
    `}

  :nth-child(3) {
    cursor: default;
    padding: 0 2px;
    color: ${({ theme }) => theme.colors.primary.default};
  }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
  overflow: auto;
`;
