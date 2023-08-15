import { useState } from 'react';
import styled, { css } from 'styled-components';
import iconOther from '@/assets/svg/icons/icon-other.svg';
import sharingIcon from '@/assets/svg/icons/icon-sharing.svg';
import donwloadedIcon from '@/assets/svg/icons/icon-downloaded.svg';
import BookShareOptionPop from './BookShareOptionPop';
import BottomSlidePop from '@/components/common/popup/BottomSlidePop';

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
    is_downloaded: boolean;
    name: string;
    updated_at: string;
    share_id: number;
    comment?: string;
    is_sharing?: boolean;
  };
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
  const [isBookSharePopOpen, setIsBookSharePopOpen] = useState(false);
  const [isBottomSlidePopOpen, setIsBottomSlidePopOpen] = useState(false);

  const onClickShare = () => {
    setIsBookSharePopOpen(true);
  };

  return (
    <Item key={book.id} onClick={() => onItemClick(book.id)}>
      <BookShareOptionPop
        isOpen={isBookSharePopOpen}
        setIsOpen={setIsBookSharePopOpen}
        book={book}
      />
      <BottomSlidePop
        isOpen={isBottomSlidePopOpen}
        onPopClose={() => {
          setIsBottomSlidePopOpen(false);
        }}
        height={312}
      >
        asdasdasdas
      </BottomSlidePop>
      <Top>
        <Strong>{book.name}</Strong>
        <Option
          onClick={e => {
            e.stopPropagation();
            setOptionOpen(!isOptionOpen);
          }}
        >
          <img src={iconOther} alt="other" />
          <OptionItems
            isActive={isOptionOpen}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <OptionItem onClick={() => onClickShare()}>공유설정</OptionItem>
            <OptionItem onClick={() => onClickUpdate(book.id)}>
              수정하기
            </OptionItem>
            <OptionItem onClick={() => onClickRemove(book.id)}>
              삭제하기
            </OptionItem>
          </OptionItems>
        </Option>
      </Top>

      <Bottom>
        <DataCreated>{generateDateText(book.created_at)}</DataCreated>
        {book.is_sharing && <IsSharing src={sharingIcon} alt="sharingIcon" />}
        {book.is_downloaded && (
          <IsDownloaded src={donwloadedIcon} alt="donwloadedIcon" />
        )}
      </Bottom>
    </Item>
  );
};

export default BookItem;

const Item = styled.div`
  width: 100%;
  height: 84px;
  flex-shrink: 0;
  box-sizing: border-box;
  box-shadow: 0 2px 10px 0 rgba(105, 74, 194, 0.08);
  border: 1px solid ${({ theme }) => theme.colors.primary[100]};
  border-radius: 4px;
  padding: 13px 16px;
  padding-top: 15px;
  line-height: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  & + & {
    margin-top: 8px;
  }
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Option = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const OptionItems = styled.div<{
  isActive: boolean;
}>`
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  background-color: white;
  z-index: 1;
  display: none;
  flex-direction: column;
  position: absolute;
  top: 24px;
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
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.primary.default};
`;

const DataCreated = styled.p`
  width: 100%;
  font-size: 13px;
  color: #999;
  line-height: 18px;
`;

const Img = styled.img``;

const IsSharing = styled(Img)`
  width: 24px;
  //color: red;
`;

const IsDownloaded = styled(Img)`
  //color: green;
`;
