import { useState } from 'react';
import styled from 'styled-components';
import DeleteMain from './components/DeleteMain';
import DeleteSurvey from './components/DeleteSurvey';
import TopBarDefault from '@/components/common/header/TopBarDefault';

const DeleteAccountPage = () => {
  const [isVoteMode, setVoteMode] = useState(false); //false로 바꾸어야함

  const onClickSetVodeMode = () => {
    setVoteMode(true);
  };

  return (
    <MainWrapper>
      <TopBarDefault navigate="/setting" title="탈퇴하기" />

      <Content>
        {/* 탈퇴하기 메인 화면 */}
        {!isVoteMode && <DeleteMain onClick={onClickSetVodeMode} />}
        {/* 탈퇴하기 불편 사항 선택 & 최종 화면, 직접 입력 체크 input 출력 */}
        {isVoteMode && <DeleteSurvey />}
      </Content>
    </MainWrapper>
  );
};

export default DeleteAccountPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 56px;
    margin-bottom: 24px;
  }
`;
