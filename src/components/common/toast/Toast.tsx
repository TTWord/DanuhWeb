import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

export const toastStatus = atom({
  key: 'toastStatus',
  default: {
    isOpen: false,
    timer: 0,
    message: '',
  },
});

const Toast = () => {
  const { isOpen, timer, message } = useRecoilValue(toastStatus);
  const setToastStatus = useSetRecoilState(toastStatus);

  useEffect(() => {
    if (isOpen && timer > 0) {
      setTimeout(() => {
        setToastStatus(current => ({ ...current, isOpen: false, timer: 0 }));
      }, timer);
    }
  }, [isOpen, timer, setToastStatus]);

  return (
    <Box isOpen={isOpen}>
      <Text>{message}</Text>
    </Box>
  );
};

export default Toast;

const Box = styled.div<{
  isOpen: boolean;
}>`
  position: fixed;
  width: 320px;
  height: 54px;
  z-index: 99;
  background-color: black;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 1rem;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: -100px;
  transition: bottom 0.3s cubic-bezier(1, -0.01, 0.61, 0.74);

  ${({ isOpen }) =>
    isOpen &&
    css`
      bottom: 100px;
    `};
`;

const Text = styled.div`
  width: 100%;
  margin: 0 8px;
  color: white;
  text-align: center;
`;
