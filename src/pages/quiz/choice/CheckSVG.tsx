interface CheckSvgProps {
  fill?: string;
  stroke?: string;
}

const CheckSVG: React.FC<CheckSvgProps> = ({ fill, stroke }) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 3.375C9.93586 3.375 3.375 9.93586 3.375 18C3.375 26.0641 9.93586 32.625 18 32.625C26.0641 32.625 32.625 26.0641 32.625 18C32.625 9.93586 26.0641 3.375 18 3.375ZM25.6113 13.0985L16.1613 24.3485C16.0577 24.472 15.9287 24.5717 15.7831 24.641C15.6375 24.7103 15.4788 24.7474 15.3176 24.75H15.2986C15.1409 24.7499 14.985 24.7167 14.841 24.6525C14.6969 24.5883 14.568 24.4946 14.4626 24.3773L10.4126 19.8773C10.3097 19.7683 10.2297 19.6397 10.1772 19.4992C10.1248 19.3588 10.1009 19.2093 10.1071 19.0595C10.1132 18.9096 10.1493 18.7626 10.2131 18.6269C10.2769 18.4912 10.3671 18.3696 10.4786 18.2694C10.59 18.1691 10.7204 18.092 10.862 18.0429C11.0037 17.9937 11.1537 17.9733 11.3033 17.9829C11.453 17.9925 11.5992 18.032 11.7333 18.0989C11.8675 18.1658 11.9869 18.2589 12.0846 18.3727L15.2691 21.9108L23.8887 11.6515C24.082 11.4279 24.3556 11.2895 24.6502 11.266C24.9448 11.2425 25.2368 11.3359 25.4631 11.526C25.6894 11.7161 25.8319 11.9876 25.8596 12.2819C25.8873 12.5761 25.7981 12.8695 25.6113 13.0985Z"
        fill={fill || 'white'}
        stroke={stroke || '#D3D3D3'}
      />
    </svg>
  );
};

export default CheckSVG;
