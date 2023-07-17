import { instance } from '@/instance';

interface getMemorizeWordParams {
  bookIds: number[];
  count: number;
}

interface patchMemorizedStatus {
  wordId: number;
  isMemorized: string | boolean;
}

interface getBlindParams {
  bookIds: number[];
  count: number;
}

interface getResultParams {
  bookIds: number[];
  count: number;
  correct: number;
}

export const memoAPI = {
  getMemorizeWord: async ({ bookIds, count }: getMemorizeWordParams) => {
    const response = await instance.get(`/memo`, {
      params: {
        book_ids: bookIds.join('&'),
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

  getBlindWords: async ({ bookIds, count }: getBlindParams) => {
    const response = await instance.post('/quiz/blind', {
      book_ids: bookIds.join('&'),
      count,
      memorized_filter: false,
    });

    return response;
  },

  getResult: async ({ bookIds, count, correct }: getResultParams) => {
    const { data: response } = await instance.post('/memo', {
      book_ids: bookIds.join('&'),
      count,
      correct,
    });

    return response;
  },
};
