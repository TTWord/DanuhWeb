import { api } from '@/api';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';
import BookSelectItem from './BookSelectItem';
import TopAppBarClose from '@/components/common/header/TopAppBarClose';
import CustomScrollLayout from './BookCustomScrollLayout';

interface BookSelectPopProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedBooks: number[];
  setSelectedBooks: Dispatch<SetStateAction<number[]>>;
  setViewSelectedBooksText: Dispatch<SetStateAction<string | null>>;
  viewSelectedBooksText: string | null;
}

interface IBookResponse {
  created_at: string;
  id: number;
  is_downloaded: boolean;
  name: string;
  updated_at: string;
  share_id: number;
  comment?: string;
  is_sharing?: boolean;
}

interface IBook extends IBookResponse {
  isSelected: boolean;
}

const BookSelectPop: React.FC<BookSelectPopProps> = ({
  isOpen,
  setIsOpen,
  setSelectedBooks,
  setViewSelectedBooksText,
}) => {
  const [allSelect, setAllSelect] = useState(false);

  const { data: response } = useQuery(
    'OptionBookSelectPop/GetBooks',
    async () => {
      const response = await api.book.getBook();

      return response.data;
    },
  );

  const [books, setBooks] = useState<IBook[]>([]);

  const setSelected = (idx: number) => {
    setBooks((current) => {
      const arr = [...current];

      arr[idx].isSelected = !arr[idx].isSelected;

      if (!arr[idx].isSelected) {
        setAllSelect(false);
      }

      for (let i = 0; i < arr.length; i++) {
        if (!arr[i].isSelected) {
          break;
        }

        if (i === arr.length - 1) {
          setAllSelect(true);
        }
      }

      return arr;
    });
  };

  useEffect(() => {
    if (response) {
      setBooks(
        response.map((book: IBookResponse) => {
          return {
            ...book,
            isSelected: false,
          };
        }),
      );
    }
  }, [response]);

  return (
    <ReactModal isOpen={isOpen}>
      <Container>
        <TopAppBarClose
          title="단어장 선택"
          onClose={() => {
            setIsOpen(false);
          }}
        />
        <Content>
          <BooksWrapper>
            <CustomScrollLayout>
              <Books>
                {books?.map((item, idx) => {
                  return (
                    <BookSelectItem
                      key={item.id}
                      book={item}
                      setSelected={() => setSelected(idx)}
                      selected={item.isSelected}
                    />
                  );
                })}
              </Books>
            </CustomScrollLayout>
          </BooksWrapper>
          <AllSelectArea>
            <ClickableAllSelect>
              <ToggleSwitchGroup>
                <ToggleSwitch
                  onClick={() => {
                    setAllSelect((current) => {
                      setBooks((currentBooks) => {
                        return currentBooks.map((item) => {
                          return {
                            ...item,
                            isSelected: !current,
                          };
                        });
                      });
                      return !current;
                    });
                  }}
                  isActive={allSelect}
                >
                  <ToggleCircle isActive={allSelect} />
                </ToggleSwitch>
                <ToggleSwitchText>전체선택</ToggleSwitchText>
              </ToggleSwitchGroup>
            </ClickableAllSelect>
          </AllSelectArea>
        </Content>
        <Footer>
          <FooterButton
            onClick={() => {
              const selected = books.filter((item) => item.isSelected);

              setSelectedBooks(selected.map((item) => item.id));
              if (selected.length === 0) {
                setViewSelectedBooksText(null);
              } else if (selected.length < 2) {
                setViewSelectedBooksText(
                  selected.map((item) => item.name)[0] + ' 선택됨',
                );
              } else {
                setViewSelectedBooksText(
                  `${selected.map((item) => item.name)[0]} 외 ${
                    selected.length - 1
                  }개 선택됨`,
                );
              }

              setIsOpen(false);
            }}
          >
            선택
          </FooterButton>
        </Footer>
      </Container>
    </ReactModal>
  );
};

export default BookSelectPop;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const BooksWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 16px 16px 16px 14px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  button {
    flex: 0 0 auto;
  }
`;

const Books = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-right: 8px;
  > button + button {
    margin-top: 8px;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const AllSelectArea = styled.div`
  width: 100%;
  height: 70px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  position: relative;
`;

const ClickableAllSelect = styled.div`
  cursor: pointer;
  margin-top: 8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Footer = styled.div`
  width: 100%;
  height: 64px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.primary.default};
`;

const ToggleSwitchGroup = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleSwitchText = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.sbd};
`;

const ToggleSwitch = styled.div<{
  isActive: boolean;
}>`
  width: 32px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.gray[300]};
  margin-right: 8px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 2px;
  position: relative;
  transition: background-color 150ms;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${({ theme }) => theme.colors.primary.default};
    `};
`;

const ToggleCircle = styled.div<{
  isActive: boolean;
}>`
  width: 16px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  position: absolute;
  left: 2px;
  transition: left 150ms;

  ${({ isActive }) =>
    isActive &&
    css`
      left: calc(100% - 18px);
    `};
`;

const FooterButton = styled.button`
  width: 100%;
  height: 100%;
  color: white;

  ${({ theme }) => theme.typography.gmarketSans.md[16]}
`;
