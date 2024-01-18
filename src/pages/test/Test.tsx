import Snd from 'snd-lib';
import styled, { css, keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import useToast from '@/hooks/useToast';
import CSVSample from './book-manage-sample/CSVSample';

const snd = new Snd();

snd.load(Snd.KITS.SND01);

const Test = () => {
  const toast = useToast();

  const [state, setState] = useState(false);

  console.log(process.env.SERVER_NAME);

  return (
    <Container>
      <div>Test Page 9</div>
      <CSVSample />
    </Container>
  );
};

export default Test;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
