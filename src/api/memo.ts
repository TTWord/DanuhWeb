import { instance } from '@/instance';

interface getMemorizeWordParams {
  bookId: number;
  count: number;
}

export const memoAPI = {
  getMemorizeWord: async ({ bookId, count }: getMemorizeWordParams) => {
    const response = await instance.get(`/memo`, {
      params: {
        book_ids: bookId,
        count: count,
      },
    });

    return response;
  },
};
