import styled, { css } from 'styled-components';

interface ButtonProps {}

const ConfirmButtonSmall: React.FC<ButtonProps> = () => {
  return <Button>확인</Button>;
};

export default ConfirmButtonSmall;

const Button = styled.button`
  width: 72px;
  height: 42px;
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
  border-radius: 100px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
`;
