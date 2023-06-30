import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import shareIcon from '@/assets/svg/icons/icon-share.svg';
import { useParams } from 'react-router-dom';

interface DetShareProps {}

const DetShare: React.FC<DetShareProps> = () => {
  const navigate = useNavigate();
  const [isActive, setActive] = useState(false);
  const bookId = Number(useParams().id);

  const onClick = () => {
    navigate(`/book/${bookId}/share`);
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
