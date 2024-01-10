import { api } from '@/api';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

const useLearnPageLogics = () => {
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);

  useEffect(() => {
    setActiveMenu(1);
  }, []);

  const { data: haveBooks } = useQuery('LearnPage/GetBooks', async () => {
    const { data: response } = await api.book.getBook();

    return response.length;
  });

  return {
    haveBooks,
  };
};

export default useLearnPageLogics;
