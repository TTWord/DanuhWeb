import styled from 'styled-components';
import iconDownload from '@/assets/svg/icons/icon-download-2.svg';
import iconThumbsUp from '@/assets/svg/icons/icon-thumbs-up.svg';
import useNavigatePush from '@/hooks/useNavigatePush';

interface ISharingBookProps {
  book: {
    id: number;
    book_name: string;
    nickname: string;
    updated_at?: string;
    checked?: number;
    downloaded?: number;
    recommended?: number; // 다른 유저들의 추천 수
    word_count?: number;
    is_recommended?: boolean; // 본인이 해당 단어장을 추천했는지의 여부
  };

  mode: string;
}

const MyShareBookList = ({ book, mode }: ISharingBookProps) => {
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
        {/* 공유한 단어장일 때 */}
        {mode === 'share' && (
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
        )}
        {/* 공유받은 단어장일 때 */}
        {mode === 'download' && book.is_recommended && (
          <SharingInfo>
            <InfoBox>
              <IconRecommend src={iconThumbsUp} alt="recommend" />
              <Indicator>추천한 단어장</Indicator>
            </InfoBox>
          </SharingInfo>
        )}
      </BookUpdateinfo>
    </Book>
  );
};

export default MyShareBookList;

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
