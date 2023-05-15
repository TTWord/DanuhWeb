import { FooterMenuProps } from '<FooterMenu>';
import styled, { css } from 'styled-components';

const StudyMenu: React.FC<FooterMenuProps> = ({ fill, stroke, selected }) => {
  return (
    <MenuWrapper>
      <svg
        width="26"
        height="29"
        viewBox="0 0 26 28"
        fill={fill || 'none'}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.15208 1.52513C9.80846 0.868749 10.6987 0.5 11.627 0.5C12.5552 0.5 13.4454 0.868749 14.1018 1.52513C14.7582 2.1815 15.127 3.07174 15.127 4V4.25H19.627C20.0911 4.25 20.5362 4.43438 20.8644 4.76256C21.1926 5.09075 21.377 5.53587 21.377 6V10.5H21.627C22.5552 10.5 23.4454 10.8687 24.1018 11.5251C24.7582 12.1815 25.127 13.0717 25.127 14C25.127 14.9283 24.7582 15.8185 24.1018 16.4749C23.4454 17.1313 22.5552 17.5 21.627 17.5H21.377V22C21.377 22.4641 21.1926 22.9092 20.8644 23.2374C20.5362 23.5656 20.0911 23.75 19.627 23.75H15.127V24C15.127 24.9283 14.7582 25.8185 14.1018 26.4749C13.4455 27.1313 12.5552 27.5 11.627 27.5C10.6987 27.5 9.80846 27.1312 9.15208 26.4749C8.4957 25.8185 8.12695 24.9283 8.12695 24V23.75H2.37695C1.91283 23.75 1.46771 23.5656 1.13952 23.2374C0.811325 22.9092 0.626953 22.4641 0.626953 22V16.5C0.626953 15.9477 1.07467 15.5 1.62695 15.5H2.87695C3.27478 15.5 3.65631 15.342 3.93761 15.0607C4.21892 14.7794 4.37695 14.3978 4.37695 14C4.37695 13.6022 4.21892 13.2206 3.93761 12.9393C3.65631 12.658 3.27478 12.5 2.87695 12.5H1.62695C1.07467 12.5 0.626953 12.0523 0.626953 11.5V6C0.626953 5.53587 0.811328 5.09075 1.13952 4.76256C1.4677 4.43438 1.91282 4.25 2.37695 4.25H8.12695V4C8.12695 3.07174 8.4957 2.1815 9.15208 1.52513Z"
          stroke={stroke || 'none'}
          strokeWidth={selected ? '1' : ' 2'}
        />
      </svg>

      <MenuName selected={selected}>학습</MenuName>
    </MenuWrapper>
  );
};

export default StudyMenu;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MenuName = styled.div<{ selected?: boolean }>`
  margin-top: 10px;
  font-size: 12px;
  line-height: 132%;
  color: #cbbdf3;
  font-weight: normal;

  ${({ selected }) =>
    selected &&
    css`
      color: #694ac2;
      font-weight: bold;
    `}
`;
