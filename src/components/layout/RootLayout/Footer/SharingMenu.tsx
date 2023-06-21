import { FooterMenuProps } from '<FooterMenu>';
import styled, { css } from 'styled-components';

const SharingMenu: React.FC<FooterMenuProps> = ({ fill, stroke, selected }) => {
  return (
    <MenuWrapper>
      <svg
        width="25"
        height="28"
        viewBox="0 0 25 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.0625 9.07812C22.1336 9.07812 23.8125 7.39919 23.8125 5.32812C23.8125 3.25706 22.1336 1.57812 20.0625 1.57812C17.9914 1.57812 16.3125 3.25706 16.3125 5.32812C16.3125 7.39919 17.9914 9.07812 20.0625 9.07812Z"
          fill={fill || '#ffffff'}
        />
        <path
          d="M5.0625 17.8281C7.13357 17.8281 8.8125 16.1492 8.8125 14.0781C8.8125 12.0071 7.13357 10.3281 5.0625 10.3281C2.99143 10.3281 1.3125 12.0071 1.3125 14.0781C1.3125 16.1492 2.99143 17.8281 5.0625 17.8281Z"
          fill={fill || '#ffffff'}
        />
        <path
          d="M20.0625 26.5781C22.1336 26.5781 23.8125 24.8992 23.8125 22.8281C23.8125 20.7571 22.1336 19.0781 20.0625 19.0781C17.9914 19.0781 16.3125 20.7571 16.3125 22.8281C16.3125 24.8992 17.9914 26.5781 20.0625 26.5781Z"
          fill={fill || '#ffffff'}
        />
        <path //E3DBFB
          d="M8.3 15.9656L16.8375 20.9406M16.825 7.21563L8.3 12.1906M23.8125 5.32812C23.8125 7.39919 22.1336 9.07812 20.0625 9.07812C17.9914 9.07812 16.3125 7.39919 16.3125 5.32812C16.3125 3.25706 17.9914 1.57812 20.0625 1.57812C22.1336 1.57812 23.8125 3.25706 23.8125 5.32812ZM8.8125 14.0781C8.8125 16.1492 7.13357 17.8281 5.0625 17.8281C2.99143 17.8281 1.3125 16.1492 1.3125 14.0781C1.3125 12.0071 2.99143 10.3281 5.0625 10.3281C7.13357 10.3281 8.8125 12.0071 8.8125 14.0781ZM23.8125 22.8281C23.8125 24.8992 22.1336 26.5781 20.0625 26.5781C17.9914 26.5781 16.3125 24.8992 16.3125 22.8281C16.3125 20.7571 17.9914 19.0781 20.0625 19.0781C22.1336 19.0781 23.8125 20.7571 23.8125 22.8281Z"
          stroke={stroke || '#E3DBFB'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <MenuName selected={selected}>공유</MenuName>
    </MenuWrapper>
  );
};

export default SharingMenu;

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
