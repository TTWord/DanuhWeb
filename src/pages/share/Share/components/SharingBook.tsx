import styled from 'styled-components';
import iconEye from '@/assets/svg/icons/icon-eye.svg';
import iconDownload from '@/assets/svg/icons/icon-download-2.svg';
import iconThumbsUp from '@/assets/svg/icons/icon-thumbs-up.svg';
import useNavigatePush from '@/hooks/useNavigatePush';

interface ISharingBookProps {
  book: {
    id: number;
    book_id?: number;
    book_name: string;
    nickname: string;
    word_count: number;
    checked?: number;
    downloaded?: number;
    recommended?: number;
  };
}

const SharingBook = ({ book }: ISharingBookProps) => {
  const navigate = useNavigatePush();

  const onClick = () => {
    navigate(`/share/sharingbook/${book.id}`);
  };

  return (
    <Book onClick={onClick}>
      <BookInfo>
        <BookName>{book.book_name}</BookName>
        <Username>{book.nickname}</Username>
      </BookInfo>

      <BookUpdateinfo>
        <UpdateDate>{book.word_count}개</UpdateDate>
        <SharingInfo>
          <InfoBox>
            <IconRecommend src={iconThumbsUp} alt="recommend" />
            <Indicator>{book.recommended}회</Indicator>
          </InfoBox>
          <InfoBox>
            <IconDownload src={iconDownload} alt="download" />
            <Indicator>{book.downloaded}회</Indicator>
          </InfoBox>
        </SharingInfo>
      </BookUpdateinfo>
    </Book>
  );
};

export default SharingBook;

const Book = styled.button`
  width: 100%;
  height: 88px;
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.primary[100]};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  padding-bottom: 12px;
  flex-shrink: 0;

  & + & {
    margin-top: 8px;
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
  ${({ theme }) => theme.typography.pretendard.t3.bd};
  color: ${({ theme }) => theme.colors.primary.default};
`;

const Username = styled.span`
  ${({ theme }) => theme.typography.pretendard.c2.rg};
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const BookUpdateinfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
`;

const UpdateDate = styled.span`
  ${({ theme }) => theme.typography.pretendard.c2.rg};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const SharingInfo = styled.span`
  ${({ theme }) => theme.typography.pretendard.c2.rg};
  color: ${({ theme }) => theme.colors.gray[500]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-left: 8px;
  }
`;

const IconRecommend = styled.img``;

const IconDownload = styled.img`
  width: 20px;
`;

const Indicator = styled.span`
  margin-left: 4px;
`;
