import { api } from '@/api';
import { useState } from 'react';
import styled from 'styled-components';

interface AlertBookBoxProps {
  name: string;
  share_id: number;
}

const AlertBookBox = ({ name, share_id }: AlertBookBoxProps) => {
  const [isRecommended, setIsRecommended] = useState(false);

  const recommendBook = async () => {
    try {
      const { data: response } = await api.share.recommendBook(share_id);

      const status = response.recommend;
      console.log(status);

      if (status === 1) {
        setIsRecommended(true);
      } else if (status === -1) {
        setIsRecommended(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BookBox>
      <div>{name}</div>

      <svg
        onClick={recommendBook}
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
      >
        <path
          d="M7.41341 22.1406L7.41968 11.1407M2.41853 13.143L2.41454 20.143C2.41391 21.2476 3.30883 22.1426 4.4134 22.1421L17.8397 22.1357C19.3204 22.135 20.5803 21.0541 20.8063 19.5905L21.8872 12.59C22.1678 10.7726 20.7627 9.13436 18.924 9.13523L15.4208 9.13689C14.8686 9.13715 14.4211 8.68965 14.4214 8.13736L14.4234 4.60321C14.4242 3.24137 13.3208 2.13791 11.959 2.13855C11.6342 2.1387 11.3397 2.33014 11.2076 2.62703L7.68396 10.5467C7.52325 10.9079 7.165 11.1408 6.76981 11.141L4.41968 11.1421C3.3151 11.1426 2.41916 12.0385 2.41853 13.143Z"
          stroke={isRecommended ? '#46D8EC' : '#DDDDE4'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </BookBox>
  );
};

export default AlertBookBox;

const BookBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.typography.pretendard.t4.md};
  color: ${({ theme }) => theme.colors.gray[900]};

  & + & {
    margin-top: 24px;
  }
`;
