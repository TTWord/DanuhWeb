import styled from 'styled-components';
import ImportInput from './ImportInput';
import ImportWordList from './ImportWordList';
import WideButton from '@/components/common/button/WideButton';
import useImportLogics from '../hooks/useImportLogics';
import { useState } from 'react';
import useToast from '@/hooks/useToast';

const ImportAddNewBook = () => {
  const toast = useToast();
  const { test } = useImportLogics();

  const [inputText, setInputText] = useState('');

  const onClick = () => {
    console.log(`inputText: ${inputText}`);
    console.log(test);
    if (inputText === '') return toast.error('단어장의 이름을 입력해주세요.');
    else return toast.success('성공');
  };

  return (
    <Container>
      <ImportInput inputText={inputText} setInputText={setInputText} />
      <ImportWordList wordList={test} />
      <WideButton onClick={onClick}>생성하기</WideButton>
    </Container>
  );
};

export default ImportAddNewBook;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 38px;
  padding: 0 24px;
  margin-bottom: 36px;
  overflow: hidden;
`;
