import { instance } from '@/instance';

interface getMemorizeWordParams {
  bookId: number;
  count: number;
}

interface patchMemorizedStatus {
  wordId: number;
  isMemorized: string | boolean;
}

interface getBlindParams {
  bookIds: string;
  count: number;
  memorizedFilter: boolean;
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

  getBlindWords: async ({
    bookIds,
    count,
    memorizedFilter,
  }: getBlindParams) => {
    const response = await instance.post('/quiz/blind', {
      book_ids: bookIds,
      count,
      memorized_filter: memorizedFilter,
    });

    return response;
  },
};
