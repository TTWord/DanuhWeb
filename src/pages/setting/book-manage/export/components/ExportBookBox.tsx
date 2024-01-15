import CheckBox from '@/components/common/switch/CheckBox';
import { useState } from 'react';
import styled from 'styled-components';

interface BoxProps {
  bookName: string;
  id: number;
}

const ExportBookBox = ({ bookName, id }: BoxProps) => {
  const [toggle, setToggle] = useState(false);

  const check = () => {
    let selectedData: Number[];
    const data = localStorage.getItem('selected');
    if (data) {
      selectedData = JSON.parse(data);
      switch (toggle) {
        case true:
          selectedData = selectedData.filter((item) => item !== id);
          break;
        case false:
          selectedData.push(id);
          break;
        default:
          break;
      }
      // 중복 방어를 위해 set 으로 만들지 고민 중
      localStorage.setItem('selected', JSON.stringify(selectedData));
    }
    setToggle((c) => !c);
  };

  return (
    <Box>
      <CheckBox isChecked={toggle} onClick={check} />
      <span>{bookName}</span>
    </Box>
  );
};

export default ExportBookBox;

const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0px;

  span {
    margin-left: 16px;
    color: ${({ theme }) => theme.colors.gray[900]};
    font-family: ${({ theme }) => theme.fonts.pretendard};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
  }
`;
