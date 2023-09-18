import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/recoil';
import SelectButtonComponent from './components/SelectButtonComponent';
import TopAppBar from '@/components/common/header/TopAppBar';

const LearnPage = () => {
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);

  useEffect(() => {
    setActiveMenu(1);
  }, []);

  const memoList = [
    {
      title: '단어암기',
      type: 'flashcard',
    },
    {
      title: '단어암기',
      type: 'blind',
    },
    {
      title: '단어암기',
      type: 'blind',
    },
  ];

  const quizList = [
    {
      title: '객관식',
      type: 'select',
    },
    {
      title: '객관식',
      type: 'blind',
    },
    {
      title: '주관식',
      type: 'typing',
    },
    {
      title: '주관식',
      type: 'blind',
      typeDetail: 'shortanswer',
    },
  ];

  interface IButtonItem {
    title: string;
    type: string;
    typeDetail?: string;
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
                  naviURL={'/learn/memo'}
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
                  naviURL={'/learn/quiz'}
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
  padding: 0 16px;
  flex: 1;
`;

const Container = styled.div`
  width: 100%;

  & + & {
    margin-top: 32px;
  }
`;

const QuizTitle = styled.div`
  ${({ theme }) => theme.typography.pretendard.t1.sbd};
  margin-bottom: 16px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
  display: flex;
`;
