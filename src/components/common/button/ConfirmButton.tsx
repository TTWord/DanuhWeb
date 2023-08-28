import styled, { css } from 'styled-components';

interface ButtonProps {
  type: 'big' | 'small';
  onClick: () => void;
}

const ConfirmButton: React.FC<ButtonProps> = ({ type, onClick }) => {
  return (
    <Button buttonType={type} onClick={onClick}>
      확인
    </Button>
  );
};

export default ConfirmButton;

const Button = styled.button<{
  buttonType: 'big' | 'small';
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;
  padding-top: 2px;
  flex-shrink: 0;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary[800]};
  border-radius: 100px;
  ${({ theme }) => theme.typography.gmarketSans.md[14]};
  font-size: 16px; // 폰트 시스템에 16이 없어서 임시 작성

  ${({ buttonType }) => {
    switch (buttonType) {
      case 'big':
        return css`
          width: 148px;
          height: 48px;
        `;
      case 'small':
        return css`
          width: 72px;
          height: 42px;
        `;
      default:
        return css`
          width: 148px;
          height: 48px;
        `;
    }
  }}
`;
