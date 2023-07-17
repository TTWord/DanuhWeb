import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '@/api';
import Swal from 'sweetalert2';
import BookItem from './components/BookItem';
import StackLayout from '@/components/layout/StackLayout';
import { useQuery } from 'react-query';

interface IBookResponse {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface IBook extends IBookResponse {
  isSelected: boolean;
}

const QuizMainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quizType = location.state.type;
  const count = 10;
  const memorizedFilter = false;

  const { data: response } = useQuery('FlashCard/GetBooks', async () => {
    const response = await api.book.getBook();

    return response.data;
  });

  const [books, setBooks] = useState<IBook[]>([]);

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

  const setSelected = (idx: number) => {
    setBooks(current => {
      const arr = [...current];
      arr[idx].isSelected = !arr[idx].isSelected;
      return arr;
    });
  };

  const [mode, setMode] = useState<'word' | 'mean'>('word');
  const selectMode = (mode: 'word' | 'mean') => {
    setMode(mode);
  };

  const runQuiz = () => {
    let flag = false;

    books.forEach(item => {
      if (item.isSelected) {
        flag = true;
      }
    });

    if (!flag) {
      Swal.fire({
        icon: 'warning',
        title: '단어장을 선택해주세요.',
      });
    }

    if (mode === 'word') {
      navigate(`/learn/quiz/${quizType}`, {
        state: {
          bookIds: books.filter(item => item.isSelected).map(item => item.id),
          mode: 'word',
          count,
          memorizedFilter,
        },
      });
    } else {
      navigate(`/learn/quiz/${quizType}`, {
        state: {
          bookIds: books.filter(item => item.isSelected).map(item => item.id),
          mode: 'mean',
          count,
          memorizedFilter,
        },
      });
    }
  };

  return (
    <StackLayout
      topBar={{
        back: {
          isShow: true,
          location: '/learn',
        },
      }}
    >
      <Container>
        <Header>
          <Title>단어장 선택</Title>
          <Comments>복수 선택 가능*</Comments>
        </Header>
        <BooksWrapper>
          <Books>
            {books?.map((item, idx) => {
              return (
                <BookItem
                  key={item.id}
                  book={item}
                  setSelected={() => setSelected(idx)}
                  selected={item.isSelected}
                />
              );
            })}
          </Books>
        </BooksWrapper>

        <Footer>
          <SwitchButton>
            <WordQuizButton
              onClick={() => selectMode('word')}
              isActive={mode === 'word'}
            >
              단어암기
            </WordQuizButton>
            <MeanQuizButton
              onClick={() => selectMode('mean')}
              isActive={mode === 'mean'}
            >
              뜻암기
            </MeanQuizButton>
          </SwitchButton>
        </Footer>
        <ConfirmButton onClick={() => runQuiz()}>확인</ConfirmButton>
      </Container>
    </StackLayout>
  );
};

export default QuizMainPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;

const Title = styled.div`
  font-size: 18px;
  line-height: 50px;
  color: #444444;
  margin-bottom: 27px;
  padding: 0 16px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-weight: 500;
`;

const Comments = styled.div`
  line-height: 50px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary.default};
`;

const BookSelectedArea = styled.div`
  width: 100%;
  height: 80px;
  padding: 0 16px;
`;

const BookSelectedBox = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.primary[100]};
  border-radius: 20px;
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray[600]};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 18px;
`;

const BookSelected = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.primary.default};
  font-weight: 700;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BooksWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  margin-top: 15px;
  overflow-y: hidden;
  button {
    flex: 0 0 auto;
  }
`;

const Books = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  padding: 16px 24px 16px 14px;
  overflow-y: scroll;
  > button + button {
    margin-top: 8px;
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  margin-bottom: 42px;
  margin-top: 20px;
`;

const SwitchButton = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  margin: 0 16px;
  background-color: ${({ theme }) => theme.colors.primary[100]};
  border-radius: 24px;
`;

const Button = styled.button<{
  isActive?: boolean;
}>`
  width: 50%;
  height: 48px;
  border-radius: 24px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.default};
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};

  ${({ isActive }) =>
    isActive &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.primary[400]};
      background-color: ${({ theme }) => theme.colors.primary[200]};
    `}
`;

const WordQuizButton = styled(Button)``;

const MeanQuizButton = styled(Button)``;

const ConfirmButton = styled.button`
  width: 100%;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.primary.default};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
  flex-shrink: 0;
`;
