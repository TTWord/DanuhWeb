import React, { useState } from 'react';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';
import arrowBackImg from './svg/icon-arrow-secondary.svg';
import useGenerateBook from '@/pages/book/generate/GenerateBook/hooks/useGenerateBook';
import TopBar from '@/components/common/header/TopBar';
import WideButton from '@/components/common/button/WideButton';
import Input from '@/components/common/input/Input';
import TextField from '@/components/common/input/TextField';

const GenerateBookPage = () => {
  const { isLoading, generateBook } = useGenerateBook();
  const [bookName, setBookName] = useState('');
  const [sentense, setSentense] = useState('');

  return (
    <MainWrapper>
      <TopBar type={'default'} navigate={'/book'} title={'단어장 생성기'} />

      <Content>
        <BookNameWrapper>
          <BookNameTitle>단어장 이름은</BookNameTitle>
          <Input
            type={'fit'}
            placeholder={'단어장 이름을 입력해주세요'}
            value={bookName}
            onChange={setBookName}
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
        </GenerateWrapper>
        <TextField
          placeholder={'영어 문장을 입력해주세요'}
          value={sentense}
          onChange={setSentense}
          cols={100}
        />
      </Content>

      <Footer>
        <WideButton
          isActive={false}
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
        </WideButton>
      </Footer>
    </MainWrapper>
  );
};
/*
글자수 2000자 넘길 경우 더 이상 입력못하게 or 문장이 잘리게 해야함 or 문장 길다고 경고하며 input 거부
*/

export default GenerateBookPage;

//-- 전체 wrapper --//
const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.pretendard};
  line-height: 140%;
  background-color: ${({ theme }) => theme.colors.primary[100]};
`;

//-- 단어장 이름 영역 --//
const Content = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px 16px 24px;
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
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: 24px;
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
  padding: 8px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-size: 20px;
  font-weight: 600;
  line-height: 140%;
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const GuideArrow = styled.img`
  margin: 0 8px;
`;

const GuideText = styled.div`
  font-family: ${({ theme }) => theme.fonts.pretendard};
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: 16px 0;
`;

//-- 생성하기 버튼 영역 --//
const Footer = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;
