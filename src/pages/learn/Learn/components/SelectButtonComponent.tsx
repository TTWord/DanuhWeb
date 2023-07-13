import useNavigatePush from '@/hooks/useNavigatePush';
import styled from 'styled-components';

interface ISelectButtonProps {
  naviURL: string;
  title: string;
  type: string;
  icon: string;
  typeDetail?: string;
}

const SelectButtonComponent = ({
  naviURL,
  title,
  type,
  icon,
  typeDetail,
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

  return (
    <SelectButton onClick={onClick}>
      {title}
      <Type>{type}</Type>
      <Icon src={icon} alt={type} />
    </SelectButton>
  );
};

export default SelectButtonComponent;

const SelectButton = styled.button`
  width: calc(50% - 4px);
  height: 170px;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #f1ecff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.gmarketSans};
  font-weight: 300;
  font-size: 15px;
  line-height: 15px;
  color: black;
  padding: 25px 0px 0px 18px;
  margin-bottom: 8px;
  position: relative; // 아이콘 위치 조절

  :nth-child(2n) {
    margin-left: 8px;
  }
`;

const Type = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: #8f6cf3;
  margin-top: 14px;
  text-transform: capitalize;
`;

const Icon = styled.img`
  position: absolute;
  right: 15px;
  bottom: 11px;
`;
