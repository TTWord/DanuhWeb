import { SVGProps } from '<SVG>';

const SettingSvg: React.FC<SVGProps> = props => {
  return (
    <svg
      width="33"
      height="34"
      viewBox="0 0 33 34"
      fill={props.fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.7934 12.4139C15.8701 12.3227 14.9412 12.5191 14.1338 12.9763C13.3265 13.4334 12.6802 14.1289 12.2834 14.9676C11.8866 15.8062 11.7587 16.747 11.9173 17.6611C12.0758 18.5753 12.5131 19.418 13.1691 20.0741C13.8251 20.7301 14.6679 21.1673 15.5821 21.3259C16.4962 21.4845 17.437 21.3566 18.2756 20.9598C19.1143 20.563 19.8098 19.9167 20.2669 19.1094C20.7241 18.302 20.9205 17.3731 20.8293 16.4498C20.7253 15.4148 20.2667 14.4476 19.5312 13.712C18.7956 12.9765 17.8284 12.5178 16.7934 12.4139ZM27.6285 16.8921C27.6256 17.3812 27.5897 17.8696 27.5209 18.3539L30.6998 20.8472C30.8382 20.9619 30.9315 21.122 30.963 21.299C30.9945 21.476 30.9623 21.6585 30.872 21.814L27.8648 27.0171C27.7734 27.1711 27.6307 27.2879 27.4617 27.3469C27.2926 27.406 27.1082 27.4035 26.9409 27.3398L23.7838 26.0686C23.6097 25.9993 23.4212 25.9742 23.235 25.9957C23.0489 26.0172 22.8709 26.0845 22.7172 26.1916C22.2354 26.5234 21.7291 26.8182 21.2027 27.0733C21.0372 27.1538 20.894 27.2737 20.7859 27.4226C20.6777 27.5715 20.6079 27.7447 20.5825 27.9269L20.1093 31.2942C20.0782 31.472 19.9863 31.6336 19.8494 31.7512C19.7124 31.8688 19.5389 31.9351 19.3584 31.939H13.3438C13.1663 31.9359 12.9952 31.8724 12.8585 31.7591C12.7219 31.6457 12.628 31.4892 12.5922 31.3153L12.1197 27.9529C12.0932 27.7687 12.0215 27.5938 11.9111 27.4439C11.8007 27.294 11.655 27.1737 11.4869 27.0937C10.9611 26.8399 10.4565 26.5444 9.97797 26.2099C9.82476 26.1033 9.64743 26.0365 9.46196 26.0155C9.27649 25.9945 9.08871 26.02 8.91555 26.0897L5.75922 27.3602C5.59196 27.4239 5.40758 27.4265 5.23856 27.3676C5.06955 27.3087 4.92675 27.192 4.83532 27.0382L1.82805 21.8351C1.73764 21.6796 1.70533 21.4971 1.73687 21.3201C1.76842 21.143 1.86177 20.9829 2.00032 20.8683L4.68696 18.7589C4.83415 18.642 4.94983 18.4903 5.0235 18.3174C5.09717 18.1445 5.1265 17.956 5.10883 17.7689C5.08352 17.4757 5.06805 17.1832 5.06805 16.89C5.06805 16.5968 5.08282 16.3085 5.10883 16.0216C5.12457 15.8357 5.0938 15.6487 5.0193 15.4776C4.94479 15.3065 4.82889 15.1566 4.68203 15.0415L1.9968 12.9321C1.86051 12.8168 1.76912 12.6573 1.73865 12.4814C1.70818 12.3056 1.74058 12.1246 1.83016 11.9702L4.83743 6.76709C4.92875 6.6131 5.07151 6.49629 5.24053 6.43725C5.40955 6.3782 5.59399 6.38072 5.76133 6.44436L8.91836 7.71561C9.09246 7.78492 9.28103 7.80997 9.46719 7.78849C9.65334 7.76702 9.83126 7.6997 9.985 7.59256C10.4668 7.26077 10.9731 6.96602 11.4995 6.71084C11.665 6.6304 11.8082 6.51045 11.9163 6.36158C12.0245 6.21271 12.0943 6.0395 12.1197 5.85725L12.5929 2.48998C12.624 2.31215 12.7158 2.15063 12.8528 2.03302C12.9898 1.91542 13.1633 1.84904 13.3438 1.84521H19.3584C19.5359 1.84829 19.707 1.91173 19.8437 2.0251C19.9803 2.13846 20.0742 2.29499 20.11 2.46889L20.5825 5.83123C20.609 6.0155 20.6807 6.19035 20.7911 6.34025C20.9015 6.49015 21.0472 6.61045 21.2153 6.69045C21.7411 6.94425 22.2457 7.2398 22.7242 7.57428C22.8774 7.68088 23.0548 7.74769 23.2402 7.76868C23.4257 7.78967 23.6135 7.76418 23.7866 7.69451L26.943 6.42397C27.1102 6.36027 27.2946 6.35764 27.4636 6.41655C27.6326 6.47546 27.7754 6.59213 27.8669 6.746L30.8741 11.9491C30.9646 12.1046 30.9969 12.2871 30.9653 12.4641C30.9338 12.6412 30.8404 12.8013 30.7019 12.9159L28.0152 15.0253C27.8674 15.1418 27.7511 15.2933 27.6768 15.4662C27.6025 15.6392 27.5726 15.8279 27.5898 16.0153C27.6131 16.3064 27.6285 16.5989 27.6285 16.8921Z"
        stroke={props.stroke || 'black'}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SettingSvg;
