import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import iconPlus from '@/assets/svg/icons/icon-plus.svg';

interface DetPlusProps {
  bookId: number;
}

const DetPlus: React.FC<DetPlusProps> = ({ bookId }) => {
  const navigate = useNavigate();
  const [isActive, setActive] = useState(false);

  const onClick = () => {
    navigate(`/book/${bookId}/create`);
  };

  return (
    <Container onClick={onClick}>
      <img src={iconPlus} alt="plus" />
    </Container>
  );
};

export default DetPlus;

const Container = styled.div`
  position: fixed;
  bottom: 25px;
  right: 20px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary.default};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
