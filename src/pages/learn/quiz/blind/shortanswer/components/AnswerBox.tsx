import styled, { css } from 'styled-components';

interface BoxProps {
  answer: string;
  userAnswer?: string;
  showAnswer: boolean;
}

const AnswerBox = ({ answer, userAnswer, showAnswer }: BoxProps) => {
  return (
    <Box showAnswer={showAnswer}>
      {userAnswer !== answer ? <span>{userAnswer}</span> : null}
      {answer}
    </Box>
  );
};

export default AnswerBox;

const Box = styled.div<{ showAnswer: boolean }>`
  width: 100%;
  height: 10%;
  flex-shrink: 0;
  display: flex;
  justify-content: start;
  align-items: center;
  ${({ theme }) => theme.typography.pretendard.t2.sbd};
  font: bold;
  color: ${({ theme }) => theme.colors.secondary.default};

  span {
    text-decoration: line-through;
    color: ${({ theme }) => theme.colors.error};
    margin-right: 8px;
  }

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

  padding-left: 16px;

  :nth-child(n + 5) {
    color: transparent;
  }
`;
