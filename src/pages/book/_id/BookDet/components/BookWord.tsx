import styled, { css } from 'styled-components';
import iconOther from '@/assets/svg/icons/icon-other.svg';
import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IBookWord {
  wordId: number;
  word: string;
  mean: string;
  onClick: any;
}

const BookWord = ({ wordId, word, mean, onClick }: IBookWord) => {
  const [isOptionOpen, setOptionOpen] = useState(false);
  const navigate = useNavigate();

  const onClickToggleOption = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOptionOpen(current => !current);
  };

  const updateWord = (e: any) => {
    e.stopPropagation();
    navigate(`/book/${wordId}/modify`);
  };

  const deleteWord = () => {
    onClick(wordId);
  };

  useEffect(() => {
    const onClickOutside = () => {
      setOptionOpen(false);
    };

    window.addEventListener('click', onClickOutside);

    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, []);

  return (
    <WordWrapper>
      <WordBox>
        <Word>{word}</Word>
        <Option onClick={onClickToggleOption}>
          <img src={iconOther} alt="deleteIcon" />
          <OptionItems isActive={isOptionOpen}>
            <OptionItem onClick={updateWord}>수정하기</OptionItem>
            <OptionItem onClick={deleteWord}>삭제하기</OptionItem>
          </OptionItems>
        </Option>
      </WordBox>
      <Mean>{mean}</Mean>
    </WordWrapper>
  );
};

export default BookWord;

const WordWrapper = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  flex-shrink: 0;
  ::-webkit-scrollbar {
    display: none;
  }
  :last-child {
    border-bottom: 0;
  }
`;

const WordBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Word = styled.span`
  font-weight: 700;
  font-size: 15px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const Mean = styled.span`
  font-size: 13px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const Option = styled.button`
  position: relative;
`;

const OptionItems = styled.div<{
  isActive: boolean;
}>`
  position: absolute;
  right: 0px;
  top: 20px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  background-color: white;
  z-index: 1;
  display: none;
  flex-direction: column;

  ${({ isActive }) =>
    isActive &&
    css`
      display: flex;
    `}
`;

const OptionItem = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;
