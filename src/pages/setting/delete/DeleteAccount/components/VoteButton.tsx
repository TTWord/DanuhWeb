import styled, { css } from 'styled-components';
import { useState } from 'react';
import CheckBox from '@/components/common/switch/CheckBox';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/recoil';

interface VotebuttonProps {
  onClick?: () => void;
  text: string;
}

const VoteButton = ({ onClick, text }: VotebuttonProps) => {
  const [isSelect, setIsSelect] = useState(false);
  const setIsDirectInput = useSetRecoilState(
    globalState.setting.directInputMode,
  );

  const onClickFunc = () => {
    // 버튼 체크 용
    setIsSelect(current => !current);

    // 온클릭 이벤트 넘길때만
    if (onClick) {
      onClick();
    }
    // 직접 입력모드 감지시
    if (text === '직접 입력') {
      setIsDirectInput(current => !current);
    }
  };

  return (
    <ButtonWrapper>
      <CheckBox isChecked={isSelect} onClick={onClickFunc} />
      <Text>{text}</Text>
    </ButtonWrapper>
  );
};

export default VoteButton;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  & + & {
    margin-top: 20px;
  }
`;

const Text = styled.div`
  ${({ theme }) => theme.typography.pretendard.b1.md}
`;
