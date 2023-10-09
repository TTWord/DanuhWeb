import styled from 'styled-components';
import { SVGProps } from '<SVG>';

interface MemorizeToggleProps extends SVGProps {
  isMemo: boolean;
  onClick?: () => void;
}

const MemorizeToggle: React.FC<MemorizeToggleProps> = ({ isMemo, onClick }) => {
  return (
    <SVG
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10.4727 17L5.47274 12L6.88274 10.59L10.4727 14.17L17.0627 7.58L18.4727 9L10.4727 17Z"
        fill={isMemo ? '#6E5FED' : '#CAC0FF'}
      />
    </SVG>
  );
};

export default MemorizeToggle;

const SVG = styled.svg`
  cursor: pointer;
`;
