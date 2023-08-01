import CheckBox from '@/components/common/switch/CheckBox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snd from 'snd-lib';
import styled from 'styled-components';
import Input from './Input';

const snd = new Snd();

snd.load(Snd.KITS.SND01);

const Test = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  return (
    <Container>
      {/* <Button
        onClick={() => {
          snd.play(Snd.SOUNDS.TAP);
        }}
      >
        123
      </Button> */}
      <Input
        placeholder="입력창"
        type="default"
        value={text}
        onChange={(text: string) => {
          setText(text);
        }}
      />
    </Container>
  );
};

export default Test;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px;
`;

const Button = styled.button`
  width: 200px;
  height: 200px;
  background-color: #cccccc;
  transition: background 0.3s;

  &:active {
    background-color: #aaaaaa;
  }
`;
