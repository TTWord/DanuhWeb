import Snd from 'snd-lib';
import styled, { css, keyframes } from 'styled-components';
import SelectPop from '../share/components/SelectPop';
import { useState } from 'react';
import useToast from '@/hooks/useToast';

const snd = new Snd();

snd.load(Snd.KITS.SND01);

const Test = () => {
  const [mode, setMode] = useState('1'); // 화면 출력 단어장 리스트 선택
  const [sortType, setSortType] = useState('최신순'); // 정렬 필터
  const [isToggle, setIsToggle] = useState(false); // 정렬 팝업 속 토글

  const toast = useToast();

  const selectList1 = [
    { text: '최신순', onClick: () => setSortType('최신순') },
    {
      text: '오래된순',
      onClick: () => setSortType('오래된순'),
    },
  ];

  const selectList2 = [
    { text: '최신순', onClick: () => setSortType('최신순') },
    {
      text: '오래된순',
      onClick: () => setSortType('오래된순'),
    },
    {
      text: '추천한 단어장만 보기',
      onClick: () => setMode('download'),
      hasToggle: true,
    },
  ];

  const selectList3 = [
    { text: '최신순', onClick: () => setSortType('최신순') },
    {
      text: '오래된순',
      onClick: () => setSortType('오래된순'),
    },
    {
      text: '테스트',
      onClick: () => setSortType('테스트'),
    },
    {
      text: '추천한 단어장만 보기',
      onClick: () => setMode('download'),
      hasToggle: true,
    },
  ];

  return (
    <Container>
      <SelectPop
        selectList={selectList1}
        sortType={sortType}
        isToggle={isToggle}
        onToggle={() => {
          setIsToggle((current) => !current);
        }}
      />

      <Line />

      <SelectPop
        selectList={selectList2}
        sortType={sortType}
        isToggle={isToggle}
        onToggle={() => {
          setIsToggle((current) => !current);
        }}
      />

      <Line />

      <SelectPop
        selectList={selectList3}
        sortType={sortType}
        isToggle={isToggle}
        onToggle={() => {
          setIsToggle((current) => !current);
        }}
      />

      <Line />

      <button
        onClick={() => {
          //console.log(sortType, mode);
          toast.warning('퀴즈 틀렸지롱');
        }}
      >
        Test
      </button>
    </Container>
  );
};

export default Test;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: gray;
`;
