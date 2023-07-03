import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ISharingBookProps {
  bookId?: number;
  shareId: number;
  bookName: string;
  userName: string;
  updatedDate: string;
  view: number | null;
  download: number | null;
  recommand: number | null;
}

const SharingBook = ({
  shareId,
  bookName,
  userName,
  updatedDate,
  view,
  download,
  recommand,
}: ISharingBookProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/share/sharingbook/${shareId}`);
  };

  return (
    <Book onClick={onClick}>
      <BookInfo>
        <BookName>{bookName}</BookName>
        <Username>{userName}</Username>
      </BookInfo>

      <BookUpdateinfo>
        <UpdateDate>{updatedDate} 수정</UpdateDate>
        <SharingInfo>
          조회{view} 다운로드{download} 추천{recommand}
        </SharingInfo>
      </BookUpdateinfo>
    </Book>
  );
};

export default SharingBook;

const Book = styled.button`
  width: 100%;
  height: 74px;
  flex-shrink: 0;
  background: #ffffff;
  border: 1px solid #bebebe;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 12px 12px;
  //flex: 1;
  & + & {
    margin-top: 15px;
  }
`;

const BookInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;
`;

const BookName = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #6c6c6c;
`;

const Username = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #666666;
`;

const BookUpdateinfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
`;

const UpdateDate = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 10px;
  color: black;
`;

const SharingInfo = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: black;
`;
