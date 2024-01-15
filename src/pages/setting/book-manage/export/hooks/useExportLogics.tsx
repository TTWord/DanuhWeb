import { api } from '@/api';
import { useQuery } from 'react-query';

const useExportLogics = () => {
  const { data: books } = useQuery('BookPage/GetBooks', async () => {
    const response = await api.book.getBook();

    return response.data;
  });

  // 하단 버튼용 임시 함수
  const exportBook = (type: string) => () => {
    console.log(type);

    const data = localStorage.getItem('selected');
    if (data) console.log('local data', JSON.parse(data));
  };

  return { books, exportBook };
};

export default useExportLogics;
