import styled from 'styled-components';

interface WordListProps {
  wordList: {
    word: string;
    mean: string;
    book_id: number;
  }[];
}

const ImportWordList = ({ wordList }: WordListProps) => {
  return (
    <Container>
      {wordList.map((item) => {
        return (
          <WordBox key={item.book_id}>
            <div>{item.word}</div>
            <span>{item.mean}</span>
          </WordBox>
        );
      })}
    </Container>
  );
};

export default ImportWordList;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 13px;
  background-color: #f3f3f3;
  overflow-y: scroll;
`;

const WordBox = styled.div`
  width: 100%;
  height: 80px;
  flex-shrink: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 20px 8px 20px;

  div {
    ${({ theme }) => theme.typography.pretendard.t3.sbd};
    color: ${({ theme }) => theme.colors.gray[900]};
  }

  span {
    ${({ theme }) => theme.typography.pretendard.b1.rg};
    color: ${({ theme }) => theme.colors.gray[500]};
  }

  :nth-child(n + 2) {
    border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
  }
`;
