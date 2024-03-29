import useNavigatePush from '@/hooks/useNavigatePush';
import styled, { css } from 'styled-components';
import sampleIcon from '@/assets/svg/logos/logo-character.svg';

interface ISelectButtonProps {
  naviURL: string;
  title: string;
  type: string;
  buttonIcon: string;
  iconWidth: string;
}

const SelectButtonComponent = ({
  naviURL,
  title,
  type,
  buttonIcon,
  iconWidth,
}: ISelectButtonProps) => {
  const navigatePush = useNavigatePush();

  const onClick = () => {
    navigatePush(`/learn/option/${naviURL}`);
  };

  return (
    <SelectButton onClick={onClick}>
      <Div>
        <Tag>{title}</Tag>
        <Type>{type}</Type>
      </Div>

      <Icon sizeWidth={iconWidth} src={buttonIcon} alt="icon" />
    </SelectButton>
  );
};

export default SelectButtonComponent;

const SelectButton = styled.button`
  width: 160px;
  height: 180px;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(105, 74, 194, 0.08);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  padding: 16px 8px 8px 16px;
  padding-bottom: 24px;
  position: relative; // 아이콘 위치 조절

  transition: transform 0.3s ease-in-out;
  flex-shrink: 0;

  &:active {
    transform: scale(0.9);
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  & + & {
    margin-left: 8px;
  }
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Tag = styled.div`
  ${({ theme }) => theme.typography.pretendard.c2.rg};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const Type = styled.span`
  margin-top: 10px;
  text-transform: capitalize;
  color: #000000;
  ${({ theme }) => theme.typography.gmarketSans.md[16]};
`;

const Icon = styled.img<{
  sizeWidth: string;
}>`
  width: ${({ sizeWidth }) => sizeWidth};
  height: auto;
  position: absolute;
  bottom: 8px;
  right: 8px;

  user-select: none;
  pointer-events: none;
`;
