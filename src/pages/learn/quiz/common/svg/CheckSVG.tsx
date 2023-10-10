interface CheckSvgProps {
  fill?: string;
  stroke?: string;
}

const CheckSVG: React.FC<CheckSvgProps> = ({ fill, stroke }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M12.4385 2C6.91848 2 2.43848 6.48 2.43848 12C2.43848 17.52 6.91848 22 12.4385 22C17.9585 22 22.4385 17.52 22.4385 12C22.4385 6.48 17.9585 2 12.4385 2ZM10.9112 17L5.91122 12L7.32122 10.59L10.9112 14.17L17.5012 7.58L18.9112 9L10.9112 17Z"
        fill={fill || '#DDDDE4'}
      />
    </svg>
  );
};

export default CheckSVG;
