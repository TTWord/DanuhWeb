import styled, { css } from 'styled-components';

interface ButtonProps {
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  ref?: React.MutableRefObject<null>;
  type?: 'button' | 'submit';
}

const WideButton: React.FC<ButtonProps> = ({
  isActive,
  children,
  onClick,
  ref,
  type = 'button',
}) => {
  return (
    <ButtonWrapper>
      <Button ref={ref} onClick={onClick} isActive={isActive} type={type}>
        {children}
      </Button>
    </ButtonWrapper>
  );
};

export default WideButton;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 48px;
  flex-shrink: 0;
  /* padding: 0 24px;
  margin-bottom: 36px; */
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
  line-height: 100%;
  color: white;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  background-color: ${({ theme }) => theme.colors.primary.default};

  &:active {
    opacity: 0.7;
  }

  ${({ isActive }) => {
    return (
      isActive === false &&
      css`
        background-color: ${({ theme }) => theme.colors.primary.disabled};
      `
    );
  }};
`;
