import { useRef, useState } from 'react';
import styled, { css } from 'styled-components';

interface InputProps {
  type?: 'default' | 'fit' | 'password';
  placeholder?: string;
  onChange?: (text: string) => void;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  onChange,
  value,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isPasswordView, setIsPasswordView] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onPasswordView = () => {
    setIsPasswordView(current => !current);
  };

  return (
    <Container isFocused={isFocused} isFit={type === 'fit'}>
      <InputBox
        placeholder={placeholder}
        onFocus={() => {
          onFocus();
        }}
        onBlur={() => {
          onBlur();
        }}
        ref={inputRef}
        type={type === 'password' && !isPasswordView ? 'password' : 'text'}
        onChange={e => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        value={value}
      />
      {type !== 'password' && (
        <CloseButton
          isView={isFocused}
          onClick={() => {
            if (onChange) {
              onChange('');
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
          >
            <path
              d="M0.86084 8.18457L7.93191 1.1135"
              stroke="#C5C6D0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.93188 8.18457L0.860817 1.1135"
              stroke="#C5C6D0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CloseButton>
      )}
      {type === 'password' && (
        <EyeButton isView={isFocused} onClick={() => onPasswordView()}>
          {isPasswordView ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M2.81661 12.7132C2.68042 12.4975 2.61233 12.3897 2.57421 12.2234C2.54558 12.0985 2.54558 11.9015 2.57421 11.7766C2.61233 11.6103 2.68042 11.5025 2.81661 11.2868C3.94201 9.50484 7.29188 5 12.3969 5C17.5019 5 20.8518 9.50484 21.9772 11.2868C22.1134 11.5025 22.1815 11.6103 22.2196 11.7766C22.2482 11.9015 22.2482 12.0985 22.2196 12.2234C22.1815 12.3897 22.1134 12.4975 21.9772 12.7132C20.8518 14.4952 17.5019 19 12.3969 19C7.29188 19 3.94201 14.4952 2.81661 12.7132Z"
                stroke="#C5C6D0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.3969 15C14.0537 15 15.3969 13.6569 15.3969 12C15.3969 10.3431 14.0537 9 12.3969 9C10.74 9 9.39689 10.3431 9.39689 12C9.39689 13.6569 10.74 15 12.3969 15Z"
                stroke="#C5C6D0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M11.1902 5.09232C11.5966 5.03223 12.0159 5 12.4477 5C17.5527 5 20.9026 9.50484 22.028 11.2868C22.1642 11.5025 22.2323 11.6103 22.2704 11.7767C22.299 11.9016 22.299 12.0987 22.2704 12.2236C22.2322 12.3899 22.1636 12.4985 22.0265 12.7156C21.7266 13.1901 21.2694 13.8571 20.6638 14.5805M7.17159 6.71504C5.00951 8.1817 3.54172 10.2194 2.86837 11.2853C2.73155 11.5019 2.66314 11.6102 2.625 11.7765C2.59636 11.9014 2.59635 12.0984 2.62498 12.2234C2.6631 12.3897 2.7312 12.4975 2.8674 12.7132C3.99281 14.4952 7.34268 19 12.4477 19C14.5061 19 16.2791 18.2676 17.7361 17.2766M3.44768 3L21.4477 21M10.3264 9.87868C9.78347 10.4216 9.44768 11.1716 9.44768 12C9.44768 13.6569 10.7908 15 12.4477 15C13.2761 15 14.0261 14.6642 14.569 14.1213"
                stroke="#C5C6D0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </EyeButton>
      )}
    </Container>
  );
};

export default Input;

const Container = styled.div<{
  isFocused: boolean;
  isFit?: boolean;
}>`
  width: 100%;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 11px 8px 11px ${({ isFit }) => (isFit ? '0px' : '8px')};

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary.default};
    `}
`;

const InputBox = styled.input`
  width: 100%;
  height: 22px;
  outline: none;
  box-sizing: border-box;
  ${({ theme }) => theme.typography.pretendard.t3.md};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const CloseButton = styled.button<{
  isView: boolean;
}>`
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;

  ${({ isView }) =>
    isView &&
    css`
      opacity: 1;
    `}
`;

const EyeButton = styled.button<{
  isView: boolean;
}>`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;

  ${({ isView }) =>
    isView &&
    css`
      opacity: 1;
    `}
`;
