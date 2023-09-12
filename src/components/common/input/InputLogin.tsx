import { useState, ChangeEvent, useEffect } from 'react';
import styled, { css } from 'styled-components';
import BottomSlideSelectPop from '@/components/common/popup/BottomSlideSelectPop';
import { useRecoilState } from 'recoil';
import { globalState } from '@/recoil';

interface InputProps {
  setEmailId: (text: string) => void;
  setDomain: (text: string) => void;
}

const InputLogin: React.FC<InputProps> = ({ setEmailId, setDomain }) => {
  const [emailDomain, setEmailDomain] = useRecoilState(
    globalState.auth.emailDomain,
  );
  const [isDirectInput, setDirectInput] = useState(false);
  const [isLoginFocus, setLoginFocus] = useState(false);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const domainList = [
    {
      text: 'naver.com',
      onClick: () => {
        setEmailDomain('naver.com');
        setDirectInput(false);
      },
    },
    {
      text: 'gmail.com',
      onClick: () => {
        setEmailDomain('gmail.com');
        setDirectInput(false);
      },
    },
    {
      text: 'daum.net',
      onClick: () => {
        setEmailDomain('daum.com');
        setDirectInput(false);
      },
    },
    {
      text: '직접입력',
      onClick: () => {
        setEmailDomain('');
        setDirectInput(true);
      },
    },
  ];

  useEffect(() => {
    setDomain(emailDomain);
  }, [emailDomain]);

  const SelectButton = () => {
    return (
      <Select type="button">
        <svg
          onClick={() => {
            if (isDirectInput) onSwitchPop();
          }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="ic/navigation/chevron_down_small"
            clipPath="url(#clip0_1790_3532)"
          >
            <path
              id="Vector"
              d="M15.88 9.29006L12 13.1701L8.11998 9.29006C7.72998 8.90006 7.09998 8.90006 6.70998 9.29006C6.31998 9.68006 6.31998 10.3101 6.70998 10.7001L11.3 15.2901C11.69 15.6801 12.32 15.6801 12.71 15.2901L17.3 10.7001C17.69 10.3101 17.69 9.68006 17.3 9.29006C16.91 8.91006 16.27 8.90006 15.88 9.29006Z"
              fill="#C5C6D0"
            />
          </g>
          <defs>
            <clipPath id="clip0_1790_3532">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Select>
    );
  };

  const onSwitchPop = () => {
    setIsPopOpen(!isPopOpen);
  };

  const onPopClose = () => {
    setIsPopOpen(false);
  };

  const inputUserEmailEnd = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailDomain(e.target.value);
  };

  return (
    <EmailBox isFocus={isLoginFocus}>
      <EmailID
        onChange={(e) => {
          setEmailId(e.target.value);
        }}
        type="text"
        placeholder="이메일"
        onFocus={() => {
          setLoginFocus(true);
        }}
        onBlur={() => {
          setLoginFocus(false);
        }}
      />

      <EmailCenter>@</EmailCenter>

      <EmailDomain
        onClick={() => {
          if (!isDirectInput) {
            setLoginFocus((current) => !current);
            onSwitchPop();
          }
        }}
      >
        <MailButton>
          {/* 지정 도메인 */}
          {!isDirectInput && (
            <MailText isActive={emailDomain.length > 0}>
              {emailDomain.length > 0 ? emailDomain : '선택'}
            </MailText>
          )}
          {/* 직접 입력 */}
          {isDirectInput && (
            <DirectInput
              onChange={inputUserEmailEnd}
              placeholder="직접입력"
              onFocus={() => {
                setLoginFocus(true);
              }}
              onBlur={() => {
                setLoginFocus(false);
              }}
            />
          )}
          <SelectButton />
        </MailButton>

        <BottomSlideSelectPop
          isOpen={isPopOpen}
          onPopClose={onPopClose}
          data={domainList}
        />
      </EmailDomain>
    </EmailBox>
  );
};

export default InputLogin;

const EmailBox = styled.div<{ isFocus: boolean }>`
  width: 100%;
  height: 44px;
  padding: 10px 8px;
  border-bottom: 1px solid #e7e7e7;
  background-color: white;
  display: flex;
  flex-shrink: 0;
  ${({ theme }) => theme.typography.pretendard.t3.md};

  ${({ isFocus }) => {
    return (
      isFocus &&
      css`
        border-bottom: 1px solid ${({ theme }) => theme.colors.primary.default};
      `
    );
  }}
`;

const EmailID = styled.input`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const EmailCenter = styled.div`
  width: 20px;
  flex-shrink: 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const EmailDomain = styled.div`
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-top: 2px;
  color: #dadada;
`;

const MailText = styled.div<{
  isActive: boolean;
}>`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray[400]};
  user-select: none;

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${({ theme }) => theme.colors.gray[900]};
    `}
`;

const MailButton = styled.div`
  display: flex;
  width: 100%;
`;

const DirectInput = styled.input`
  width: 100%;
  display: flex;
  align-items: center;
  color: #111111;
`;

const Select = styled.button``;
