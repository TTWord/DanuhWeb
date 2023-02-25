import { SVGProps } from '<SVG>';

const ListSvg: React.FC<SVGProps> = ({ fill, stroke }) => {
  return (
    <svg
      width="31"
      height="22"
      viewBox="0 0 31 22"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.6012 3.01709H28.8512M8.6012 10.8921H28.8512M8.6012 18.7671H28.8512"
        stroke={stroke || 'black'}
        strokeWidth="3.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.9762 4.14209C3.59752 4.14209 4.1012 3.63841 4.1012 3.01709C4.1012 2.39577 3.59752 1.89209 2.9762 1.89209C2.35488 1.89209 1.8512 2.39577 1.8512 3.01709C1.8512 3.63841 2.35488 4.14209 2.9762 4.14209Z"
        stroke={stroke || 'black'}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.9762 12.0171C3.59752 12.0171 4.1012 11.5134 4.1012 10.8921C4.1012 10.2708 3.59752 9.76709 2.9762 9.76709C2.35488 9.76709 1.8512 10.2708 1.8512 10.8921C1.8512 11.5134 2.35488 12.0171 2.9762 12.0171Z"
        stroke={stroke || 'black'}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.9762 19.8921C3.59752 19.8921 4.1012 19.3884 4.1012 18.7671C4.1012 18.1458 3.59752 17.6421 2.9762 17.6421C2.35488 17.6421 1.8512 18.1458 1.8512 18.7671C1.8512 19.3884 2.35488 19.8921 2.9762 19.8921Z"
        stroke={stroke || 'black'}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ListSvg;
