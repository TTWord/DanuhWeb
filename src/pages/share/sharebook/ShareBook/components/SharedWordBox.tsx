import styled from 'styled-components';
import iconOther from '@/assets/svg/icons/icon-other.svg';

interface IShareWord {
  words: {
    word: string;
    mean: string;
  };
}

const SharedWordBox = ({ words }: IShareWord) => {
  return (
    <WordBox>
      <Word>{words.word}</Word>
      <Mean>{words.mean}</Mean>
      <Other
        onClick={() => {
          console.log('클릭');
        }}
        src={iconOther}
        alt="other"
      />
    </WordBox>
  );
};

export default SharedWordBox;

const WordBox = styled.div`
  width: 100%;
  height: 80px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px 4px;
  padding-top: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  box-sizing: border-box;
  position: relative;

  & + & {
    margin-top: 8px;
  }
`;

const Word = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.sbd}
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: 6px;
`;

const Mean = styled.div`
  color: ${({ theme }) => theme.colors.gray[500]};
  ${({ theme }) => theme.typography.pretendard.c1.rg}
`;

const Other = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 18px;
  right: 4px;
  cursor: pointer;
`;
