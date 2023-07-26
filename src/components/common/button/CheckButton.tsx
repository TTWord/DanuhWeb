import styled, { css } from 'styled-components';

interface ButtonProps {}

const CheckButton: React.FC<ButtonProps> = () => {
  return <Button>중복확인</Button>;
};

export default CheckButton;

const Button = styled.button`
  width: 60px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary[800]};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
`;
