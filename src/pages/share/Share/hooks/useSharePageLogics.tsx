import { api } from '@/api';
import { AxiosError } from 'axios';
import useToast from '@/hooks/useToast';
import { useEffect, useState } from 'react';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';
import useNavigatePush from '@/hooks/useNavigatePush';

interface ISharedBooks {
  nameFilter?: string;
  type?: string;
  order?: string;
}

const useSharePageLogics = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);
  const navigate = useNavigatePush();
  const [sharedBooks, setSharedBooks] = useState([]);
  const [sortType, setSortType] = useState('최신순');
  const [typeFilter, setTypeFilter] = useState('updated_at');

  const getSharedBooks = async ({ nameFilter, type, order }: ISharedBooks) => {
    try {
      setIsLoading(true);
      const { data: response } = await api.share.getSharedBooks({
        nameFilter,
        type,
        order,
      });
      setIsLoading(false);
      return response;
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;

      const errorMessage = err?.response?.data.message;

      switch (errorMessage) {
        default:
          toast.error('에러가 발생하였습니다.');
          break;
      }
    }
  };

  const getSharedBooksAPI = async () => {
    const { data: response } = await getSharedBooks({ type: typeFilter });

    setSharedBooks(response);
  };

  useEffect(() => {
    getSharedBooksAPI();
  }, [sortType]);

  useEffect(() => {
    setActiveMenu(2);
  }, []);

  //// Functions ////
  const goMySharingBooks = () => {
    navigate('/share/mysharing');
  };

  const goSearchPage = () => {
    navigate('/share/search');
  };

  return {
    sharedBooks,
    sortType,
    setSortType,
    setTypeFilter,
    isLoading,
    getSharedBooks,
    goMySharingBooks,
    goSearchPage,
  };
};

export default useSharePageLogics;
