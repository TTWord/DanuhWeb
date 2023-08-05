import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { globalState } from '@/recoil';

const Counter = () => {
  // 카운트 다운
  const [timer, setTimer] = useRecoilState(globalState.auth.timer);

  const [codeTimeOut, setCodeTimeOut] = useRecoilState(
    globalState.auth.codeTimeOut,
  );

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (timer === 0) {
        clearTimeout(timeOutId);
        setCodeTimeOut(true);
      } else {
        setTimer(current => current - 1);
      }
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [timer]);

  return (
    <>
      <CounterBox>
        {Math.floor(timer / 60)
          .toString()
          .padStart(2, '0')}
        :{(timer % 60).toString().padStart(2, '0')}
      </CounterBox>
      {codeTimeOut && (
        <TimeOutMessage>인증시간이 만료되었습니다</TimeOutMessage>
      )}
    </>
  );
};

export default Counter;

const CounterBox = styled.div`
  width: 206px;
  height: 10px;
  font-weight: 400;
  font-size: 10px;
  line-height: 10px;
  color: #666666;
  display: flex;
  justify-content: flex-end;
  color: #4ad0e2;
  padding: 0 8px;
`;

const TimeOutMessage = styled.div`
  margin-top: 8px;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-size: 10px;
  line-height: 10px;
  text-align: center;
  vertical-align: middle;
  color: red;
`;
