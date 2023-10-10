import { useEffect } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

import iconSuccess from './svg/icon-success.svg';
import iconError from './svg/icon-error.svg';

export const toastStatus = atom({
  key: 'toastStatus',
  default: {
    isOpen: false,
    timer: 0,
    message: '',
    type: '',
  },
});

const Toast = () => {
  const {
    isOpen,
    timer,
    message,
    type: toastType,
  } = useRecoilValue(toastStatus);
  const setToastStatus = useSetRecoilState(toastStatus);

  useEffect(() => {
    if (isOpen && timer > 0) {
      setTimeout(() => {
        setToastStatus((current) => ({ ...current, isOpen: false, timer: 0 }));
      }, timer);
    }
  }, [isOpen, timer, setToastStatus]);

  if (toastType === 'QUIZ') {
    return (
      <QuizBox isOpen={isOpen}>
        <Text toastType={toastType}>{`test: ${message}`}</Text>
      </QuizBox>
    );
  }
  return (
    <Box isOpen={isOpen} toastType={toastType}>
      {toastType === 'SUCCESS' && <img src={iconSuccess} alt="success" />}
      {toastType === 'ERROR' && <img src={iconError} alt="error" />}
      <Text toastType={toastType}>{message}</Text>
    </Box>
  );
};

export default Toast;

const Box = styled.div<{
  isOpen: boolean;
  toastType: string;
}>`
  position: fixed;
  width: 320px;
  height: 44px;
  z-index: 101;
  background-color: black;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: -100px;
  transition: bottom 0.3s cubic-bezier(1, -0.01, 0.61, 0.74);

  padding: 10px 16px;
  box-sizing: border-box;
  opacity: 0.86;

  ${({ isOpen }) =>
    isOpen &&
    css`
      bottom: 100px;
    `};

  ${({ toastType }) => {
    switch (toastType) {
      case 'SUCCESS':
        return css`
          background-color: #05ca5f;
        `;
      case 'ERROR':
        return css`
          background-color: #fc4b4b;
        `;
      case 'WARNING':
        return css`
          width: auto;
          border-radius: 8px;
          border: 1px solid ${({ theme }) => theme.colors.secondary.default};
          background-color: rgba(74, 208, 226, 0.06);
          color: ${({ theme }) => theme.colors.secondary.default};
        `;
      default:
        return css`
          background-color: #734ae8;
        `;
    }
  }};
`;

const QuizBox = styled.div<{
  isOpen: boolean;
}>`
  position: fixed;
  z-index: 99;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: top 0.3s cubic-bezier(1, -0.01, 0.61, 0.74);
  padding: 8px 16px;
  box-sizing: border-box;
  opacity: 0.86;
  width: auto;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary.default};
  background-color: rgba(74, 208, 226, 0.06);
  color: ${({ theme }) => theme.colors.secondary.default};
  color: red;

  top: -68px;

  ${({ isOpen }) =>
    isOpen &&
    css`
      top: 68px;
    `};
`;

const Text = styled.div<{
  toastType: string;
}>`
  width: 100%;
  color: white;
  font-size: 14px;
  line-height: 140%;

  ${({ toastType }) => {
    switch (toastType) {
      case 'COMMENT':
        return css`
          margin-left: 0px;
        `;
      case 'WARNING':
        return css`
          color: ${({ theme }) => theme.colors.secondary.default};
        `;
      case 'QUIZ':
        return css`
          color: ${({ theme }) => theme.colors.secondary.default};
        `;
      default:
        return css`
          margin-left: 10px;
        `;
    }
  }};
`;
