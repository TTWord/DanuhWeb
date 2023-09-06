import styled from 'styled-components';
import Input from './Input';
import { MouseEvent } from 'react';

interface InputAndCheckProps {
  type?: 'default' | 'fit' | 'password';
  placeholder?: string;
  onChange?: (text: string) => void;
  value?: string;
  onClickButton?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const InputAndCheck: React.FC<InputAndCheckProps> = (props) => {
  return (
    <Group>
      <Input {...props} />
      <Button onClick={props.onClickButton}>중복확인</Button>
    </Group>
  );
};

export default InputAndCheck;

const Group = styled.div`
  display: flex;
  width: 100%;
  height: 44px;
`;

const Button = styled.button`
  ${({ theme }) => theme.fonts.gmarketSans};
  width: 60px;
  height: 100%;
  height: 100%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.primary.default};
  margin-left: 8px;
  ${({ theme }) => theme.typography.gmarketSans.md[12]};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;

  &:active {
    background-color: ${({ theme }) => theme.colors.primary[600]};
  }
`;
