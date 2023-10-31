import { useState } from 'react';
import styled, { css } from 'styled-components';
import iconHide from './svg/icon-hide.svg';
import iconShow from './svg/icon-show.svg';
import iconClose from './svg/icon-close-new.svg';

interface InputProps {
  type?: 'default' | 'fit' | 'password';
  placeholder?: string;
  onChange?: (text: string) => void;
  value?: string;
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  onChange,
  value,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isPasswordView, setIsPasswordView] = useState<boolean>(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onPasswordView = () => {
    setIsPasswordView((current) => !current);
  };

  // Input 타입에 따른 return 분기
  switch (type) {
    // type = default | fit
    default:
      return (
        <Container
          isFocused={isFocused}
          isFit={type === 'fit'}
          tabIndex={-1}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <InputBox
            tabIndex={0}
            placeholder={placeholder}
            type={'text'}
            onChange={(e) => {
              if (onChange) {
                onChange(e.target.value);
              }
            }}
            value={value}
            maxLength={maxLength}
          />

          <CloseButton
            isView={isFocused}
            onClick={() => {
              if (onChange) {
                onChange('');
              }
            }}
          >
            <img src={iconClose} alt="close" />
          </CloseButton>
        </Container>
      );

    case 'password':
      return (
        <Container
          isFocused={isFocused}
          isFit={false}
          tabIndex={-1}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <InputBox
            tabIndex={0}
            placeholder={placeholder}
            type={!isPasswordView ? 'password' : 'text'}
            onChange={(e) => {
              if (onChange) {
                onChange(e.target.value);
              }
            }}
            value={value}
            autoComplete="on"
          />
          <EyeButton
            isView={isFocused}
            onClick={onPasswordView}
            src={isPasswordView ? iconHide : iconShow}
            alt="passwordLook"
          />
        </Container>
      );
  }
};

export default Input;

const Container = styled.div<{
  isFocused: boolean;
  isFit?: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px 8px;
  padding-left: ${({ isFit }) => (isFit ? '0px' : '8px')};
  background-color: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary.default};
    `}
`;

const InputBox = styled.input`
  width: 100%;
  height: 22px;
  ${({ theme }) => theme.typography.pretendard.t3.md};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const CloseButton = styled.div<{
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
  cursor: pointer;
  opacity: 0;
  visibility: hidden;

  ${({ isView }) =>
    isView &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

const EyeButton = styled.img<{
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
  cursor: pointer;
  opacity: 0;
  visibility: hidden;

  ${({ isView }) =>
    isView &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;
