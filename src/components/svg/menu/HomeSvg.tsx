import { SVGProps } from '<SVG>';
import styled from 'styled-components';

const HomeSvg: React.FC<SVGProps> = ({ fill, stroke }) => {
  return (
    <MenuWrapper>
      <svg
        width="27"
        height="26"
        viewBox="0 0 27 26"
        fill={fill || 'none'}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.31946 19.1998H17.3195M19.9861 24.5331H6.65279C5.2383 24.5331 3.88175 23.9712 2.88155 22.971C1.88136 21.9708 1.31946 20.6143 1.31946 19.1998V10.8105C1.31944 9.89341 1.55588 8.99185 2.00595 8.19285C2.45602 7.39384 3.10451 6.72438 3.88879 6.24912L10.5555 2.20912C11.3889 1.70405 12.3449 1.43701 13.3195 1.43701C14.294 1.43701 15.25 1.70405 16.0835 2.20912L22.7501 6.24912C23.5342 6.72426 24.1826 7.39351 24.6326 8.19226C25.0827 8.99102 25.3192 9.8923 25.3195 10.8091V19.1998C25.3195 20.6143 24.7576 21.9708 23.7574 22.971C22.7572 23.9712 21.4006 24.5331 19.9861 24.5331Z"
          stroke={stroke || '#E6E4E2'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <MenuName color={stroke}>홈</MenuName>
    </MenuWrapper>
  );
};

export default HomeSvg;

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
