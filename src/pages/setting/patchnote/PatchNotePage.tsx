import styled from 'styled-components';
import TopAppBarStack from '@/components/common/header/TopAppBarStack';

import AlertPop from '@/components/common/popup/AlertPop';
import { useState } from 'react';

import { ReactComponent as FaceHappySVG } from './svg/face-happy.svg';

import { ReactComponent as RocketSVG } from './svg/rocket.svg';
import { ReactComponent as RabbitSVG } from './svg/rabbit.svg';
import { ReactComponent as RobotSVG } from './svg/robot.svg';
import { ReactComponent as FlaskSVG } from './svg/flask.svg';

const PatchNotePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const patchData = [
    {
      version: 'V0.1',
      data: ['앱 런칭'],
    },
  ];

  interface IPatchData {
    content: {
      version: string;
      data: string[];
    };
  }

  const PatchBox = ({ content }: IPatchData) => {
    return (
      <Box>
        <Version>{content.version}</Version>
        {content.data.map((data, idx) => {
          return <Text key={idx}>- {data}</Text>;
        })}
      </Box>
    );
  };

  return (
    <WebWrapper>
      <AlertPop
        type="custom"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        width={'280px'}
      >
        <AlertBox>
          <Header>The Creators</Header>
          <Line>
            <Item>
              <RocketSVG />
              <NameText>
                PSB <IdentifierText>(reality023)</IdentifierText>
              </NameText>
            </Item>
            <Item>
              <RabbitSVG />
              <NameText>
                NJH <IdentifierText>(nojihoon)</IdentifierText>
              </NameText>
            </Item>
          </Line>

          <Line>
            <Item>
              <RobotSVG />
              <NameText>
                KJH <IdentifierText>(kimjunghyeon)</IdentifierText>
              </NameText>
            </Item>
            <Item>
              <FlaskSVG />
              <NameText>
                SEUL <IdentifierText>(yettojell)</IdentifierText>
              </NameText>
            </Item>
          </Line>
        </AlertBox>
      </AlertPop>
      <TopAppBarStack type={'default'} navigate="/setting" title="패치노트" />

      <Center>
        {patchData.map((item, idx) => {
          return <PatchBox content={item} key={idx} />;
        })}
      </Center>

      <SmileButton
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <FaceHappySVG />
      </SmileButton>
    </WebWrapper>
  );
};

export default PatchNotePage;

const AlertBox = styled.div`
  display: flex;
  flex-direction: column;

  padding: 32px 8px 24px;
  width: 100%;
`;

const Header = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.bd};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: 24px;
  text-align: center;
`;

const Line = styled.div`
  display: flex;
  width: 100%;

  & + & {
    margin-top: 24px;
  }
`;

const Item = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & + & {
    margin-left: 8px;
  }
`;

const NameText = styled.div`
  margin-top: 8px;
  ${({ theme }) => theme.typography.pretendard.b1.rg};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const IdentifierText = styled.span``;

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  width: 100%;
  height: 96px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const Version = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.sbd};
  color: black;
  padding-bottom: 16px;
`;

const Text = styled.div`
  ${({ theme }) => theme.typography.pretendard.b1.rg};
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const SmileButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 30px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary[400]};
  display: flex;
  justify-content: center;
  align-items: center;
`;
