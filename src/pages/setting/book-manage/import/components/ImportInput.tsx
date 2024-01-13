import Input from '@/components/common/input/Input';
import { Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';

interface ImportInputProps {
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
}

const ImportInput = ({ inputText, setInputText }: ImportInputProps) => {
  return (
    <TopContent>
      <StrongText>단어장 이름은</StrongText>
      <Input
        placeholder="단어장 이름을 입력해주세요"
        value={inputText}
        onChange={(text) => {
          if (text.length > 15) {
            return;
          }
          setInputText(text);
        }}
        type="fit"
      />
      <CountLine>
        <Count isActive={inputText.length === 15}>{inputText.length}/15</Count>
      </CountLine>
    </TopContent>
  );
};

export default ImportInput;

const TopContent = styled.div`
  width: 100%;
  margin-bottom: 18px;
`;

const StrongText = styled.div`
  ${({ theme }) => theme.typography.pretendard.t1.sbd};
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const CountLine = styled.div`
  margin-top: 4px;
  display: flex;
  justify-content: flex-end;
`;

const Count = styled.div<{
  isActive: boolean;
}>`
  color: ${({ theme }) => theme.colors.gray[400]};
  transition: color 0.3s ease-in-out;

  ${({ theme }) => theme.typography.pretendard.c1.md};

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${({ theme }) => theme.colors.primary.default};
    `};
`;
