import styled from 'styled-components';
import NextButtonSVG from '@/components/svg/setting/NextButtonSVG';
import { useState } from 'react';

const ContentBox = (props: any) => {
  const [fill, setFill] = useState<boolean>(false);

  return (
    <Content
      onClick={props.onClick}
      onMouseOver={() => setFill(true)}
      onMouseOut={() => setFill(false)}
    >
      <div>{props.title}</div>
      {fill ? <NextButtonSVG fill="white" /> : <NextButtonSVG />}
    </Content>
  );
};

export default ContentBox;

const Content = styled.div`
  height: 64px;
  box-sizing: border-box;
  background: #ffffff;
  border-bottom: 1px solid #dddddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 26px;
  transition: 0.4s;

  div {
    font-weight: 300;
    font-size: 16px;
    text-align: center;
    line-height: 16px;
  }

  :hover {
    background-color: #694ac2;
    color: white;
    cursor: pointer;
  }
`;
