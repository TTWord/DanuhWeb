import Snd from 'snd-lib';
import styled, { css, keyframes } from 'styled-components';
import { useState } from 'react';
import useToast from '@/hooks/useToast';
import Toggle from '@/components/common/switch/Toggle';

const snd = new Snd();

snd.load(Snd.KITS.SND01);

const Test = () => {
  const toast = useToast();

  const [toggle, setToggle] = useState(false);

  const toggling = () => {
    setToggle((c) => !c);
  };

  console.log(process.env.SERVER_NAME);

  return (
    <Container>
      <div>Test Page 6</div>
      <Toggle type="default" isToggle={toggle} onClick={toggling} />
      <Toggle type="quiz" isToggle={toggle} onClick={toggling} />
    </Container>
  );
};

export default Test;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
