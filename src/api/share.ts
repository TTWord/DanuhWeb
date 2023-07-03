import { instance } from '@/instance';

interface ISharedBooks {
  nameFilter?: string;
  type?: string;
  order?: string;
  id?: number;
}

export const shareAPI = {
  getSharedBooks: async (nameFilter: string) => {
    const response = await instance.get(`/share`, {
      params: {
        name: nameFilter,
      },
    });

    return response;
  },

  getSharedBookById: async (id: number) => {
    const response = await instance.get(`/share/${id}`);

    return response;
  },

  getSharedBookByType: async (type: string, order: string) => {
    const response = await instance.get(`/share`, {
      params: {
        type,
        order,
      },
    });

    return response;
  },

  downloadSharedBook: async (id: number) => {
    const response = await instance.post(`/share`, {
      id,
    });

    return response;
  },
};
