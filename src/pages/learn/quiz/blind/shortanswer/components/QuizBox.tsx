import styled from 'styled-components';

const QuizBox = ({ word }: { word: string }) => {
  return <Box>{word}</Box>;
};

export default QuizBox;

const Box = styled.div`
  width: 100%;
  height: 10%;
  flex-shrink: 0;
  display: flex;
  justify-content: start;
  align-items: center;
  ${({ theme }) => theme.typography.pretendard.t2.sbd};

  font: bold;

  & + & {
    margin-top: 1.25%;
  }

  :nth-child(4),
  :nth-child(6) {
    opacity: 0.4;
  }

  :nth-child(3),
  :nth-child(7) {
    opacity: 0.3;
  }

  :nth-child(2),
  :nth-child(8) {
    opacity: 0.2;
  }

  :nth-child(1),
  :nth-child(9) {
    opacity: 0.1;
  }
`;
