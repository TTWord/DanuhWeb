import React, { useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/recoil';
import NextButtonSVG from '@/components/svg/setting/NextButtonSVG';
import useNavigatePush from '@/hooks/useNavigatePush';
import nextIcon from '@/assets/svg/icons/icon-back-gray.svg';

interface INoticeBox {
  title: string;
  id: number;
  content: string;
}

const NoticeBox: React.FC<INoticeBox> = (props: INoticeBox) => {
  const navigate = useNavigatePush();

  const onClick = () => {
    navigate(`/setting/notice/${props.id}`, {
      state: { title: props.title, content: props.content },
    });
  };

  return (
    <Content onClick={onClick}>
      <TextWrapper>
        <Title>{props.title}</Title>
        <Explain>{props.content.split('.')[0]}</Explain>
      </TextWrapper>
      <NextButton src={nextIcon} alt="next" />
    </Content>
  );
};

export default NoticeBox;

const Content = styled.div`
  width: 100%;
  height: 100px;
  flex-shrink: 0;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.4s;

  :hover {
    cursor: pointer;
  }
`;

const TextWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
  color: black;
  margin-bottom: 4px;
`;

const Explain = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: black;
`;

const NextButton = styled.img`
  rotate: calc(180deg);
`;
