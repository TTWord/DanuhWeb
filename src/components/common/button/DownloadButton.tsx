import styled, { css } from 'styled-components';

interface ButtonProps {
  onClick: () => void;
}

const DownloadButton: React.FC<ButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>다운로드</Button>;
};

export default DownloadButton;

const Button = styled.button`
  width: 84px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  ${({ theme }) => theme.typography.gmarketSans.md[14]}
  line-height: 100%;
  color: white;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.primary[800]};
`;
