import styled, { css } from 'styled-components';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const SampleButton: React.FC<ButtonProps> = ({ onClick, text }) => {
  return <Button onClick={onClick}>{text}</Button>;
};

export default SampleButton;

const Button = styled.button`
  width: 86px;
  height: 29px;
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
