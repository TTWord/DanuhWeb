import { globalState } from '@/recoil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';

const QuizButton = (props: any) => {
  const [selectedButton, setSelectedButton] = useRecoilState(
    globalState.quiz.selectedButton,
  );

  const [isAnswered, setIsAnswered] = useRecoilState(
    globalState.quiz.isAnswered,
  );

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isAnswered) {
      setIsSelected(props.number === selectedButton);
    }
  }, [selectedButton]);

  return (
    <ChoiceButton
      isSelected={isAnswered && isSelected}
      isCorrect={isAnswered && props.number === props.currentAnswerIndex}
      onClick={() => {
        props.selectAnswer(props.example);

        if (!isAnswered) {
          setSelectedButton(props.number);
          props.selectAnswer(props.example);
          setIsAnswered(true);
        }
      }}
    >
      {props.example}
    </ChoiceButton>
  );
};

export default QuizButton;

const ChoiceButton = styled.button<{
  isSelected: boolean;
  isCorrect: boolean;
}>`
  width: 100%;
  height: 44px;
  padding: 15px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typography.pretendard.b1.sbd}
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.black};

  &:active {
    border: 1px solid ${({ theme }) => theme.colors.primary.default};
  }

  & + & {
    margin-top: 8px;
  }

  ${({ isSelected }) => {
    return (
      isSelected &&
      css`
        border: 1px solid ${({ theme }) => theme.colors.error};
        color: ${({ theme }) => theme.colors.error};
      `
    );
  }}

  ${({ isCorrect }) => {
    return (
      isCorrect &&
      css`
        border: 1px solid ${({ theme }) => theme.colors.primary.default};
        color: ${({ theme }) => theme.colors.primary.default};
      `
    );
  }}
`;
