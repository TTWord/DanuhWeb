import Snd from 'snd-lib';
import styled, { css, keyframes } from 'styled-components';
import { useState } from 'react';
import useToast from '@/hooks/useToast';

const snd = new Snd();

snd.load(Snd.KITS.SND01);

const Test = () => {
  const toast = useToast();

  console.log(process.env.SERVER_NAME);

  return <Container>Test Page 5</Container>;
};

export default Test;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
