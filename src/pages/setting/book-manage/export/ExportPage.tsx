import styled from 'styled-components';
import ManageLayout from '../layout/ManageLayout';
import WideButton from '@/components/common/button/WideButton';
import ExportBookList from './components/ExportBookList';
import useExportLogics from './hooks/useExportLogics';
import ExportOptionPop from './components/ExportOptionPop';
import { useState } from 'react';

const ExportPage = () => {
  const { books } = useExportLogics();

  const [isPopOpen, setIsPopOpen] = useState(false);

  // 기존 데이터 제거
  localStorage.removeItem('selected');
  localStorage.setItem('selected', JSON.stringify([]));

  return (
    <ManageLayout type="export">
      <ExportOptionPop isOpen={isPopOpen} close={() => setIsPopOpen(false)} />
      <Container>
        <ExportBookList books={books} />
        <WideButton onClick={() => setIsPopOpen(true)}>내보내기</WideButton>
      </Container>
    </ManageLayout>
  );
};

export default ExportPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-top: 38px;
  margin-bottom: 36px;
  overflow-y: hidden;
`;
