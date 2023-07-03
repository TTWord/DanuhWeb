import { useNavigate } from 'react-router-dom';
import Snd from 'snd-lib';
import styled from 'styled-components';

const snd = new Snd();

snd.load(Snd.KITS.SND01);

const Test = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Button
        onClick={() => {
          snd.play(Snd.SOUNDS.TAP);
        }}
      >
        123
      </Button>
      <Button
        onClick={() => {
          snd.play(Snd.SOUNDS.CELEBRATION);
        }}
      >
        1234
      </Button>
      <Button
        onClick={() => {
          snd.play(Snd.SOUNDS.NOTIFICATION);
        }}
      >
        1235
      </Button>
      <Button
        onClick={() => {
          snd.play(Snd.SOUNDS.CAUTION);
        }}
      >
        123566
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
