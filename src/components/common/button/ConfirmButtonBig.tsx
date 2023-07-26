import styled, { css } from 'styled-components';

interface ButtonProps {}

const ConfirmButtonBig: React.FC<ButtonProps> = () => {
  return <Button>확인</Button>;
};

export default ConfirmButtonBig;

const Button = styled.button`
  width: 148px;
  height: 48px;
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
