import styled from 'styled-components';
import iconCheck from '@/assets/svg/icons/icon-check-circle-purple.svg';

interface IBookResponse {
  id: number;
  name: string;
  user_id?: number;
  created_at: string;
  updated_at: string;
}

interface BookItemProps {
  book: IBookResponse;
  selected: boolean;
  setSelected: (book: IBookResponse) => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, selected, setSelected }) => {
  return (
    <Book
      onClick={() => {
        setSelected(book);
      }}
    >
      <BookName>{book.name}</BookName>
      {selected && <img src={iconCheck} alt="check" />}
    </Book>
  );
};

export default BookItem;

const Book = styled.button`
  width: 100%;
  height: 44px;
  border: 1px solid #cbbdf3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[800]};
  font-weight: 400;
  justify-content: space-between;
`;

const BookName = styled.div``;
