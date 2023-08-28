import styled, { css } from 'styled-components';

interface ButtonProps {
  onClick: () => void;
}

const DownloadButton: React.FC<ButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>다운로드</Button>;
};

export default DownloadButton;

const Button = styled.button`
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
`;
