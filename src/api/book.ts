import { instance } from '@/instance';

interface getBookResponse extends BackendResponse {
  data: {
    created_at: string;
    id: number;
    is_downloaded: number;
    is_shared: boolean;
    name: string;
    updated_at: string;
    user_id: number;
    share_id: number;
    comment?: string;
  }[];
}

export const bookAPI = {
  getBook: async () => {
    const { data: response } = await instance.get<getBookResponse>('/book');

    return response;
  },

  getBookById: async (bookId: number) => {
    const { data: response } = await instance.get(`/book/${bookId}`);

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

  renameBook: async (bookId: number, bookName: string) => {
    const response = await instance.put(`/book/${bookId}`, {
      name: bookName,
    });

    return response;
  },

  setBookPublic: async (bookId: number, comment: string) => {
    const response = await instance.post(`/book/share`, {
      id: bookId,
      comment,
    });

    return response;
  },

  setBookPrivate: async (bookId: number) => {
    const response = await instance.delete(`/book/share`, {
      data: {
        id: bookId,
      },
    });

    return response;
  },
};
