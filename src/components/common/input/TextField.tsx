import { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

interface TextFieldProps {
  width?: number;
  height?: number;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  cols?: number;
}

const TextField = ({
  width,
  height,
  placeholder,
  value,
  onChange,
  cols,
}: TextFieldProps) => {
  const maxLength = 2000;

  const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    const length = inputValue.length;

    if (length <= 2000) {
      onChange(inputValue);
    }
  };

  return (
    <TextBox width={width} height={height}>
      <TextArea
        onChange={onChangeTextArea}
        placeholder={placeholder}
        value={value}
        cols={cols}
      />
      <LengthIndicator>
        {value.length}/{maxLength}
      </LengthIndicator>
    </TextBox>
  );
};

export default TextField;

const TextBox = styled.div<{ width?: number; height?: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: 8px;

  ${({ width, height }) => {
    return (
      css`
        width: ${width}px;
        height: ${height}px;
      ` ||
      width ||
      height
    );
  }};
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.typography.pretendard.t3.md};
  color: ${({ theme }) => theme.colors.gray[900]};
  border: 0;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const LengthIndicator = styled.span`
  height: auto;
  display: flex;
  justify-content: end;
  ${({ theme }) => theme.typography.pretendard.c1.md}
  color: ${({ theme }) => theme.colors.gray[400]}
`;
