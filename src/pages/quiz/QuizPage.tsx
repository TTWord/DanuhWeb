import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { globalState } from '@/recoil';
import Footer from '@/components/layout/HomeLayout/Footer';
import bulbIcon from '@/assets/svg/icons/icon-bulb.svg';
import leafIcon from '@/assets/svg/icons/icon-leaf.svg';
import treeIcon from '@/assets/svg/icons/icon-tree.svg';

const QuizPage = () => {
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);

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
      <HeaderWrapper>학습하기</HeaderWrapper>

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
const HeaderWrapper = styled.header`
  width: 100%;
  height: 56px;
  padding: 8px 0 0 16px;
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
const SelectButton = styled.button`
  width: 153px;
  height: 170px;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #f1ecff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-weight: 300;
  font-size: 15px;
  line-height: 15px;
  color: black;
  padding: 25px 0px 0px 18px;
  margin-bottom: 8px;
  position: relative; // 아이콘 위치 조절

  :nth-child(n + 2) {
    margin-left: 8px;
  }
  @media (max-width: 510px) {
    :nth-child(n + 2) {
      margin-left: 0px;
    }
    :nth-child(even) {
      margin-left: 8px;
    }
  }
  @media (max-width: 392px) {
    width: 42%;
    :nth-child(n + 2) {
      margin-left: 0px;
    }
    :nth-child(even) {
      margin-left: 8px;
    }
  }
`;

const Type = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: #8f6cf3;
  margin-top: 14px;
`;

const Icon = styled.img`
  position: absolute;
  right: 15px;
  bottom: 11px;
`;

//-- 푸터 --//
const FooterWrapper = styled.footer`
  width: 100%;
  height: 72px;
  display: flex;
  background: #ffffff;
`;
