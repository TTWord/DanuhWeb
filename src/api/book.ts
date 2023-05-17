import { instance } from '@/instance';

interface getBookResponse extends BackendResponse {
  data: {
    id: number;
    name: string;
    user_id: number;
    created_at: string;
    updated_at: string;
  }[];
}

export const bookAPI = {
  getBook: async () => {
    const { data: response } = await instance.get<getBookResponse>('/book');

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
