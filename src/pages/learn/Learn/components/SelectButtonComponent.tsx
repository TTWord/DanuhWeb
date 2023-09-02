import useNavigatePush from '@/hooks/useNavigatePush';
import styled, { css } from 'styled-components';

interface ISelectButtonProps {
  naviURL: string;
  title: string;
  type: string;
  typeDetail?: string;
  lineColor?: string;
}

const SelectButtonComponent = ({
  naviURL,
  title,
  type,
  typeDetail,
  lineColor,
}: ISelectButtonProps) => {
  const navigate = useNavigatePush();

  const onClick = () => {
    if (typeDetail) {
      navigate(naviURL, {
        state: { type: `${type}/${typeDetail}` },
      });
    } else {
      navigate(naviURL, {
        state: { type: `${type}` },
      });
    }
  };

  console.log(lineColor);

  return (
    <SelectButton onClick={onClick} lineColor={lineColor}>
      <Tag>{title}</Tag>
      <Type>{type}</Type>
    </SelectButton>
  );
};

export default SelectButtonComponent;

const SelectButton = styled.button<{
  lineColor?: string;
}>`
  width: calc(50% - 4px);
  height: 93px;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(105, 74, 194, 0.08);
  border-right: 6px solid #71ccff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  color: black;
  padding: 12px 16px;
  position: relative; // 아이콘 위치 조절
  transition: transform 0.3s ease-in-out;

  ${({ theme, lineColor }) =>
    lineColor === 'purple' &&
    css`
      border-right: 6px solid ${theme.colors.primary[600]};
    `}

  &:active {
    transform: scale(0.9);
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  :nth-child(2n) {
    margin-left: 8px;
  }

  &:nth-of-type(n + 3) {
    margin-top: 8px;
  }
`;

const Tag = styled.div`
  padding: 2px 6px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray[300]};
  ${({ theme }) => theme.typography.pretendard.c2.rg};
  color: ${({ theme }) => theme.colors.white};
`;

const Type = styled.span`
  font-weight: 400;
  margin-top: 6px;
  text-transform: capitalize;
  color: #000000;
  ${({ theme }) => theme.typography.gmarketSans.md[16]};
`;
