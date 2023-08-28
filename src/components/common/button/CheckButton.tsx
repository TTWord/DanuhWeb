import styled, { css } from 'styled-components';

interface ButtonProps {
  onClick: () => void;
}

const CheckButton: React.FC<ButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>중복확인</Button>;
};

export default CheckButton;

const Button = styled.button`
  width: 60px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary[800]};
  border-radius: 8px;
  ${({ theme }) => theme.typography.gmarketSans.md[12]};
`;
