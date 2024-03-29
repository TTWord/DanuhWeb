import styled from 'styled-components';
import iconCheck from '@/assets/svg/icons/icon-check-circle-purple.svg';

interface IBookResponse {
  id: number;
  name: string;
  user_id?: number;
  created_at: string;
  updated_at: string;
  word_count: number;
  word_memorized_count: number;
}

interface BookSelectItemProps {
  book: IBookResponse;
  selected: boolean;
  setSelected: (book: IBookResponse) => void;
}

const BookSelectItem: React.FC<BookSelectItemProps> = ({
  book,
  selected,
  setSelected,
}) => {
  return (
    <Book
      onClick={() => {
        setSelected(book);
      }}
    >
      <BookName>
        <MainText>{book.name}</MainText>
        <SubText>
          (단어수: {book.word_count}, 암기완료: {book.word_memorized_count})
        </SubText>
      </BookName>
      {selected && <img src={iconCheck} alt="check" />}
    </Book>
  );
};

export default BookSelectItem;

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

const BookName = styled.div`
  width: calc(100% - 24px);
  display: flex;
  flex-wrap: wrap;
`;

const MainText = styled.div`
  margin-right: 8px;
`;

const SubText = styled.div`
  color: ${({ theme }) => theme.colors.gray[500]};
`;
