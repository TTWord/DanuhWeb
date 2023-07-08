import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { globalState } from '@/recoil';
import bulbIcon from '@/assets/svg/icons/icon-bulb.svg';
import leafIcon from '@/assets/svg/icons/icon-leaf.svg';
import treeIcon from '@/assets/svg/icons/icon-tree.svg';
import useNavigatePush from '@/hooks/useNavigatePush';
import SelectButtonComponent from './components/SelectButtonComponent';

const QuizPage = () => {
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);

  useEffect(() => {
    setActiveMenu(1);
  }, []);

  const navigatePush = useNavigatePush();

  const goFlashcard = () => {
    navigatePush('/quiz/flashcard');
  };
  const goBlind = () => {
    navigatePush('/quiz/blind');
  };
  const goChoiceSelect = () => {
    navigatePush('/quiz/choice/select');
  };
  const goChoiceBlind = () => {
    navigatePush('/quiz/choice/blind');
  };
  const goShortTyping = () => {
    navigatePush('/quiz/shortanswer/typing');
  };
  const goShortBlind = () => {
    navigatePush('/quiz/shortanswer/blind');
  };

  return (
    <Wrapper>
      <HeaderWrapper>학습하기</HeaderWrapper>

      <ContainerWrapper>
        <Container>
          <QuizTitle>암기하기</QuizTitle>
          <SelectWrapper>
            <SelectButtonComponent
              onClick={goFlashcard}
              title={'단어암기'}
              type={'Flashcard'}
              icon={bulbIcon}
              alt={'Flashcard'}
            />
            <SelectButtonComponent
              onClick={goBlind}
              title={'단어암기'}
              type={'Blind'}
              icon={bulbIcon}
              alt={'blind'}
            />
          </SelectWrapper>
        </Container>
        <Container>
          <QuizTitle>문제 풀기</QuizTitle>
          <SelectWrapper>
            <SelectButtonComponent
              onClick={goChoiceSelect}
              title={'객관식'}
              type={'Select'}
              icon={leafIcon}
              alt={'Select'}
            />
            <SelectButtonComponent
              onClick={goChoiceBlind}
              title={'객관식'}
              type={'Blind'}
              icon={leafIcon}
              alt={'Blind'}
            />
            <SelectButtonComponent
              onClick={goShortTyping}
              title={'주관식'}
              type={'Typing'}
              icon={treeIcon}
              alt={'Typing'}
            />
            <SelectButtonComponent
              onClick={goShortBlind}
              title={'주관식'}
              type={'Blind'}
              icon={treeIcon}
              alt={'Blind'}
            />
          </SelectWrapper>
        </Container>
      </ContainerWrapper>
    </Wrapper>
  );
};

export default QuizPage;

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
  margin-bottom: 26px;
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
