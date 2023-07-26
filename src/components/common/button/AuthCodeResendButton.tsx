import styled, { css } from 'styled-components';

interface ButtonProps {
  isActive?: boolean;
  onClick: () => void;
}

const AuthCodeResendButton: React.FC<ButtonProps> = ({ isActive, onClick }) => {
  return (
    <Button isActive={isActive} onClick={onClick}>
      인증코드 재발송
    </Button>
  );
};

export default AuthCodeResendButton;

const Button = styled.button<{ isActive: Boolean | undefined }>`
  width: 110px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  color: white;
  border-radius: 20px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};

  background-color: ${({ theme }) => theme.colors.primary[800]};

  ${({ isActive }) => {
    switch (isActive) {
      case true:
        return css`
          background-color: ${({ theme }) => theme.colors.primary[800]};
        `;
      case false:
        return css`
          background-color: ${({ theme }) => theme.colors.primary[400]};
        `;
      default:
        return css`
          background-color: ${({ theme }) => theme.colors.primary[800]};
        `;
    }
  }}

  ${({ isActive }) => {
    switch (isActive) {
      case true:
        return css`
          background-color: ${({ theme }) => theme.colors.primary.default};
        `;
      case false:
        return css`
          background-color: ${({ theme }) => theme.colors.primary.disabled};
        `;
      default:
        return css`
          background-color: ${({ theme }) => theme.colors.primary.default};
        `;
    }
  }};
`;
