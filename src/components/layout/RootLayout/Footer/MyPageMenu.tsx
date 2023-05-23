import { FooterMenuProps } from '<FooterMenu>';
import styled, { css } from 'styled-components';

const MyPageMenu: React.FC<FooterMenuProps> = ({ selected }) => {
  return (
    <MenuWrapper>
      {selected ? (
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.377 1.5C6.74935 1.5 1.37695 6.8724 1.37695 13.5C1.37695 20.1276 6.74935 25.5 13.377 25.5C20.0046 25.5 25.377 20.1276 25.377 13.5C25.377 6.8724 20.0046 1.5 13.377 1.5Z"
            fill="#694AC2"
            stroke="#694AC2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.2205 20.1754C18.6662 19.3975 16.4226 18.6992 13.3766 18.6992C10.3306 18.6992 8.08726 19.3975 6.5332 20.1754H20.2205Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.377 14.3242C14.3715 14.3242 15.3253 13.9291 16.0286 13.2259C16.7319 12.5226 17.127 11.5688 17.127 10.5742C17.127 9.57966 16.7319 8.62583 16.0286 7.92257C15.3253 7.21931 14.3715 6.82422 13.377 6.82422C12.3824 6.82422 11.4286 7.21931 10.7253 7.92257C10.022 8.62583 9.62695 9.57966 9.62695 10.5742C9.62695 11.5688 10.022 12.5226 10.7253 13.2259C11.4286 13.9291 12.3824 14.3242 13.377 14.3242Z"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          width="27"
          height="26"
          viewBox="0 0 27 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5371 1C6.90951 1 1.53711 6.3724 1.53711 13C1.53711 19.6276 6.90951 25 13.5371 25C20.1647 25 25.5371 19.6276 25.5371 13C25.5371 6.3724 20.1647 1 13.5371 1Z"
            stroke="#CBBDF3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.26147 20.408C4.26147 20.408 6.93627 16.9928 13.5363 16.9928C20.1363 16.9928 22.8123 20.408 22.8123 20.408M13.5363 12.7928C14.4911 12.7928 15.4067 12.4135 16.0819 11.7384C16.757 11.0632 17.1363 10.1476 17.1363 9.19277C17.1363 8.23799 16.757 7.32232 16.0819 6.64719C15.4067 5.97206 14.4911 5.59277 13.5363 5.59277C12.5815 5.59277 11.6658 5.97206 10.9907 6.64719C10.3156 7.32232 9.93627 8.23799 9.93627 9.19277C9.93627 10.1476 10.3156 11.0632 10.9907 11.7384C11.6658 12.4135 12.5815 12.7928 13.5363 12.7928Z"
            stroke="#CBBDF3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      <MenuName selected={selected}>마이페이지</MenuName>
    </MenuWrapper>
  );
};

export default MyPageMenu;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
`;
const MenuName = styled.span<{ selected?: boolean }>`
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
