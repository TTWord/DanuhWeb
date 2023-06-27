import { instance } from '@/instance';

export const wordAPI = {
  getWord: async (bookId: number) => {
    const response = await instance.get(`/word/${bookId}`);

    return response;
  },

  getWordById: async (wordId: number) => {
    const response = await instance.get(`/word/id/${wordId}`);

    return response;
  },

  addWord: async (bookId: number, word: string, mean: string) => {
    const response = await instance.post(`/word/${bookId}`, {
      word,
      mean,
    });

    return response;
  },

  renameWord: async (wordId: number, word: string, mean: string) => {
    const response = await instance.put(`/word/${wordId}`, {
      word,
      mean,
    });

    return response;
  },

  deleteWord: async (wordId: number) => {
    const response = await instance.delete(`/word/id/${wordId}`);

    return response;
  },

  modifyWord: async (wordId: number, word: string, mean: string) => {
    const response = await instance.put(`/word/id/${wordId}`, {
      word,
      mean,
    });

    return response;
  },
};
