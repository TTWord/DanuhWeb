import { api } from '@/api';
import useNavigatePush from '@/hooks/useNavigatePush';
import { instance } from '@/instance';
import { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

const useBookPageLogic = () => {
  const queryClient = useQueryClient();
  const { data: books } = useQuery(
    'BookPage/GetBooks',
    async () => {
      const response = await api.book.getBook();

      if (response.status === 'OK') {
        return response.data;
      } else {
        return [];
      }
    },
    {
      initialData: [],
    },
  );
  const navigatePush = useNavigatePush();

  const onClickUpdate = useCallback(async (bookId: number) => {
    navigatePush(`/book/${bookId}/change`);
  }, []);

  const onClickRemove = useCallback(async (bookId: number) => {
    const { data: response } = await instance.delete(`/book/${bookId}`);

    if (response.status === 'OK') {
      queryClient.invalidateQueries('BookPage/GetBooks');
    }
  }, []);

  const onItemClick = useCallback((bookId: number) => {
    navigatePush(`/book/${bookId}`);
  }, []);

  return {
    books,
    onItemClick,
    onClickUpdate,
    onClickRemove,
  };
};

export default useBookPageLogic;
