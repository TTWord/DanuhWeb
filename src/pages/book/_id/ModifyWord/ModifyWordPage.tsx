import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import useToast from '@/hooks/useToast';
import iconBack from '@/assets/svg/icons//icon-back-gray.svg';
import { api } from '@/api';
import FooterButton from '@/components/common/button/FooterButton';

const ModifyWordPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const wordId = Number(useParams().id);
  const [word, setWord] = useState('단어를 입력해주세요');
  const [mean, setMean] = useState('뜻을 입력해주세요');
  const [bookId, setBookId] = useState(0);

  const goBack = () => {
    navigate(`/book/${bookId}`);
  };

  const getWordData = async () => {
    try {
      const { data: response } = await api.word.getWordById(wordId);

      setBookId(response.data.book_id);
      setWord(response.data.word);
      setMean(response.data.mean);
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const modifyWord = async (word: string, mean: string) => {
    try {
      const { data: response } = await api.word.modifyWord(wordId, word, mean);

      navigate(`/book/${bookId}`);
    } catch (e: unknown) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWordData();
  }, []);

  return (
    <MainWrapper>
      <Header>
        <BackButton onClick={goBack}>
          <img src={iconBack} alt="back" />
        </BackButton>
        <HeaderText>단어 수정</HeaderText>
      </Header>

      <Container>
        <WordBox>
          <TextDiv>
            단어<span>word</span>
          </TextDiv>
          <Input
            type="text"
            placeholder={word}
            onChange={(e) => {
              setWord(e.target.value);
            }}
          />
        </WordBox>

        <WordBox>
          <TextDiv>
            뜻 <span>meaning</span>
          </TextDiv>
          <Input
            type="text"
            placeholder={mean}
            onChange={(e) => {
              setMean(e.target.value);
            }}
          />
        </WordBox>
      </Container>

      <FooterButton
        onClick={() => {
          if (word === '' && mean === '') {
            toast.error('미입력칸이 있습니다.');
          } else {
            modifyWord(word, mean);
          }
        }}
      >
        수정하기
      </FooterButton>
    </MainWrapper>
  );
};

export default ModifyWordPage;

//== 스타일 정의 ==//
//-- 전체 wrapper --//
const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.pretendard};
  line-height: 140%;
  //background-color: ${({ theme }) => theme.colors.primary[100]};
`;

//-- Header 영역 --//
const Header = styled.header`
  width: 100%;
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  width: 24px;
  height: 24px;
  margin: 0 16px;
`;

const HeaderText = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

//--Container 영역--//
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 24px;
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

const WordBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 32px;
  }
`;

const TextDiv = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: 16px;
  span {
    margin-left: 8px;
    color: ${({ theme }) => theme.colors.gray[500]};
    font-weight: 500;
    font-size: 14px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 10px 0;
  font-size: 14px;
  font-weight: 500;
  outline: none;
  border-bottom: 1px solid #e7e7e7;
  background: #fff;

  ::placeholder {
    color: #dadada;
  }
`;
