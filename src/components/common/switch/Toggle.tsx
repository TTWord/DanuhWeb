import styled, { css } from 'styled-components';

interface ToggleProps {
  isToggle: boolean;
  onClick?: () => void;
}

const Toggle = ({ isToggle, onClick }: ToggleProps) => {
  return (
    <ToggleBox isToggle={isToggle} onClick={onClick}>
      <ToggleButton />
    </ToggleBox>
  );
};

export default Toggle;

const ToggleBox = styled.div<{ isToggle: boolean }>`
  width: 32px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.gray[300]};
  display: flex;
  align-items: center;
  transition: all 0.3s;
  padding: 2px;
  margin-right: 6px;
  cursor: pointer;

  ${({ isToggle }) => {
    return (
      isToggle &&
      css`
        padding-left: 14px;
        background-color: ${({ theme }) => theme.colors.primary.default};
      `
    );
  }}
`;

const ToggleButton = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.white};
`;
