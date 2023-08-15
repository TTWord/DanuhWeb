import { useState, useEffect } from 'react';
import styled from 'styled-components';
import VoteButton from './VoteButton';
import { globalState } from '@/recoil';
import { useRecoilValue } from 'recoil';
import FooterButton from '@/components/common/button/FooterButton';
import useDeleteAccount from '@/pages/setting/Setting/hooks/useDeleteAccount';
import Input from '@/components/common/input/Input';

const DeleteSurvey = () => {
  const deleteAccount = useDeleteAccount();
  const [isActive, setActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [surveyData, setSurveyData] = useState<String[]>([]);
  const isDirectInput = useRecoilValue(globalState.setting.directInputMode);

  const voteOnClick = (text: string) => {
    setSurveyData((surveyData) => {
      const index = surveyData.indexOf(text);
      if (index > -1) {
        surveyData.splice(index, 1);
      } else {
        surveyData.push(text);
      }
      return [...surveyData];
    });
  };

  const onClickDelete = () => {
    if (isActive && isDirectInput) {
      const final = surveyData.concat(inputValue);
      deleteAccount(final);
    } else {
      const final = surveyData;
      deleteAccount(final);
    }
  };

  useEffect(() => {
    if (surveyData.length !== 0 || isDirectInput) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [surveyData, isDirectInput]);

  return (
    <SurveyWrapper>
      <Center>
        <Title>
          다너의 어떤 점이 불편하셨나요?
          <div>사유를 선택하시면 즉시 탈퇴처리 됩니다</div>
        </Title>

        <VoteButton voteOnClick={voteOnClick} text={'사용하기 불편함'} />
        <VoteButton voteOnClick={voteOnClick} text={'학습하기 불편함'} />
        <VoteButton voteOnClick={voteOnClick} text={'단어를 외우기 싫음'} />
        <VoteButton voteOnClick={voteOnClick} text={'더이상 사용하지 않음'} />
        <VoteButton text={'직접 입력'} />
        {isDirectInput && (
          <Input
            type={'fit'}
            placeholder="사유를 입력해주세요"
            value={inputValue}
            onChange={(text) => {
              setInputValue(text);
            }}
          />
        )}
      </Center>

      <FooterButton onClick={onClickDelete} isActive={isActive}>
        탈퇴하기
      </FooterButton>
    </SurveyWrapper>
  );
};

export default DeleteSurvey;

const SurveyWrapper = styled.div`
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
  padding: 0 24px;
  padding-top: 15vh;
`;

const Title = styled.div`
  color: black;
  ${({ theme }) => theme.typography.pretendard.t2.sbd}
  margin-bottom: 24px;

  div {
    margin-top: 4px;
    ${({ theme }) => theme.typography.pretendard.c1.md}
  }
`;
