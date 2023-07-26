import styled, { css } from 'styled-components';

interface ButtonProps {}

const AuthCodeResendButton: React.FC<ButtonProps> = () => {
  return <Button>인증코드 재발송</Button>;
};

export default AuthCodeResendButton;

const Button = styled.button`
  width: 110px;
  height: 30px;
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
  border-radius: 20px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
`;
