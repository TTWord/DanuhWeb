import { instance } from '@/instance';

export const bookAPI = {
  getBook: async () => {
    const response = await instance.get('/book');

    return response;
  },

  addBook: async (bookName: string) => {
    const response = await instance.post('/book', {
      name: bookName,
    });

    return response;
  },

  generateBook: async (bookName: string, text: string) => {
    const response = await instance.post('/book/generate', {
      name: bookName,
      text: text,
    });

    return response;
  },

  renameBook: async (bookID: string, bookName: string) => {
    const response = await instance.put(`/book/${bookID}`, {
      name: bookName,
    });

    return response;
  },
};
