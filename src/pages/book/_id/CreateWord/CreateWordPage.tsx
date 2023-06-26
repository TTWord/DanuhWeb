import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import arrowBackImg from '@/assets/svg/icons/icon-arrow-back-button.svg';
import Swal from 'sweetalert2';
import useAddWord from '@/pages/book/_id/CreateWord/hooks/useAddWord';
import iconBack from '@/assets/svg/icons//icon-back-gray.svg';

const CreateWordPage = () => {
  const navigate = useNavigate();
  const addWord = useAddWord();

  const bookId = Number(useParams().id);
  const [word, setWord] = useState('');
  const [mean, setMean] = useState('');

  const goBack = () => {
    navigate(`/book/${bookId}`);
  };

  return (
    <MainWrapper>
      <Header>
        <BackButton onClick={goBack}>
          <img src={iconBack} alt="back" />
        </BackButton>
        <HeaderText>단어 추가</HeaderText>
      </Header>

      <Container>
        <WordBox>
          <TextDiv>
            단어<span>word</span>
          </TextDiv>
          <Input
            type="text"
            placeholder="단어를 입력해주세요"
            onChange={e => {
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
            placeholder="뜻 입력해주세요"
            onChange={e => {
              setMean(e.target.value);
            }}
          />
        </WordBox>
      </Container>

      <Footer>
        <CreateButton
          onClick={() => {
            if (word === '' && mean === '') {
              Swal.fire({
                icon: 'warning',
                title: '미입력칸이 있습니다.',
              });
            } else {
              addWord({ bookId, word, mean });
            }
          }}
        >
          추가하기
        </CreateButton>
      </Footer>
    </MainWrapper>
  );
};

export default CreateWordPage;

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
  background-color: ${({ theme }) => theme.colors.primary[100]};
`;

//-- Header 영역 --//
const Header = styled.header`
  width: 100%;
  height: 56px;
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

const Footer = styled.footer`
  width: 100%;
  padding: 0 24px;
  padding-bottom: 48px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const CreateButton = styled.button`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary.default};
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #ffffff;
`;
