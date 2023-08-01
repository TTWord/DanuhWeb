import styled from 'styled-components';

import iconCheckNone from '@/assets/svg/icons/icon-check-none.svg';
import iconCheckChecked from '@/assets/svg/icons/icon-check-checked.svg';

interface CheckBoxProps {
  isChecked: boolean;
  onClick: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ isChecked, onClick }) => {
  return (
    <Container onClick={onClick}>
      {isChecked ? (
        <img src={iconCheckChecked} alt="checked" />
      ) : (
        <img src={iconCheckNone} alt="none" />
      )}
    </Container>
  );
};

export default CheckBox;

const Container = styled.div`
  cursor: pointer;
`;
