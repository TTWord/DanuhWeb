import { useState } from 'react';
import styled, { css } from 'styled-components';
import iconOther from '@/assets/svg/icons/icon-other.svg';
import sharingIcon from '@/assets/svg/icons/icon-sharing.svg';
import donwloadedIcon from '@/assets/svg/icons/icon-downloaded.svg';
import BookShareOptionPop from './BookShareOptionPop';
import BottomSlidePop from '@/components/common/popup/BottomSlidePop';
import CloseSvg from '../svg/close.svg';
import BookModifyPop from './BookModifyPop';
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
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isBookSharePopOpen, setIsBookSharePopOpen] = useState(false);
  const [isBookAddPopOpen, setIsBookAddPopOpen] = useState(false);

  const onClickShare = () => {
    setIsOptionOpen(false);
    setIsBookSharePopOpen(true);
  };

  return (
    <>
      <BookModifyPop
        isOpen={isBookAddPopOpen}
        setIsOpen={setIsBookAddPopOpen}
        bookId={book.id}
        bookName={book.name}
        onClickUpdate={onClickUpdate}
      />
      <BookShareOptionPop
        isOpen={isBookSharePopOpen}
        setIsOpen={setIsBookSharePopOpen}
        book={book}
      />

      <BottomSlidePop
        isOpen={isOptionOpen}
        onPopClose={() => setIsOptionOpen(false)}
        height={312}
      >
        <BookOptionHeader>
          <BookOptionTitle>{book.name}</BookOptionTitle>
          <BookOptionCloseButton
            onClick={() => {
              setIsOptionOpen(false);
            }}
          >
            <img src={CloseSvg} alt="close" />
          </BookOptionCloseButton>
        </BookOptionHeader>
        <BookOptionContent>
          <BookOptionItem onClick={onClickShare}>공유 설정</BookOptionItem>
          <BookOptionItem
            onClick={() => {
              setIsOptionOpen(false);
              setIsBookAddPopOpen(true);
            }}
          >
            수정하기
          </BookOptionItem>
          <BookOptionItem
            onClick={() => {
              setIsOptionOpen(false);
              onClickRemove(book.id);
            }}
            red
          >
            단어장 삭제
          </BookOptionItem>
        </BookOptionContent>
      </BottomSlidePop>
      <Item key={book.id} onClick={() => onItemClick(book.id)}>
        <Clickable>
          <Top>
            <Strong>{book.name}</Strong>
          </Top>

          <Bottom>
            <DataCreated>{generateDateText(book.created_at)}</DataCreated>
            {book.is_sharing && (
              <IsSharing src={sharingIcon} alt="sharingIcon" />
            )}
            {book.is_downloaded && (
              <IsDownloaded src={donwloadedIcon} alt="donwloadedIcon" />
            )}
          </Bottom>
        </Clickable>
        <Option
          onClick={(e) => {
            e.stopPropagation();
            setIsOptionOpen((current) => !current);
          }}
        >
          <img src={iconOther} alt="other" />
        </Option>
      </Item>
    </>
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
  line-height: 1;
  cursor: pointer;
  user-select: none;
  position: relative;

  & + & {
    margin-top: 8px;
  }
`;

const Clickable = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 13px 16px;
  padding-top: 15px;

  &:active {
    background-color: ${({ theme }) => theme.colors.primary[100]};
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
  align-items: flex-end;
`;

const Option = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
  right: 9px;
  top: 6px;
  cursor: pointer;
  border-radius: 50%;

  &:active {
    background-color: #f5f5f5;
  }
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

  ${({ theme }) => theme.typography.pretendard.c1.rg};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const Img = styled.img``;

const IsSharing = styled(Img)`
  width: 24px;
  //color: red;
`;

const IsDownloaded = styled(Img)`
  //color: green;
`;

const BookOptionHeader = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const BookOptionTitle = styled.div`
  ${({ theme }) => theme.typography.pretendard.t2.sbd};
  color: ${({ theme }) => theme.colors.primary.default};
`;

const BookOptionCloseButton = styled.button``;

const BookOptionContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 24px;
`;

const BookOptionItem = styled.div<{
  red?: boolean;
}>`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[800]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  font-size: 16px;
  line-height: 140%;
  font-weight: 600;
  user-select: none;
  cursor: pointer;

  &:active {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  ${({ theme, red }) =>
    red &&
    css`
      color: ${theme.colors.error};
    `};
`;
