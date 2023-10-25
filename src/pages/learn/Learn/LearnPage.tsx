import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/recoil';
import SelectButtonComponent from './components/SelectButtonComponent';
import TopAppBar from '@/components/common/header/TopAppBar';

import picFlashCard from './images/flashcard.png';
import picSelect from './images/select.png';
import picTyping from './images/typing.png';

const LearnPage = () => {
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);

  useEffect(() => {
    setActiveMenu(1);
  }, []);

  const memoList = [
    {
      title: '단어암기',
      type: 'flashcard',
      icon: picFlashCard,
      iconWidth: '102px',
    },
  ];

  const quizList = [
    {
      title: '객관식',
      type: 'select',
      icon: picSelect,
      iconWidth: '102px',
    },
    {
      title: '주관식',
      type: 'typing',
      icon: picTyping,
      iconWidth: '102px',
    },
  ];

  interface IButtonItem {
    title: string;
    type: string;
    icon: string;
    typeDetail?: string;
    iconWidth: string;
  }

  return (
    <Wrapper>
      <TopAppBar type="default" title="Quiz" />

      <Content>
        <Container>
          <QuizTitle>암기하기</QuizTitle>
          <ButtonWrapper>
            {memoList.map((item: IButtonItem, idx) => {
              return (
                <SelectButtonComponent
                  key={idx}
                  buttonIcon={item.icon}
                  naviURL={`memo/${item.type}`}
                  {...item}
                />
              );
            })}
          </ButtonWrapper>
        </Container>

        <Container>
          <QuizTitle>문제 풀기</QuizTitle>
          <ButtonWrapper>
            {quizList.map((item: IButtonItem, idx) => {
              return (
                <SelectButtonComponent
                  key={idx}
                  buttonIcon={item.icon}
                  naviURL={`quiz/${item.type}`}
                  {...item}
                />
              );
            })}
          </ButtonWrapper>
        </Container>
      </Content>
    </Wrapper>
  );
};

export default LearnPage;

//-- 웹 --//
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

//-- 컨테이너 --//
const Content = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 4px;
  padding-bottom: calc(16px + 72px);
  flex: 1;
  overflow-y: scroll;
`;

const Container = styled.div`
  width: 100%;

  & + & {
    margin-top: 32px;
  }
`;

const QuizTitle = styled.div`
  ${({ theme }) => theme.typography.pretendard.t1.sbd};
  padding: 0 16px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
  display: flex;
  padding: 16px;
`;
