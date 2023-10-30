import styled, { css } from 'styled-components';

interface ToggleProps {
  type?: 'default' | 'quiz';
  isToggle: boolean;
  onClick?: () => void;
}

const Toggle = ({ type = 'default', isToggle, onClick }: ToggleProps) => {
  return (
    <ToggleBox isToggle={isToggle} onClick={onClick}>
      <ToggleButton>
        {type === 'quiz' && (
          <svg
            width="13"
            height="10"
            viewBox="0 0 13 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector"
              d="M10.7617 0.527094L4.44757 7.10228L2.42877 5.00001C2.00998 4.5639 1.33347 4.5639 0.91468 5.00001C0.495888 5.43612 0.495888 6.14061 0.91468 6.57671L3.69589 9.47293C4.11468 9.90904 4.79119 9.90904 5.20998 9.47293L12.2865 2.1038C12.7053 1.66769 12.7053 0.963204 12.2865 0.527094C11.8677 0.0909849 11.1805 0.0909849 10.7617 0.527094Z"
              fill="#6E5FED"
            />
          </svg>
        )}
      </ToggleButton>
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
  justify-content: start;
  align-items: center;
  transition: all 0.2s;
  padding: 2px;
  cursor: pointer;

  svg {
    path {
      fill: ${({ theme }) => theme.colors.gray[300]};
    }
  }

  ${({ isToggle }) => {
    return (
      isToggle &&
      css`
        padding-left: 14px;
        background-color: ${({ theme }) => theme.colors.primary.default};

        svg {
          path {
            fill: ${({ theme }) => theme.colors.primary.default};
          }
        }
      `
    );
  }}
`;

const ToggleButton = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.white};
`;
