import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import Snd from 'snd-lib';
import styled, { css, keyframes } from 'styled-components';
import OkayPop from './OkayPop';
import ConfirmPop from './ConfirmPop';

const snd = new Snd();

snd.load(Snd.KITS.SND01);

const Test = () => {
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onClick = () => {
    setIsPopOpen(true);
  };

  const onClickConfirm = () => {
    setIsConfirmOpen(true);
  };

  return (
    <Container>
      <OkayPop isOpen={isPopOpen} onClose={() => setIsPopOpen(false)}>
        <OkayPopContainer>다운로드</OkayPopContainer>
      </OkayPop>
      <ConfirmPop
        isOpen={isConfirmOpen}
        height="180px"
        onConfirm={() => {
          setIsConfirmOpen(false);
        }}
        onCancel={() => {
          setIsConfirmOpen(false);
        }}
      >
        <ConfirmPop.Title>다운로드</ConfirmPop.Title>
        <ConfirmPop.Comment>다운로드 하시겠습니까?</ConfirmPop.Comment>
      </ConfirmPop>
      <Button onClick={onClick}>팝업열기</Button>
      <Button onClick={onClickConfirm}>확인팝업열기</Button>
    </Container>
  );
};

export default Test;

const OkayPopContainer = styled.div`
  padding: 10px;
`;

const Container = styled.div``;

const Button = styled.button`
  padding: 10px;
  border: 1px solid #000;
`;
