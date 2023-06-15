import { instance } from '@/instance';

interface getMemorizeWordParams {
  bookId: number;
  count: number;
}

interface patchMemorizedStatus {
  wordId: number;
  isMemorized: string | boolean;
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

  patchMemorizedStatus: async ({
    wordId,
    isMemorized,
  }: patchMemorizedStatus) => {
    const response = await instance.patch(`/memo`, {
      word_id: wordId,
      is_memorized: isMemorized,
    });

    return response;
  },
};
