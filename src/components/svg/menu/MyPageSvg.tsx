import { SVGProps } from '<SVG>';
import styled from 'styled-components';

const MyPageSvg: React.FC<SVGProps> = ({ fill, stroke }) => {
  return (
    <MenuWrapper>
      <svg
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill={fill || 'none'}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.3194 3.19971C8.95542 3.19971 2.98608 9.16904 2.98608 16.533C2.98608 23.897 8.95542 29.8664 16.3194 29.8664C23.6834 29.8664 29.6528 23.897 29.6528 16.533C29.6528 9.16904 23.6834 3.19971 16.3194 3.19971Z"
          stroke={stroke || '#E6E4E2'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.01416 24.9945C6.01416 24.9945 8.98616 21.1999 16.3195 21.1999C23.6528 21.1999 26.6262 24.9945 26.6262 24.9945M16.3195 16.5332C17.3804 16.5332 18.3978 16.1118 19.1479 15.3616C19.8981 14.6115 20.3195 13.5941 20.3195 12.5332C20.3195 11.4723 19.8981 10.4549 19.1479 9.70478C18.3978 8.95463 17.3804 8.5332 16.3195 8.5332C15.2586 8.5332 14.2412 8.95463 13.4911 9.70478C12.7409 10.4549 12.3195 11.4723 12.3195 12.5332C12.3195 13.5941 12.7409 14.6115 13.4911 15.3616C14.2412 16.1118 15.2586 16.5332 16.3195 16.5332Z"
          stroke={stroke || '#E6E4E2'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <MenuName color={stroke}>마이페이지</MenuName>
    </MenuWrapper>
  );
};

export default MyPageSvg;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MenuName = styled.div`
  margin-top: 10px;
  font-size: 12px;
  line-height: 132%;
  color: ${props => props.color || '#E6E4E2'};
`;
