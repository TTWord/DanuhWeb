import { useState } from 'react';
import styled, { css } from 'styled-components';
import iconOther from '@/assets/svg/icons/icon-other.svg';
import sharingIcon from '@/assets/svg/icons/icon-sharing.svg';
import donwloadedIcon from '@/assets/svg/icons/icon-downloaded.svg';
import BookShareOptionPop from './BookShareOptionPop';

const generateDateText = (dateText: string) => {
  const date = new Date(dateText);

  return `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
};

interface BookItemProps {
  book: {
    created_at: string;
    id: number;
    is_downloaded: number;
    is_shared: number;
    name: string;
    updated_at: string;
    user_id: number;
    share_id: number;
  };
  onItemClick: (bookId: number) => void;
  onClickUpdate: (bookId: number) => void;
  onClickShare: (bookId: number) => void;
  onClickRemove: (bookId: number) => void;
}

const BookItem: React.FC<BookItemProps> = ({
  book,
  onItemClick,
  onClickShare,
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
        <OptionItem onClick={() => onClickShare(book.id)}>공유설정</OptionItem>
        <OptionItem onClick={() => onClickUpdate(book.id)}>수정하기</OptionItem>
        <OptionItem onClick={() => onClickRemove(book.id)}>삭제하기</OptionItem>
      </OptionItems>
      <Strong>{book.name}</Strong>
      <DataCreated>{generateDateText(book.created_at)}</DataCreated>

      {Boolean(book.is_shared) && (
        <IsSharing src={sharingIcon} alt="sharingIcon" />
      )}
      {Boolean(book.share_id) && (
        <IsDownloaded src={donwloadedIcon} alt="donwloadedIcon" />
      )}
    </Item>
  );
};

export default BookItem;

const Item = styled.div`
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 10px 0 rgba(105, 74, 194, 0.08);
  border: 1px solid ${({ theme }) => theme.colors.primary[100]};
  border-radius: 4px;
  padding: 16px;
  line-height: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;

  & + & {
    margin-top: 8px;
  }
`;

const Option = styled.div`
  position: absolute;
  height: 24px;
  display: flex;
  align-items: center;
  right: 16px;
  top: 16px;
`;

const OptionItems = styled.div<{
  isActive: boolean;
}>`
  position: absolute;
  right: 16px;
  top: 40px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  background-color: white;
  z-index: 1;
  display: none;
  flex-direction: column;

  img {
    width: 24px;
  }

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
  line-height: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.primary.default};
`;

const DataCreated = styled.p`
  font-size: 13px;
  color: #999;
  line-height: 18px;
  margin-top: 10px;
`;

const Img = styled.img`
  width: 24px;
  position: absolute;
  right: 12px;
  bottom: 16px;
`;

const IsSharing = styled(Img)`
  //color: red;
`;

const IsDownloaded = styled(Img)`
  //color: green;
`;
