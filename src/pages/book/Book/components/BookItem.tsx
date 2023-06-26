import { instance } from '@/instance';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import iconOther from '@/assets/svg/icons/icon-other.svg';

const generateDateText = (dateText: string) => {
  const date = new Date(dateText);

  return `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
};

interface BookItemProps {
  book: any;
  onItemClick: (bookId: number) => void;
  onClickUpdate: (bookId: number) => void;
  onClickRemove: (bookId: number) => void;
}

const BookItem: React.FC<BookItemProps> = ({
  book,
  onItemClick,
  onClickUpdate,
  onClickRemove,
}) => {
  const [isOptionOpen, setOptionOpen] = useState(false);

  return (
    <Item key={book.id} onClick={() => onItemClick(book.id)}>
      <Option
        onClick={e => {
          e.stopPropagation();
          setOptionOpen(!isOptionOpen);
        }}
      >
        <img src={iconOther} alt="other" />
      </Option>
      <OptionItems
        isActive={isOptionOpen}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <OptionItem onClick={() => onClickUpdate(book.id)}>수정하기</OptionItem>
        <OptionItem onClick={() => onClickRemove(book.id)}>삭제하기</OptionItem>
      </OptionItems>
      <Strong>{book.name}</Strong>
      <P>{generateDateText(book.created_at)}</P>
    </Item>
  );
};

export default BookItem;

const Item = styled.div`
  width: 100%;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 20px;
  padding-bottom: 25px;
  line-height: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
  cursor: pointer;

  & + & {
    margin-top: 8px;
  }
`;

const Option = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 20px;
`;

const OptionItems = styled.div<{
  isActive: boolean;
}>`
  position: absolute;
  right: 0px;
  top: 40px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  background-color: white;
  z-index: 1;
  display: none;
  flex-direction: column;

  ${({ isActive }) =>
    isActive &&
    css`
      display: flex;
    `}
`;

const OptionItem = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const Strong = styled.strong`
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.primary.default};
`;

const P = styled.p`
  font-size: 12px;
  color: #999;
`;

const Span = styled.span`
  margin-left: 5px;
  font-size: 12px;
  font-weight: 500;
  color: #666666;
`;

const Status = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: black;
  border-radius: 0 0 5px 5px;
  overflow: hidden;
`;

const Gage = styled.div<{
  percentage: string;
}>`
  width: ${({ percentage }) => percentage};
  height: 100%;
  overflow: hidden;
`;

const ColorGage = styled.div<{
  percentage: string;
}>`
  width: 1000%;
  height: 100%;
  position: relative;
  left: calc(-${({ percentage }) => percentage} * 10 + 100%);
  background: linear-gradient(
    90deg,
    #db5f5f 0%,
    #df0a0a 50%,
    #9f3ed3 75%,
    #2316ce 100%
  );
`;
