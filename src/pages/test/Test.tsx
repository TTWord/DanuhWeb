import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import Snd from 'snd-lib';
import styled, { css, keyframes } from 'styled-components';
import OkayPop from './OkayPop';
import ConfirmPop from './ConfirmPop';
import TopBarDefault from '@/components/common/header/TopBarDefault';
import TopBarButton from '@/components/common/header/TopBarButton';
import TopBarClose from '@/components/common/header/TopBarClose';
import TopBarPage from '@/components/common/header/TopBarPage';
import TopBarSearch from '@/components/common/header/TopBarSearch';
import TopBarSetting from '@/components/common/header/TopBarSetting';
import testIcon from '@/assets/svg/logos/logo-profile-default.svg';
import { useNavigate } from 'react-router-dom';

const snd = new Snd();

snd.load(Snd.KITS.SND01);

const Test = () => {
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const onClick = () => {
    setIsPopOpen(true);
  };

  const onClickConfirm = () => {
    setIsConfirmOpen(true);
  };

  const temp = () => {
    navigate('/test');
    console.log('버튼 클릭');
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

      <TopBarDefault navigate="/test" title="Page title" />
      <TopBarSearch onClick={temp} title="Share" />
      <TopBarPage
        navigate="/test"
        title="Page title"
        currentPage={1}
        lastPage={3}
      />
      <TopBarButton
        navigate="/test"
        title="Page title"
        onClick={temp}
        //buttonImg={}
      />
      <TopBarSetting onClick={temp} title="Share" />
      <TopBarClose onClick={temp} />
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
