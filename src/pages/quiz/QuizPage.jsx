import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { globalState } from '@/recoil';
import Footer from '@/components/layout/HomeLayout/Footer';
import bulbIcon from '@/assets/svg/icons/icon-bulb.svg';
import leafIcon from '@/assets/svg/icons/icon-leaf.svg';
import treeIcon from '@/assets/svg/icons/icon-tree.svg';

const QuizPage = () => {
  const [activeMenu, setActiveMenu] = useRecoilState(
    globalState.layout.activeMenuNumber,
  );

  useEffect(() => {
    setActiveMenu(1);
  }, []);

  const navigate = useNavigate();

  const goFlashcard = () => {
    navigate('/quiz/flashcard');
  };
  const goChoiceQuiz = () => {
    navigate('/quiz/choice');
  };
  const goShortQuiz = () => {
    navigate('/quiz/shortanswer');
  };

  return (
    <MainWrapper>
      <HeaderWrapper>
        <PageTitle>Quiz</PageTitle>
      </HeaderWrapper>

      <ContainerWrapper>
        <Container>
          <QuizTitle>암기하기</QuizTitle>
          <SelectWrapper>
            <SelectButton onClick={goFlashcard}>
              단어암기
              <Type>Flashcard</Type>
              <Icon src={bulbIcon} alt="bulbIcon" />
            </SelectButton>
          </SelectWrapper>
        </Container>
        <Container>
          <QuizTitle>문제 풀기</QuizTitle>
          <SelectWrapper>
            <SelectButton onClick={goChoiceQuiz}>
              객관식
              <Type>Select</Type>
              <Icon src={leafIcon} alt="leafIcon" />
            </SelectButton>
            <SelectButton onClick={goShortQuiz}>
              주관식
              <Type>Drag</Type>
              <Icon src={treeIcon} alt="treeIcon" />
            </SelectButton>
          </SelectWrapper>
        </Container>
      </ContainerWrapper>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </MainWrapper>
  );
};

export default QuizPage;

//-- 웹 --//
const MainWrapper = tw.div`w-[100%] h-[100%] overflow-hidden flex flex-col absolute`;

//-- 헤더 --//
const HeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 43px;
`;
const PageTitle = styled.div`
  width: 100%;
  padding: 23px 0 0 23px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: black;
`;

//-- 컨테이너 --//
const ContainerWrapper = styled.div`
  width: 100%;
  padding-bottom: 70px;
`;
const Container = styled.div`
  width: 100%;
  margin-bottom: 48px;
`;
const QuizTitle = styled.div`
  width: 100%;
  padding: 0 0 13px 22px;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  color: #333333;
  color: black;
  border-bottom: 1px solid black;
  margin-bottom: 19px;
`;
const SelectWrapper = styled.div`
  width: 100%;
  padding: 0 14px 0 22px;
  display: flex;
  flex-wrap: wrap;
  //justify-content: space-between;
`;
const SelectButton = styled.button`
  width: 170px;
  height: 190px;
  background-color: #694ac2;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  color: white;
  font-weight: 300;
  font-size: 16px;
  line-height: 16px;
  padding: 26px 20px 30px 20px;
  margin: 0 8px 8px 0;
  position: relative;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
`;

const Type = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  margin: 10px 0 60px 0;
`;

const Icon = styled.img`
  position: absolute;
  right: 20px;
  bottom: 30px;
`;

//-- 푸터 --//
const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  display: flex;
  background: #ffffff;
`;
