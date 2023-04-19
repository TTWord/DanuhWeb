import { instance } from '@/instance';

export const memoAPI = {
  flashcard: async (bookID: number, count: string) => {
    const response = await instance.get(`/memo/${bookID}?count=${count}`);

    return response;
  },
};
