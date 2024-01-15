import styled from 'styled-components';
import ExportBookBox from './ExportBookBox';
import { useState } from 'react';

interface BookListProps {
  books: BookResponse[] | undefined;
}

const ExportBookList = ({ books }: BookListProps) => {
  const test1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <BookList>
      {books?.map((item) => {
        return (
          <ExportBookBox key={item.id} bookName={item.name} id={item.id} />
        );
      })}

      {test1.map((item) => {
        return <ExportBookBox key={item} bookName={String(item)} id={item} />;
      })}
    </BookList>
  );
};

export default ExportBookList;

const BookList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  margin-bottom: 18px;
  border-radius: 13px;
  background-color: #f3f3f3;
  overflow-y: scroll;
`;
