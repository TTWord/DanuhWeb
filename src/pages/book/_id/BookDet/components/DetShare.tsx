import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import shareIcon from '@/assets/svg/icons/icon-share.svg';
import { useParams } from 'react-router-dom';

interface DetShareProps {
  canSharing: boolean;
}

const DetShare: React.FC<DetShareProps> = status => {
  const navigate = useNavigate();
  const bookId = Number(useParams().id);

  const onClick = () => {
    if (status.canSharing) {
      navigate(`/book/${bookId}/share`);
    } else {
      alert('다운로드 받은 단어장은 공유할 수 없습니다.');
    }
  };

  return (
    <Container onClick={onClick}>
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
