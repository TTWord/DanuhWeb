import { instance } from '@/instance';

interface MemoParams {
  bookIds: number[];
  count: number;
}

interface patchParamas {
  wordId: number;
  isMemorized: string | boolean;
}

export const memoAPI = {
  getFlashcardWords: async ({ bookIds, count }: MemoParams) => {
    const response = await instance.post(`/memo/flashcard`, {
      book_ids: bookIds.join('&'),
      count: count,
    });

    return response;
  },

  getBlindWords: async ({ bookIds, count }: MemoParams) => {
    const response = await instance.post('/memo/blind', {
      book_ids: bookIds.join('&'),
      count,
    });

    return response;
  },

  patchMemoStatus: async ({ wordId, isMemorized }: patchParamas) => {
    const { data: response } = await instance.patch(`/memo`, {
      word_id: wordId,
      is_memorized: isMemorized,
    });

    return response;
  },
};
