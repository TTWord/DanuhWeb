import styled, { css } from 'styled-components';

interface ButtonProps {
  onClick: () => void;
  status?: 'OWNER' | 'NONE' | 'UPDATE' | 'DOWNLOADED' | '';
}

const DownloadButton: React.FC<ButtonProps> = ({ onClick, status }) => {
  console.log(1, status);

  switch (status) {
    case 'OWNER':
      return <Button isActive={false}>다운로드</Button>;

    case 'NONE':
      return (
        <Button isActive={true} onClick={onClick}>
          다운로드
        </Button>
      );

    case 'UPDATE':
      return (
        <Button isActive={true} onClick={onClick}>
          업데이트
        </Button>
      );

    case 'DOWNLOADED':
      return (
        <Button isActive={false} onClick={onClick}>
          다운로드
        </Button>
      );

    default:
      return <Button isActive={false}>다운로드</Button>;
  }
};

export default DownloadButton;

const Button = styled.button<{ isActive: boolean }>`
  width: 76px;
  height: 32px;
  padding-top: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  ${({ theme }) => theme.typography.gmarketSans.md[12]}
  color: white;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.primary[800]};

  ${({ isActive }) => {
    return (
      isActive === false &&
      css`
        background-color: ${({ theme }) => theme.colors.primary[400]};
      `
    );
  }}
`;
