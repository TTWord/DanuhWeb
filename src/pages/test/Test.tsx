import Snd from 'snd-lib';
import styled, { css, keyframes } from 'styled-components';

const snd = new Snd();

snd.load(Snd.KITS.SND01);

const Test = () => {
  return <Container></Container>;
};

export default Test;

const Container = styled.div``;
