import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/recoil';
import NextButtonSVG from '@/components/svg/setting/NextButtonSVG';

interface INoticeBox {
  title?: string;
  id?: number;
  explain?: string;
}

const NoticeBox: React.FC<INoticeBox> = (props: any) => {
  const navigate = useNavigate();
  const setTitle = useSetRecoilState(globalState.setting.noticeTitle);

  const onClick = () => {
    setTitle(props.title);
    navigate(`/setting/notice/${props.id}`);
  };

  const [fill, setFill] = useState<boolean>(false);

  return (
    <Content
      onClick={onClick}
      onMouseOver={() => setFill(true)}
      onMouseOut={() => setFill(false)}
    >
      <TextWrapper>
        <Title>{props.title}</Title>
        <Explain>{props.explain}</Explain>
      </TextWrapper>

      {fill ? <NextButtonSVG fill="white" /> : <NextButtonSVG />}
    </Content>
  );
};

export default NoticeBox;

const Content = styled.div`
  height: 99px;
  background: #ffffff;
  border-bottom: 1px solid #cccccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  transition: 0.4s;

  :hover {
    background-color: #694ac2;
    cursor: pointer;
    div {
      color: white;
    }
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 20px;
  color: black;
`;

const Explain = styled.div`
  font-weight: 300;
  font-size: 16px;
  color: black;
`;
