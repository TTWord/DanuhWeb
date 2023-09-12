import styled, { css } from 'styled-components';
import { useState } from 'react';
import iconSearch from '@/assets/svg/icons/icon-search.svg';
import SearchedBook from './components/SearchedBook';
import useGetSharedBooks from '../../Share/hooks/useGetSharedBooks';
import TopAppBarStack from '@/components/common/header/TopAppBarStack';

import iconBook from './svg/icon-book.svg';

const SearchBooksPage = () => {
  const { isLoading, getSharedBooks } = useGetSharedBooks();
  const [sharedBooks, setSharedBooks] = useState<any[]>();
  const [value, setValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onClose = () => {
    setValue('');
  };

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const getSharedBooksAPI = async () => {
    const keyWord = value;
    setKeyword(value);
    const { data: response } = await getSharedBooks({ nameFilter: keyWord });

    setSharedBooks(response);
  };

  return (
    <MainWrapper>
      <TopAppBarStack type={'default'} navigate="/share" title="단어장 검색" />

      <Container>
        <SearchForm
          onSubmit={(e) => {
            e.preventDefault();
            getSharedBooksAPI();
          }}
        >
          <SearchBox isFocused={isFocused}>
            <InputBox
              onChange={onChange}
              type="text"
              value={value}
              placeholder="어떤 단어장을 찾고 있나요?"
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <CloseButton isView={isFocused} type="button" onClick={onClose}>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.731445"
                  y="0.199707"
                  width="20"
                  height="20"
                  rx="10"
                  fill="#EEEEF2"
                />
                <path
                  d="M7.19629 13.7354L14.2674 6.66428"
                  stroke="#C5C6D0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.2676 13.7354L7.19651 6.66428"
                  stroke="#C5C6D0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </CloseButton>
            <SearchButton
              src={iconSearch}
              alt="search"
              onClick={getSharedBooksAPI}
            />
          </SearchBox>
        </SearchForm>

        <SharingBookWrapper>
          {sharedBooks?.map((book: any, idx) => (
            <SearchedBook key={idx} book={book} keyword={keyword} />
          ))}
          {sharedBooks?.length === 0 && (
            <NoSearch>
              <img src={iconBook} alt="book" />
              <NoSearchText>'{keyword}'에 대한 검색결과가 없어요.</NoSearchText>
            </NoSearch>
          )}
        </SharingBookWrapper>
      </Container>
    </MainWrapper>
  );
};

export default SearchBooksPage;

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
  justify-content: center;
  padding: 0 16px;
`;

const SearchForm = styled.form`
  width: 100%;
`;

const SharingBookWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 16px;
  padding-bottom: 36px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const SearchBox = styled.div<{
  isFocused: boolean;
}>`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary.default};
    `}
`;

const InputBox = styled.input`
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const SearchButton = styled.img`
  width: 24px;
  cursor: pointer;
`;

const CloseButton = styled.button<{
  isView: boolean;
}>`
  width: 20px;
  height: 20px;
  margin-right: 16px;
  opacity: 0;

  ${({ isView }) =>
    isView &&
    css`
      opacity: 1;
    `}
`;

const NoSearch = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    margin-top: -40%;
  }
`;

const NoSearchText = styled.div`
  margin-top: 24px;
  font-size: 14px;
  font-weight: 600;
  line-height: 160%;
  color: ${({ theme }) => theme.colors.gray[500]};
`;
