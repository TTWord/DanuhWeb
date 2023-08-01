import styled from 'styled-components';

interface CheckBoxProps {
  isChecked: boolean;
  onClick: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ isChecked, onClick }) => {
  return (
    <Container onClick={onClick}>
      {isChecked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="8" fill="#6E5FED" />
          <path
            d="M15.4676 8.27257L10.2058 13.7519L8.52349 12C8.1745 11.6366 7.61074 11.6366 7.26175 12C6.91275 12.3634 6.91275 12.9505 7.26175 13.3139L9.57942 15.7274C9.92841 16.0909 10.4922 16.0909 10.8412 15.7274L16.7383 9.58649C17.0872 9.22306 17.0872 8.63599 16.7383 8.27257C16.3893 7.90914 15.8166 7.90914 15.4676 8.27257Z"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12.7305"
            cy="12"
            r="7.25"
            fill="white"
            stroke="#C5C6D0"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </Container>
  );
};

export default CheckBox;

const Container = styled.div`
  cursor: pointer;
`;