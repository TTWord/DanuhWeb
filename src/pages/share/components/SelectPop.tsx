import styled, { css } from 'styled-components';
import { useState, MouseEvent } from 'react';
import iconChevronDownSmall from '@/assets/svg/icons/icon-chevron-down-small.svg';
import Toggle from '@/components/common/switch/Toggle';

interface SelectPopProps {
  selectList: {
    text: string;
    onClick: () => void;
    hasToggle?: boolean;
  }[];
  title?: string;
  sortType: string;
  isToggle?: boolean;
  onToggle?: () => void;
}

interface selectListProps {
  text: string;
  onClick: () => void;
  hasToggle?: boolean;
}

const SelectPop = ({
  selectList,
  title,
  sortType,
  onToggle,
  isToggle,
}: SelectPopProps) => {
  // 정렬 팝업
  const [isTypeClicked, setIsTypeclicked] = useState(false);
  const toggleText = '추천한 단어장 · ';

  const onClickType = () => {
    setIsTypeclicked((current) => !current);
  };

  return (
    <SortWrapper hasTitle={title}>
      <Title>{title}</Title>

      <SortType onClick={onClickType}>
        <CurrentType>
          {isToggle && toggleText}
          {sortType}
        </CurrentType>

        <img src={iconChevronDownSmall} alt="list" />

        <TypeList isActive={isTypeClicked}>
          {selectList?.map((item: selectListProps, idx) => {
            return (
              <TypeButton
                key={idx}
                hasToggle={item.hasToggle}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  if (item.hasToggle && onToggle) {
                    e.stopPropagation();
                    onToggle();
                  }
                  item.onClick();
                }}
              >
                {item.hasToggle && isToggle !== undefined && (
                  <Toggle isToggle={isToggle} />
                )}
                <span>{item.text}</span>
              </TypeButton>
            );
          })}
        </TypeList>
      </SortType>
    </SortWrapper>
  );
};

export default SelectPop;

const SortWrapper = styled.div<{ hasTitle?: string }>`
  width: 100%;
  height: 24px;
  margin: 8px 0;
  display: flex;
  justify-content: end;
  align-items: center;

  ${({ hasTitle }) => {
    return (
      hasTitle &&
      css`
        justify-content: space-between;
      `
    );
  }}
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.pretendard.t2.sbd}
  color: ${({ theme }) => theme.colors.black};
`;

const SortType = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  img {
    width: 24px;
    margin-left: 2px;
  }
`;

const CurrentType = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const TypeList = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 24px;
  right: 0;
  width: 188px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 10px 0px rgba(105, 74, 194, 0.08);
  z-index: 1;

  ${({ isActive }) => {
    return isActive
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `;
  }}
`;

const TypeButton = styled.button<{
  hasToggle?: boolean;
}>`
  height: 56px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  padding: 16px;
  display: flex;
  align-items: center;
  background-color: white;
  box-sizing: border-box;

  span {
    margin-left: 6px;
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary[100]};
  }

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
  }

  :first-child {
    border-radius: 8px 8px 0 0;
  }

  :last-child {
    border-radius: 0 0 8px 8px;
  }

  ${({ hasToggle }) => {
    return (
      hasToggle &&
      css`
        background-color: ${({ theme }) => theme.colors.primary[100]};
      `
    );
  }}
`;
