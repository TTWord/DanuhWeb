import styled, { css } from 'styled-components';
import { useState, useRef } from 'react';
import CheckBox from '@/components/common/switch/CheckBox';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/recoil';

interface VotebuttonProps {
  voteOnClick?: (text: string) => void;
  text: string;
}

const VoteButton = ({ voteOnClick, text }: VotebuttonProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isSelect, setIsSelect] = useState(false);
  const setIsDirectInput = useSetRecoilState(
    globalState.setting.directInputMode,
  );

  const onClick = () => {
    // 버튼 체크 용
    setIsSelect((current) => !current);

    const data = textRef.current?.innerText;

    // 버튼 타입에 따라 분기
    if (text === '직접 입력') {
      setIsDirectInput((current) => !current);
    } else if (voteOnClick && data) {
      voteOnClick(data);
    }
  };

  return (
    <ButtonWrapper>
      <CheckBox isChecked={isSelect} onClick={onClick} />
      <Text ref={textRef}>{text}</Text>
    </ButtonWrapper>
  );
};

export default VoteButton;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1px;

  & + & {
    margin-top: 24px;
  }
`;

const Text = styled.div`
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  margin-left: 8px;
`;
