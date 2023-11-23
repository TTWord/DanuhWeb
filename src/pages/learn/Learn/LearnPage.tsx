import React from 'react';
import styled from 'styled-components';
import TopAppBar from '@/components/common/header/TopAppBar';

import useLearnPageLogics from './hooks/useLearnPageLogics';
import { memoList, quizList } from './data/LearnData';
import LearnTypeContainer from './components/LearnTypeContainer';
import AlertPop from '@/components/common/popup/AlertPop';
import { useRecoilState } from 'recoil';
import { globalState } from '@/recoil';

const LearnPage = () => {
  const { haveBooks } = useLearnPageLogics();

  const [isLearnPopOpen, setIsLearnPopOpen] = useRecoilState(
    globalState.learn.isLearnPopOpen,
  );

  return (
    <Wrapper>
      <TopAppBar type="default" title="Quiz" />

      <AlertPop
        type="custom"
        isOpen={isLearnPopOpen}
        onClose={() => {
          setIsLearnPopOpen(false);
        }}
        width={'280px'}
      >
        <PopBox>
          <div>단어장이 없습니다.</div>
          <div>단어장을 추가해주세요.</div>
        </PopBox>
      </AlertPop>

      <Content>
        <LearnTypeContainer
          haveBook={haveBooks}
          title={'memo'}
          ButtonList={memoList}
        />
        <LearnTypeContainer
          haveBook={haveBooks}
          title={'quiz'}
          ButtonList={quizList}
        />
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

const PopBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.black};

  div {
    :last-child {
      margin-top: 32px;
    }
  }
`;
