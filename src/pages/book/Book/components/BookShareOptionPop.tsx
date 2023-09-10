import BottomSlidePop from '@/components/common/popup/BottomSlidePop';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import iconCloseSVG from '@/assets/svg/icons/icon-close.svg';
import { useMutation } from 'react-query';
import { api } from '@/api';
import { useNavigate } from 'react-router-dom';
import useToast from '@/hooks/useToast';
import useNavigatePop from '@/hooks/useNavigatePop';

interface BookShareOptionPopProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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
}

const BookShareOptionPop: React.FC<BookShareOptionPopProps> = ({
  isOpen,
  setIsOpen,
  book,
}) => {
  const navigatePop = useNavigatePop();
  const toast = useToast();
  const [isShared, setIsShared] = useState(false);
  const [comment, setComment] = useState('');

  const { mutateAsync: shareBook } = useMutation(async () => {
    const { data: response } = await api.book.setBookPublic(book.id, comment);

    if (response.status === 'OK') {
      toast.success('단어장이 공개되었습니다.');
      onPopClose();
      navigatePop('/book');
    }
  });

  const { mutateAsync: unshareBook } = useMutation(async () => {
    const { data: response } = await api.book.setBookPrivate(book.id);

    if (response.status === 'OK') {
      onPopClose();
      toast.success('단어장이 비공개되었습니다.');
      navigatePop('/book');
    }
  });

  const onClickSave = () => {
    if (isShared) {
      shareBook();
    } else {
      unshareBook();
    }
  };

  const onPopClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (book.is_sharing) setIsShared(book.is_sharing);
    if (book.comment) setComment(book.comment);
  }, [book]);

  return (
    <BottomSlidePop isOpen={isOpen} onPopClose={onPopClose} height={480}>
      <Container
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Header>
          <BookName>{book.name}</BookName>
          <CloseButton onClick={onPopClose}>
            <img src={iconCloseSVG} alt="close" />
          </CloseButton>
        </Header>
        <Content>
          <ContentTop>
            <ContentTitle>공유 설정</ContentTitle>
            <ButtonGroup>
              <Button onClick={() => setIsShared(true)} isActive={isShared}>
                공개
              </Button>
              <Button onClick={() => setIsShared(false)} isActive={!isShared}>
                비공개
              </Button>
            </ButtonGroup>
            <BookCommentWrapper isActive={isShared}>
              <BookCommentTextArea
                placeholder="단어장에 대한 설명 입력"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              ></BookCommentTextArea>
            </BookCommentWrapper>
          </ContentTop>
          <SaveButton onClick={onClickSave}>저장하기</SaveButton>
        </Content>
      </Container>
    </BottomSlidePop>
  );
};

export default BookShareOptionPop;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 56px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const BookName = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.primary.default};
  ${({ theme }) => theme.typography.pretendard.t2.sbd}
`;

const CloseButton = styled.button`
  svg {
    width: 24px;
    height: 24px;
  }
`;

const Content = styled.div`
  padding: 0 24px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 36px;
`;

const ContentTop = styled.div``;

const ContentTitle = styled.div`
  padding-top: 8px;
  ${({ theme }) => theme.typography.pretendard.t3.sbd};
`;

const ButtonGroup = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
`;

const Button = styled.button<{ isActive?: boolean }>`
  width: 50%;
  height: 40px;
  color: ${({ theme }) => theme.colors.gray[400]};

  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  ${({ theme }) => theme.typography.pretendard.t4.sbd};

  &:nth-of-type(1) {
    border-radius: 4px 0 0 4px;
    border-right: none;
  }

  &:nth-of-type(2) {
    border-left: 1px solid ${({ theme }) => theme.colors.primary.default};
    border-radius: 0 4px 4px 0;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.primary.default};
      background-color: #f5f2ff;
      color: ${({ theme }) => theme.colors.primary.default};
    `}
`;

const SaveButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.primary.default};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.typography.gmarketSans.md[16]};

  &:active {
    background-color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

const BookCommentWrapper = styled.div<{
  isActive?: boolean;
}>`
  width: 100%;
  height: 0;
  border-radius: 8px;
  margin-top: 16px;
  margin-bottom: 16px;
  overflow: hidden;
  box-sizing: border-box;
  border: 0;

  ${({ isActive }) =>
    isActive &&
    css`
      height: 180px;
      border: 1px solid ${({ theme }) => theme.colors.gray[200]};
    `}
`;

const BookCommentTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  outline: none;
  resize: none;
  padding: 16px;
  box-sizing: border-box;
  overflow: hidden;

  ${({ theme }) => theme.typography.pretendard.b1.md};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;
