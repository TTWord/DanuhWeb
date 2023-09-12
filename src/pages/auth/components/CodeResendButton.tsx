import styled from 'styled-components';

interface ButtonProps {
  onClick: () => void;
}

const CodeResendButton = ({ onClick }: ButtonProps) => {
  return <Button onClick={onClick}>인증코드 재발송</Button>;
};

export default CodeResendButton;

const Button = styled.button`
  width: 88px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: ${({ theme }) => theme.colors.primary.default};
  background-color: ${({ theme }) => theme.colors.primary[100]};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary[400]};
`;
