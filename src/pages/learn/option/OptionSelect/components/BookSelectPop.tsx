import { api } from '@/api';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import ReactModal from 'react-modal';
import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';
import BookSelectItem from './BookSelectItem';
import TopAppBarClose from '@/components/common/header/TopAppBarClose';
import CustomScrollLayout from './BookCustomScrollLayout';
import useToast from '@/hooks/useToast';
import Toggle from '@/components/common/switch/Toggle';

interface BookSelectPopProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedBooks: {
    id: number;
    word_count: number;
    memorized_count: number;
  }[];
  setSelectedBooks: Dispatch<
    SetStateAction<
      {
        id: number;
        word_count: number;
        memorized_count: number;
      }[]
    >
  >;
  setViewSelectedBooksText: Dispatch<SetStateAction<string | null>>;
  viewSelectedBooksText: string | null;
  haveMemoWord: boolean;
  setHaveMemoWord: Dispatch<SetStateAction<boolean>>;
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
  word_count: number;
  word_memorized_count: number;
}

interface IBook extends IBookResponse {
  isSelected: boolean;
}

const BookSelectPop: React.FC<BookSelectPopProps> = ({
  isOpen,
  setIsOpen,
  setSelectedBooks,
  setViewSelectedBooksText,
  haveMemoWord,
  setHaveMemoWord,
}) => {
  const [allSelect, setAllSelect] = useState(false);
  const toast = useToast();

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

  const onClickFooterButton = () => {
    const selected = books.filter((item) => item.isSelected);

    if (selected.length === 0) {
      toast.comment('단어장을 선택해주세요.');
      return;
    }

    // 워드 카운트
    const word_count = haveMemoWord
      ? selected.reduce((acc, cur) => acc + cur.word_memorized_count, 0)
      : selected.reduce((acc, cur) => acc + cur.word_count, 0);

    if (word_count < 5) {
      toast.comment('단어는 최소 5개 이상이 필요합니다');
      return;
    }

    setSelectedBooks(
      selected.map((item) => ({
        id: item.id,
        word_count: item.word_count,
        memorized_count: item.word_memorized_count,
      })),
    );

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
  };

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
            <ToggleSwitchGroup>
              <Toggle
                type="default"
                isToggle={allSelect}
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
              />
              <ToggleSwitchText>전체선택</ToggleSwitchText>
            </ToggleSwitchGroup>

            <ToggleSwitchGroup>
              <Toggle
                type="default"
                isToggle={haveMemoWord}
                onClick={() => {
                  setHaveMemoWord((current) => !current);
                }}
              />
              <ToggleSwitchText>암기된 단어 미포함</ToggleSwitchText>
            </ToggleSwitchGroup>
          </AllSelectArea>
        </Content>
        <Footer>
          <FooterButton
            onClick={() => {
              onClickFooterButton();
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
  padding: 0 16px;
  flex-shrink: 0;
  display: flex;
  //justify-content: space-between;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const ToggleSwitchGroup = styled.div`
  display: flex;
  align-items: center;

  :first-child {
    margin-right: 40px;
  }
`;

const ToggleSwitchText = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.sbd};
  margin-left: 8px;
`;

const Footer = styled.div`
  width: 100%;
  height: 64px;
  flex-shrink: 0;
`;

const FooterButton = styled.button`
  width: 100%;
  height: 100%;
  color: white;

  background-color: ${({ theme }) => theme.colors.primary.default};
  ${({ theme }) => theme.typography.gmarketSans.md[16]}
`;
