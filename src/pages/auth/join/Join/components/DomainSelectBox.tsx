import BottomSlideSelectPop from '@/components/common/popup/BottomSlideSelectPop';
import { globalState } from '@/recoil';
import { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import iconArrowDown from '@/assets/svg/icons/icon-arrow-down.svg';

const DomainSelectBox = () => {
  const [userEmailEnd, setUserEmailEnd] = useRecoilState(
    globalState.auth.domain,
  );

  const [userEmailEditMode, setUserEmailEditMode] = useState(false);

  const inputUserEmailEnd = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmailEnd(e.target.value);
  };

  const [isPopOpen, setIsPopOpen] = useState(false);
  const onSwitchPop = () => {
    setIsPopOpen(!isPopOpen);
  };

  const onPopClose = () => {
    setIsPopOpen(false);
  };

  return (
    <>
      {!userEmailEditMode && (
        <MailButton onClick={onSwitchPop}>
          <MailText isActive={userEmailEnd.length > 0}>
            {userEmailEnd.length > 0 ? userEmailEnd : '선택'}
          </MailText>
          <img src={iconArrowDown} alt="arrow" />
        </MailButton>
      )}
      {userEmailEditMode && (
        <MailButton>
          <Input
            type="text"
            onChange={inputUserEmailEnd}
            placeholder="직접입력"
            tw="w-full px-0"
          />
          <img src={iconArrowDown} alt="arrow" onClick={onSwitchPop} />
        </MailButton>
      )}
      <BottomSlideSelectPop
        isOpen={isPopOpen}
        onPopClose={onPopClose}
        data={[
          {
            text: 'naver.com',
            onClick: () => {
              setUserEmailEnd('naver.com');
              setUserEmailEditMode(false);
            },
          },
          {
            text: 'gmail.com',
            onClick: () => {
              setUserEmailEnd('gmail.com');
              setUserEmailEditMode(false);
            },
          },
          {
            text: 'daum.net',
            onClick: () => {
              setUserEmailEnd('daum.com');
              setUserEmailEditMode(false);
            },
          },
          {
            text: '직접입력',
            onClick: () => {
              setUserEmailEnd('');
              setUserEmailEditMode(true);
            },
          },
        ]}
      />
    </>
  );
};

export default DomainSelectBox;

const Input = styled.input`
  outline: none;
  width: 100%;
  color: #111111;
  padding: 0 16px;

  &::placeholder {
    color: #dadada;
  }
`;

const MailButton = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;

  img {
    width: 11px;
  }
`;

const MailText = styled.div<{
  isActive: boolean;
}>`
  width: 100%;

  ${({ isActive }) =>
    isActive &&
    css`
      color: #111111;
    `}
`;
