import { instance } from '@/instance';

export const wordAPI = {
  getWord: async (book_id: string) => {
    const response = await instance.get(`/word/${book_id}`);

    return response;
  },

  addWord: async (book_id: string, word: string, mean: string) => {
    const response = await instance.post('/word', {
      book_id,
      word,
      mean,
    });

    return response;
  },

  renameWord: async (wordID: string, word: string, mean: string) => {
    const response = await instance.put(`/word/${wordID}`, {
      word,
      mean,
    });

    return response;
  },

  deleteWord: async (word_id: string) => {
    const response = await instance.delete(`/word/${word_id}`);

    return response;
  },
};
