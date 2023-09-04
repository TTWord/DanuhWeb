import styled from 'styled-components';
import { useState } from 'react';
import buttonDefault from '@/assets/svg/icons/icon-check-none.svg';
import buttonSelected from '@/assets/svg/icons/icon-check-selected.svg';
import buttonDisabled from '@/assets/svg/icons/icon-check-disabled.svg';

interface ButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
}

const RadioButton: React.FC<ButtonProps> = ({ onClick, isDisabled }) => {
  const [isSelected, setIsSelected] = useState(false);

  if (isDisabled) {
    return (
      <Button>
        <img src={buttonDisabled} alt="disable" />
      </Button>
    );
  } else {
    return (
      <Button
        onClick={() => {
          setIsSelected((current) => !current);
          onClick();
        }}
      >
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
