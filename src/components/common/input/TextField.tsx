import { ChangeEvent, useState } from 'react';
import styled, { css } from 'styled-components';

interface TextFieldProps {
  width?: number;
  height?: number;
}

const TextField = ({ width, height }: TextFieldProps) => {
  const [value, setValue] = useState('');
  const maxLength = 2000;

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    const length = inputValue.length;

    if (length <= 2000) {
      setValue(inputValue);
    }

    console.log(inputValue, inputValue.length);
  };

  return (
    <TextBox width={width} height={height}>
      <TextArea
        onChange={onChange}
        placeholder="영어 문장을 입력해주세요"
        value={value}
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
  ${({ theme }) => theme.typography.pretendard.t3.md}
  color: ${({ theme }) => theme.colors.gray[900]}
`;

const LengthIndicator = styled.span`
  height: auto;
  display: flex;
  justify-content: end;
  ${({ theme }) => theme.typography.pretendard.c1.md}
  color: ${({ theme }) => theme.colors.gray[400]}
`;
