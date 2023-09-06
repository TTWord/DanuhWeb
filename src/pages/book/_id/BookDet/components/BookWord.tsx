import styled, { css } from 'styled-components';
import iconOther from '@/assets/svg/icons/icon-other.svg';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import BottomSlidePop from '@/components/common/popup/BottomSlidePop';
import closeSvg from '../svg/close.svg';
import useNavigatePush from '@/hooks/useNavigatePush';

interface IBookWord {
  wordId: number;
  word: string;
  mean: string;
  onClick: any;
}

const BookWord = ({ wordId, word, mean, onClick }: IBookWord) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const navigatePush = useNavigatePush();

  const onClickToggleOption = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOptionOpen((current) => !current);
  };

  const updateWord = (e: any) => {
    e.stopPropagation();
    setIsOptionOpen(false);

    navigatePush(`/book/${wordId}/modify`);
  };

  const deleteWord = () => {
    setIsOptionOpen(false);
    setTimeout(() => {
      onClick(wordId);
    }, 0);
  };

  useEffect(() => {
    const onClickOutside = () => {
      setIsOptionOpen(false);
    };

    window.addEventListener('click', onClickOutside);

    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, []);

  return (
    <WordWrapper>
      <BottomSlidePop
        isOpen={isOptionOpen}
        onPopClose={() => setIsOptionOpen(false)}
        height={312}
      >
        <BookOptionHeader>
          <BookOptionTitle>Meaning</BookOptionTitle>
          <BookOptionCloseButton
            onClick={() => {
              setIsOptionOpen(false);
            }}
          >
            <img src={closeSvg} alt="close" />
          </BookOptionCloseButton>
        </BookOptionHeader>
        <BookOptionContent>
          <BookOptionItem onClick={updateWord}>단어 수정</BookOptionItem>
          <BookOptionItem onClick={deleteWord} red>
            단어 삭제
          </BookOptionItem>
        </BookOptionContent>
      </BottomSlidePop>
      <WordBox>
        <Word>{word}</Word>
        <Option onClick={onClickToggleOption}>
          <img src={iconOther} alt="deleteIcon" />
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
  color: ${({ theme }) => theme.colors.gray[800]};

  ${({ theme }) => theme.typography.pretendard.t3.sbd};
`;

const Mean = styled.span`
  color: ${({ theme }) => theme.colors.gray[400]};

  ${({ theme }) => theme.typography.pretendard.c1.rg};
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

const BookOptionHeader = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const BookOptionTitle = styled.div`
  ${({ theme }) => theme.typography.pretendard.t2.sbd};
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const BookOptionCloseButton = styled.button``;

const BookOptionContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 24px;
`;

const BookOptionItem = styled.div<{
  red?: boolean;
}>`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[800]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  font-size: 16px;
  line-height: 140%;
  font-weight: 600;
  cursor: pointer;
  user-select: none;

  &:active {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  ${({ theme, red }) =>
    red &&
    css`
      color: ${theme.colors.error};
    `};
`;
