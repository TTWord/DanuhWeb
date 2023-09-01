import styled, { css } from 'styled-components';

interface LoginButtonProps {
  text: string;
  onClick?: () => void;
  img?: string;
}

const LoginButton = ({ text, img, onClick }: LoginButtonProps) => {
  return (
    <Button hasImg={Boolean(img)} onClick={onClick}>
      {Boolean(img) && <ServiceLogo src={img} alt="btnImg" />}
      <ServiceText>{text}</ServiceText>
    </Button>
  );
};

export default LoginButton;

const Button = styled.button<{ hasImg: boolean }>`
  width: 300px;
  height: 44px;
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary.default};
  background-color: white;
  margin: 40px 0;
  position: relative;

  ${({ hasImg }) =>
    hasImg &&
    css`
      justify-content: center;
    `}
`;

const ServiceLogo = styled.img`
  width: 24px;
  width: 24px;
  position: absolute;
  left: 12px;
`;

const ServiceText = styled.span`
  ${({ theme }) => theme.typography.gmarketSans.md[12]};
  color: ${({ theme }) => theme.colors.primary.default};
`;
