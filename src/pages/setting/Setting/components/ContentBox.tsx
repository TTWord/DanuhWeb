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
  flex-shrink: 0;

  &:active {
    background: ${(props) => props.theme.colors.gray[100]};
  }

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
