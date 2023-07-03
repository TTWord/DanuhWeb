import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import useGetSharedBookById from './hooks/useGetSharedBookById';
import { useEffect, useState } from 'react';
import iconBack from '@/assets/svg/icons/icon-back-gray.svg';
import useDownloadSharedBook from './hooks/useDownloadSharedBook';

const ShareBookDetPage = () => {
  const shareId: number = Number(useParams().id);
  const navigate = useNavigate();

  const [bookName, setBookName] = useState('단어장1');
  const [words, setWords] = useState([]);
  const [comment, setComment] = useState('');
  const [userId, setUserId] = useState(1);

  const getSharedBookByIdAPI = useGetSharedBookById();
  const downloadSharedBookAPI = useDownloadSharedBook();

  const getSharedBookById = async () => {
    const { data: response } = await getSharedBookByIdAPI(shareId);

    //setBookName();
    setWords(response.words);
    setComment(response.comment);
  };

  useEffect(() => {
    getSharedBookById();
  }, []);

  const goBack = () => {
    navigate('/share');
  };

  const donwloadSharedBook = async () => {
    const response = await downloadSharedBookAPI(shareId);
  };

  const goUserProfile = () => {
    navigate(`/user/${userId}`);
  };

  interface IShareWord {
    word: string;
    mean: string;
  }

  const SharedWord = ({ word, mean }: IShareWord) => {
    return (
      <WordBox>
        <Word>{word}</Word>
        <Mean>{mean}</Mean>
      </WordBox>
    );
  };

  return (
    <MainWrapper>
      <Header>
        <img onClick={goBack} src={iconBack} alt="back" />
        <div>{bookName}</div>
      </Header>

      <Container>
        <BookContent>
          <ContentHeader>
            <BookCreator onClick={goUserProfile}>
              <ProFile />
              <Name>이름</Name>
            </BookCreator>
            <DownloadButton onClick={donwloadSharedBook}>
              다운로드
            </DownloadButton>
          </ContentHeader>

          <BookShareInfo>
            조회 {100} 다운 {100} 추천 {100}
          </BookShareInfo>

          <BookComment>{comment}</BookComment>
        </BookContent>

        <WordWrapper>
          {words.map((words: any) => (
            <SharedWord key={words.id} word={words.word} mean={words.mean} />
          ))}
        </WordWrapper>
      </Container>
    </MainWrapper>
  );
};
export default ShareBookDetPage;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    position: absolute;
    left: 16px;

    :hover {
      cursor: pointer;
    }
  }

  div {
    font-weight: 700;
    font-size: 30px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding: 24px 16px;
`;

const BookContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BookCreator = styled.button`
  display: flex;
`;

const ProFile = styled.div`
  width: 50px;
  height: 50px;
  background-color: gray;
`;

const Name = styled.div`
  font-size: 20px;
  margin-left: 8px;
`;

const DownloadButton = styled.button`
  height: 60%;
  padding: 4px;
  background-color: gray;
  color: white;
  font-size: 16px;
  line-height: 16px;
`;

const BookShareInfo = styled.div`
  margin-top: 24px;
  margin-bottom: 12px;
`;

const BookComment = styled.div`
  width: 100%;
  height: 140px;
  padding: 24px;
  font-size: 20px;
  border: 1px solid gray;
`;

const WordWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px 0;
  padding-bottom: 48px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const WordBox = styled.div`
  width: 100%;
  height: 72px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 12px;
  border: 1px solid gray;
  box-sizing: border-box;

  & + & {
    margin-top: 8px;
  }
`;

const Word = styled.div`
  font-size: 16px;
  line-height: 16px;
`;

const Mean = styled.div`
  font-size: 16px;
  line-height: 16px;
`;
