import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Counter = () => {
  // 카운트 다운
  const [minutes, setMinutes] = useState(3); // 1분으로 초기화
  const [seconds, setSeconds] = useState(0); // 0초로 초기화

  useEffect(() => {
    const time = new Date().getTime();
    console.log(time);
    const intervalId = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(intervalId);
        } else {
          setMinutes(prevMinutes => prevMinutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [minutes, seconds]);

  return (
    <CounterBox>
      {minutes.toString().padStart(2, '0')}:
      {seconds.toString().padStart(2, '0')}
    </CounterBox>
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
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
`;
