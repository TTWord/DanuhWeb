import Additional from '@/containers/Home/Additional';
import { useState } from 'react';
import { keyframes } from 'styled-components';
import { css, styled } from 'twin.macro';

const Home = () => {
  const [plusStatus, setPlusStatus] = useState(true);

  return (
    <Container>
      <Items>
        <Item>
          <Strong>
            단어장 제목<Span>Gridy</Span>
          </Strong>
          <P>2015.03.02</P>
          <Status>
            <Gage percentage={'100%'}>
              <ColorGage percentage={'100%'} />
            </Gage>
          </Status>
        </Item>
        <Item>
          <Strong>
            단어장 제목<Span>Gridy</Span>
          </Strong>
          <P>2015.03.02</P>
          <Status>
            <Gage percentage={'20%'}>
              <ColorGage percentage={'20%'} />
            </Gage>
          </Status>
        </Item>
      </Items>
      <Additional isActive={plusStatus} setActive={setPlusStatus} />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  position: relative;
`;

const Items = styled.div`
  width: 100%;
  padding: 20px 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  width: 100%;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 20px;
  padding-bottom: 25px;
  line-height: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  overflow: hidden;
`;

const Strong = styled.strong`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const P = styled.p`
  font-size: 12px;
  color: #999;
`;

const Span = styled.span`
  margin-left: 5px;
  font-size: 12px;
  font-weight: 500;
  color: #666666;
`;

const Status = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: black;
  border-radius: 0 0 5px 5px;
`;

const Gage = styled.div<{
  percentage: string;
}>`
  width: ${({ percentage }) => percentage};
  height: 100%;
  overflow: hidden;
`;

const ColorGage = styled.div<{
  percentage: string;
}>`
  width: 1000%;
  height: 100%;
  position: relative;
  left: calc(-${({ percentage }) => percentage} * 10 + 100%);
  background: linear-gradient(
    90deg,
    #db5f5f 0%,
    #df0a0a 50%,
    #9f3ed3 75%,
    #2316ce 100%
  );
`;
