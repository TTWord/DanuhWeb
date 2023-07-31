import CheckBox from '@/components/common/switch/CheckBox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snd from 'snd-lib';
import styled from 'styled-components';

const snd = new Snd();

snd.load(Snd.KITS.SND01);

const Test = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Container>
      <CheckBox
        isChecked={isChecked}
        onClick={() => setIsChecked(current => !current)}
      />
      <Button
        onClick={() => {
          snd.play(Snd.SOUNDS.TAP);
        }}
      >
        123
      </Button>
    </Container>
  );
};

export default Test;

const Container = styled.div``;
const Button = styled.button`
  width: 200px;
  height: 200px;
  background-color: #cccccc;
  transition: background 0.3s;

  &:active {
    background-color: #aaaaaa;
  }
`;
