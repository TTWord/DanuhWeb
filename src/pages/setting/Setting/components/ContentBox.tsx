import styled from 'styled-components';

const ContentBox = (props: any) => {
  return (
    <Content onClick={props.onClick}>
      <div>{props.title}</div>
    </Content>
  );
};

export default ContentBox;

const Content = styled.div`
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  align-items: center;
  transition: 0.4s;
  flex-shrink: 0;

  & + & {
    border-top: 1px solid #f5f2ff;
  }

  div {
    font-weight: 300;
    font-size: 16px;
    text-align: center;
    line-height: 16px;
  }

  :hover {
    cursor: pointer;
  }
`;
