import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/recoil';
import SelectButtonComponent from './components/SelectButtonComponent';

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
  ];

  const quizList = [
    {
      title: '객관식',
      type: 'select',
    },
    {
      title: '객관식',
      type: 'blind',
      typeDetail: 'choice',
    },
    {
      title: '주관식',
      type: 'typing',
      lineColor: 'purple',
    },
    {
      title: '주관식',
      type: 'blind',
      typeDetail: 'shortanswer',
      lineColor: 'purple',
    },
  ];

  interface IButtonItem {
    title: string;
    type: string;
    typeDetail?: string;
  }

  return (
    <Wrapper>
      <Header>Quiz</Header>

      <ContainerWrapper>
        <Container>
          <QuizTitle>암기하기</QuizTitle>
          <SelectWrapper>
            {memoList.map((item: IButtonItem, idx) => {
              return (
                <SelectButtonComponent
                  key={idx}
                  naviURL={'/learn/memo'}
                  {...item}
                />
              );
            })}
          </SelectWrapper>
        </Container>
        <Container>
          <QuizTitle>문제 풀기</QuizTitle>
          <SelectWrapper>
            {quizList.map((item: IButtonItem, idx) => {
              return (
                <SelectButtonComponent
                  key={idx}
                  naviURL={'/learn/quiz'}
                  {...item}
                />
              );
            })}
          </SelectWrapper>
        </Container>
      </ContainerWrapper>
    </Wrapper>
  );
};

export default LearnPage;

//-- 웹 --//
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

//-- 헤더 --//
const Header = styled.header`
  width: 100%;
  height: 56px;
  padding: 0 16px;

  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  font-weight: 700;

  color: #171717;
`;

//-- 컨테이너 --//
const ContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 4px;
  padding: 0 16px;
  flex: 1;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  width: 100%;

  & + & {
    margin-top: 40px;
  }
`;

const QuizTitle = styled.div`
  ${({ theme }) => theme.typography.pretendard.t1.sbd};
`;

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
`;
