import styled from 'styled-components';
import buttonDefault from '@/assets/svg/icons/icon-check-none.svg';
import buttonSelected from '@/assets/svg/icons/icon-check-selected.svg';
import buttonDisabled from '@/assets/svg/icons/icon-check-disabled.svg';

interface ButtonProps {
  onClick: () => void;
  isSelected?: boolean;
  isDisabled?: boolean;
}

const RadioButton: React.FC<ButtonProps> = ({
  onClick,
  isSelected,
  isDisabled,
}) => {
  if (isDisabled) {
    return (
      <Button>
        <img src={buttonDisabled} alt="disable" />
      </Button>
    );
  } else {
    return (
      <Button onClick={onClick}>
        {!isSelected && <img src={buttonDefault} alt="able" />}
        {isSelected && <img src={buttonSelected} alt="select" />}
      </Button>
    );
  }
};

export default RadioButton;

const Button = styled.button`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
