import styled, { css } from 'styled-components';
import { useState, MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import iconArrowDown from '@/assets/svg/icons/icon-arrow-down.svg';
import { globalState } from '@/recoil';

const SortTypeSelectBox = () => {
  const [sortType, setSortType] = useRecoilState(globalState.user.sortType);
  const [isTypeClicked, setIsTypeclicked] = useState(false);

  const onClickType = () => {
    setIsTypeclicked(current => !current);
  };

  const onClickTypeButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSortType(e.currentTarget.innerText);
    setIsTypeclicked(false);
  };

  return (
    <SortWrapper>
      <SortType onClick={onClickType}>
        <CurrentType>{sortType}</CurrentType>
        <img src={iconArrowDown} alt="list" />
        <TypeList isActive={isTypeClicked}>
          <TypeButton onClick={onClickTypeButton}>{'최신순'}</TypeButton>
          <TypeButton onClick={onClickTypeButton}>{'인기순'}</TypeButton>
          <TypeButton onClick={onClickTypeButton}>{'다운로드순'}</TypeButton>
        </TypeList>
      </SortType>
    </SortWrapper>
  );
};

export default SortTypeSelectBox;

const SortWrapper = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: end;
  ${({ theme }) => theme.typography.pretendard.b1.sbd}
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-bottom: 8px;
`;

const SortType = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  img {
    width: 12px;
    margin-left: 8px;
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
  height: 168px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.primary[100]};
  border-radius: 8px;
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

const TypeButton = styled.button`
  height: 56px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  padding: 16px;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.gray[800]};

  :nth-child(2) {
    border-radius: 0px;
    border-top: 1px solid ${({ theme }) => theme.colors.primary[100]};
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary[100]};
  }
`;
