import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { globalState } from '@/recoil';

interface IBookList {
  bookId: number;
  bookName: string;
  init?: boolean;
}

const ChoiceBookList = ({ bookId, bookName }: IBookList) => {
  const [isSelected, setIsSelected] = useState(false);
  const [quizNumber, setQuizNumber] = useRecoilState(globalState.quiz.bookIds);

  const onClick = () => {
    setIsSelected(current => !current);
    !isSelected ? setQuizNumber(bookId) : setQuizNumber(0);
  };

  useEffect(() => {
    setQuizNumber(0);
  }, []);

  useEffect(() => {
    if (bookId === quizNumber) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [quizNumber]);

  return (
    <Book key={bookId} isSelected={isSelected} onClick={onClick}>
      {bookName && <div>{bookName}</div>}
    </Book>
  );
};

export default ChoiceBookList;

const Book = styled.button<{ isSelected?: boolean }>`
  width: 279px;
  height: 40px;
  color: black;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  :nth-child(n + 2) {
    margin-top: 12px;
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: white;
      background-color: ${({ theme }) => theme.colors.primary.default};
    `}
`;
