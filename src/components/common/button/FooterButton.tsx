import styled, { css } from 'styled-components';

interface ButtonProps {
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const FooterButton: React.FC<ButtonProps> = ({
  isActive,
  children,
  onClick,
}) => {
  return (
    <ButtonWrapper>
      <Button onClick={onClick} isActive={isActive}>
        {children}
      </Button>
    </ButtonWrapper>
  );
};

export default FooterButton;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 48px;
  flex-shrink: 0;
  padding: 0 24px;
  margin-bottom: 36px;
`;

const Button = styled.button<{
  isActive: Boolean | undefined;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  color: white;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};

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
