import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import arrowBackImg from '@/assets/svg/icons/icon-arrow-back-button.svg';
import Swal from 'sweetalert2';
import useAddWord from '@/pages/book/_id/CreateWord/hooks/useAddWord';

const CreateWordPage = () => {
  const navigate = useNavigate();
  const addWord = useAddWord();

  const bookId = Number(useParams().id);
  const [word, setWord] = useState('');
  const [mean, setMean] = useState('');

  return (
    <MainWrapper>
      <BookHeader>
        <BackButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={arrowBackImg} alt="arrowBackImg" />
        </BackButton>
        <HeaderText>단어 추가</HeaderText>
      </BookHeader>

      <Container>
        <WordBox>
          <TextDiv>단어</TextDiv>
          <Input
            type="text"
            placeholder="단어를 입력해주세요"
            onChange={e => {
              setWord(e.target.value);
            }}
          />
        </WordBox>

        <WordBox>
          <TextDiv>뜻</TextDiv>
          <Input
            type="text"
            placeholder="뜻 입력해주세요"
            onChange={e => {
              setMean(e.target.value);
            }}
          />
        </WordBox>

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
          생성
        </CreateButton>
      </Container>
    </MainWrapper>
  );
};

export default CreateWordPage;

//== 스타일 정의 ==//
//-- 전체 wrapper --//
const MainWrapper = styled.div`
  width: 100%;
  height: 844px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 39px;
`;

//-- Header 영역 --//
const BookHeader = styled.div`
  width: 100%;
  height: 76px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BackButton = styled.button`
  margin-left: 30px;
  width: 36px;
  height: 36px;
`;

const HeaderText = styled.div`
  width: 146px;
  height: 24px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: #444444;
`;

//--Container 영역--//
const Container = styled.div`
  width: 337px;
  height: 316px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const WordBox = styled.div`
  width: 100%;
  height: 89px;
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

const TextDiv = styled.div`
  height: 24px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: #444444;
`;

const Input = styled.input`
  width: 100%;
  height: 54px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 0 22px 0 22px;
  outline: none;
`;

const CreateButton = styled.button`
  width: 100%;
  height: 72px;
  background: linear-gradient(180deg, #734ae7 0%, #4c2f9c 100%);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  color: #ffffff;
`;