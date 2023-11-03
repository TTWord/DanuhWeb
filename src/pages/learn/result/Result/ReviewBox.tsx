import Toggle from '@/components/common/switch/Toggle';
import { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { api } from '@/api';

interface IReviewBox {
  info: {
    word: string;
    mean: string;
    isMemo: boolean;
    wordId: number;
  };
}

const ReviewBox = (props: IReviewBox) => {
  const [isToggle, setIsToggle] = useState(props.info.isMemo);

  const toggleMemo = async () => {
    try {
      const { data: response } = await api.memo.patchMemoStatus({
        wordId: props.info.wordId,
        isMemorized: !isToggle,
      });
      setIsToggle((c) => !c);
    } catch (e) {
      console.log(e);
    }
  };

  //
  const getWordInfo = async () => {
    try {
      const { data: response } = await api.word.getWordById(props.info.wordId);

      setIsToggle(response.data.is_memorized);
    } catch (e) {
      console.log(e);
    }
  };

  // 넣을지 말지 고민 중 => 결과 페이지에서 새로고침 할 일이 없을 것 같아서
  useEffect(() => {
    getWordInfo();
  }, []);

  return (
    <Box>
      <ReviewWord>{props.info.word}</ReviewWord>
      <ReviewMean>{props.info.mean}</ReviewMean>
      <MemoCheck>
        <Toggle
          type={'quiz'}
          isToggle={isToggle}
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            toggleMemo();
          }}
        />
      </MemoCheck>
    </Box>
  );
};

export default ReviewBox;

const Box = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.typography.pretendard.c1.md};
  color: ${({ theme }) => theme.colors.gray[700]};

  & + & {
    margin-top: 20px;
  }
`;

const ReviewWord = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
`;

const ReviewMean = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
`;

const MemoCheck = styled.div`
  width: 20%;
  height: auto;
  display: flex;
  justify-content: end;
`;
