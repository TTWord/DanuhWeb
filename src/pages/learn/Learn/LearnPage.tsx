import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/recoil';
import bulbIcon from '@/assets/svg/icons/icon-bulb.svg';
import leafIcon from '@/assets/svg/icons/icon-leaf.svg';
import treeIcon from '@/assets/svg/icons/icon-tree.svg';
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
      icon: bulbIcon,
    },
    {
      title: '단어암기',
      type: 'blind',
      icon: bulbIcon,
    },
  ];

  const quizList = [
    {
      title: '객관식',
      type: 'select',
      icon: leafIcon,
    },
    {
      title: '객관식',
      type: 'blind',
      icon: leafIcon,
      typeDetail: 'choice',
    },
    {
      title: '주관식',
      type: 'typing',
      icon: treeIcon,
    },
    {
      title: '주관식',
      type: 'blind',
      icon: treeIcon,
      typeDetail: 'shortanswer',
    },
  ];

  interface IButtonItem {
    title: string;
    type: string;
    icon: string;
    typeDetail?: string;
  }

  return (
    <Wrapper>
      <HeaderWrapper>학습하기</HeaderWrapper>

      <ContainerWrapper>
        <Container>
          <QuizTitle>암기하기</QuizTitle>
          <SelectWrapper>
            {memoList.map((itme: IButtonItem, idx) => {
              return (
                <SelectButtonComponent
                  key={idx}
                  naviURL={'/learn/memo'}
                  title={itme.title}
                  type={itme.type}
                  icon={itme.icon}
                  typeDetail={itme.typeDetail}
                />
              );
            })}
          </SelectWrapper>
        </Container>
        <Container>
          <QuizTitle>문제 풀기</QuizTitle>
          <SelectWrapper>
            {quizList.map((itme: IButtonItem, idx) => {
              return (
                <SelectButtonComponent
                  key={idx}
                  naviURL={'/learn/quiz'}
                  title={itme.title}
                  type={itme.type}
                  icon={itme.icon}
                  typeDetail={itme.typeDetail}
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
const HeaderWrapper = styled.header`
  width: 100%;
  height: 56px;
  padding: 0 16px;

  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #171717;
`;

//-- 컨테이너 --//
const ContainerWrapper = styled.div`
  width: 100%;
  padding-top: 26px;
  padding-bottom: 70px;
  flex: 1;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  width: 100%;
  margin-bottom: 48px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const QuizTitle = styled.div`
  padding: 0 0 13px 22px;
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #333333;
  color: black;
`;

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 22px;
`;
