import { instance } from '@/instance';

export const wordAPI = {
  getWord: async (book_id: string) => {
    const response = await instance.get(`word?book_id=${book_id}`);

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

  modifyWord: async (word_id: string, word: string, mean: string) => {
    const response = await instance.put(`/word/${word_id}`, {
      word,
      mean,
    });

    return response;
  },

  deleteWord: async (word_id: string) => {
    const response = await instance.post(`/word${word_id}`);

    return response;
  },
};
