import { useState, MouseEvent, ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import VoteButton from './VoteButton';
import { globalState } from '@/recoil';
import { useRecoilValue } from 'recoil';

interface VoteProps {
  onClick: () => void;
}

const DeleteVote = ({ onClick }: VoteProps) => {
  const isDirectInput = useRecoilValue(globalState.setting.directInputMode);
  const [isSelect, setIsSelect] = useState(false);
  const [voteData, setVoteDate] = useState({
    사용불편: false,
    학습불편: false,
    암기싫음: false,
    그만사용: false,
    개인입력: '',
  });

  const onClickTest1 = () => {
    if (voteData.사용불편 === false) {
      setVoteDate({ ...voteData, 사용불편: true });
    } else {
      setVoteDate({ ...voteData, 사용불편: false });
    }
  };

  const onClickTest2 = () => {
    if (voteData.사용불편 === false) {
      setVoteDate({ ...voteData, 학습불편: true });
    } else {
      setVoteDate({ ...voteData, 학습불편: false });
    }
  };

  const onClickTest3 = () => {
    if (voteData.사용불편 === false) {
      setVoteDate({ ...voteData, 암기싫음: true });
    } else {
      setVoteDate({ ...voteData, 암기싫음: false });
    }
  };

  const onClickTest4 = () => {
    if (voteData.사용불편 === false) {
      setVoteDate({ ...voteData, 그만사용: true });
    } else {
      setVoteDate({ ...voteData, 그만사용: false });
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVoteDate({ ...voteData, 개인입력: e.target.value });

    console.log(e.target.value);
  };

  return (
    <Center>
      <Title>
        다너의 어떤 점이 불편하셨나요?
        <div>사유를 선택하시면 즉시 탈퇴처리 됩니다</div>
      </Title>

      <VoteButton onClick={onClickTest1} text={'사용하기 불편함'} />
      <VoteButton onClick={onClickTest2} text={'학습하기 불편함'} />
      <VoteButton onClick={onClickTest2} text={'단어를 외우기 싫음'} />
      <VoteButton onClick={onClickTest2} text={'더이상 사용하지 않음'} />
      <VoteButton text={'직접 입력'} />

      {isDirectInput && (
        <Input
          onChange={onChange}
          type="text"
          placeholder="사유를 입력해주세요"
        />
      )}
    </Center>
  );
};

export default DeleteVote;

const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
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

const Input = styled.input`
  width: 100%;
  height: 44px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  background-color: white;
  ${({ theme }) => theme.typography.pretendard.b1.md}
  ::placeholder {
    color: 1px solid ${({ theme }) => theme.colors.gray[400]};
  }
`;
