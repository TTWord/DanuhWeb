import ManageLayout from '../layout/ManageLayout';
import { useState } from 'react';
import ImportAddNewBook from './components/ImportAddNewBook';
import ImportLoading from './components/ImportLoading';

const ImportPage = () => {
  const [loading, setLoading] = useState(false);

  const [isAPILoading, setIsAPILoading] = useState(true);

  const delay = (time: number) =>
    new Promise<void>((resolve) => setTimeout(() => resolve(), time));

  const init = async () => {
    await delay(300);
    setLoading(true);
  };

  init();

  return (
    <ManageLayout type="import">
      {/* 실행하고 0.3초 이내에 API 반환값을 받지 못하면 출력 */}
      {loading && <ImportLoading />}

      {!loading && !isAPILoading && <ImportAddNewBook />}
    </ManageLayout>
  );
};

export default ImportPage;
