import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import shareIcon from '@/assets/svg/icons/icon-share.svg';
import { useParams } from 'react-router-dom';
import useGetBookById from '@/pages/book/_id/hooks/useGetBookById';
import BookShareOptionPop from '@/pages/book/Book/components/BookShareOptionPop';
interface DetShareProps {
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

const DetShare: React.FC<DetShareProps> = ({ book }) => {
  const bookId = Number(useParams().id);
  const getBookById = useGetBookById();

  const [isBookSharePopOpen, setIsBookSharePopOpen] = useState(false);

  const onClickShare = () => {
    setIsBookSharePopOpen(true);
  };

  return (
    <Container onClick={onClickShare}>
      <BookShareOptionPop
        isOpen={isBookSharePopOpen}
        setIsOpen={setIsBookSharePopOpen}
        book={book}
      />

      <img src={shareIcon} alt="share" />
    </Container>
  );
};

export default DetShare;

const Container = styled.div`
  position: fixed;
  bottom: 25px;
  right: 86px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background-color: #8ee9f6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
