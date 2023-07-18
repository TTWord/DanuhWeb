import React, { useState } from 'react';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';
import arrowBackImg from '@/assets/svg/icons/icon-arrow-back-button.svg';
import useGenerateBook from '@/pages/book/generate/GenerateBook/hooks/useGenerateBook';
import iconBack from '@/assets/svg/icons//icon-back-gray.svg';
import useNavigatePop from '@/hooks/useNavigatePop';

const GenerateBookPage = () => {
  const navigatePop = useNavigatePop();
  const { isLoading, generateBook } = useGenerateBook();
  const [textLength, setTextLength] = useState(0);
  const [bookName, setBookName] = useState('');
  const [sentense, setSentense] = useState('');

  const goBack = () => {
    navigatePop('/book');
  };

  return (
    <MainWrapper>
      <Header>
        <BackButton onClick={goBack}>
          <img src={iconBack} alt="arrowBackImg" />
        </BackButton>
        <HeaderText>단어장 생성기</HeaderText>
      </Header>

      <Content>
        <BookNameWrapper>
          <BookNameTitle>단어장 이름은</BookNameTitle>

          <BookNaming
            type="text"
            placeholder="단어장 이름을 입력해주세요"
            onChange={e => {
              setBookName(e.target.value);
            }}
          />
        </BookNameWrapper>

        <GenerateWrapper>
          <GuideLangWrapper>
            <LangDiv>영어</LangDiv>
            <GuideArrow src={arrowBackImg} alt="arrowBackImg180" />
            <LangDiv>한국어</LangDiv>
          </GuideLangWrapper>
          <GuideText>
            현재 단어장 생성기는 영어 to 한국어만 지원합니다.
          </GuideText>

          <SentenceInputWrapper>
            <SentenceInput
              onChange={e => {
                setSentense(e.target.value);
                setTextLength(e.target.value.length);
              }}
              placeholder="영어 문장을 입력해주세요"
              cols={100}
            />
            <CountInput>{textLength}/2000</CountInput>
          </SentenceInputWrapper>
        </GenerateWrapper>
      </Content>

      <Footer>
        <GenerateButton
          onClick={() => {
            if (!isLoading) {
              generateBook({ bookName, sentense });
            }
          }}
        >
          {!isLoading && '생성하기'}
          {isLoading && (
            <TailSpin
              height="30"
              width="30"
              radius="1"
              color="#ffffff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          )}
        </GenerateButton>
      </Footer>
    </MainWrapper>
  );
};
/*
글자수 2000자 넘길 경우 더 이상 입력못하게 or 문장이 잘리게 해야함 or 문장 길다고 경고하며 input 거부
*/

export default GenerateBookPage;

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

//-- 단어장 이름 영역 --//

const Content = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 24px;
  padding-top: 40px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const BookNameWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

const BookNameTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 140%;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: 24px;
`;

const BookNaming = styled.input`
  width: 100%;
  height: 42px;
  padding: 10px 0;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  border-bottom: 1px solid #e7e7e7;
  background: #fff;

  ::placeholder {
    color: #dadada;
  }
`;

//-- 단어장 생성기 영역 --//
const GenerateWrapper = styled.div`
  width: 100%;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`;

const GuideLangWrapper = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
`;

const LangDiv = styled.div`
  height: 100%;
  background: #ffffff;
  padding: 8px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  font-size: 20px;
  font-weight: 600;
  line-height: 140%;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const GuideArrow = styled.img`
  transform: rotate(180deg);
  margin: 0 8px;
`;

const GuideText = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: 16px 0;
`;

const SentenceInputWrapper = styled.div`
  width: 100%;
  height: 230px;
  padding: 16px 16px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SentenceInput = styled.textarea`
  width: 100%;
  height: 100%;
  font-weight: 500;
  font-size: 14px;
  resize: none;
  outline: none;
  ::placeholder {
    color: #dadada;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CountInput = styled.div`
  width: 100%;
  height: 18px;
  font-size: 13px;
  font-weight: 500;
  text-align: right;
`;

//-- 생성하기 버튼 영역 --//
const Footer = styled.footer`
  width: 100%;
  padding: 0 24px;
  padding-bottom: 24px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const GenerateButton = styled.button`
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
