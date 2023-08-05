import { instance } from '@/instance';

interface ISharedBooks {
  nameFilter?: string;
  type?: string;
  order?: string;
  mode?: string;
  filter?: boolean;
  userId?: number;
}

export const shareAPI = {
  getSharedBooks: async ({ nameFilter, type, order }: ISharedBooks) => {
    const response = await instance.get(`/share`, {
      params: {
        name: nameFilter,
        type: type,
        order: order,
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

  getUserShareBooks: async ({ mode, order, filter }: ISharedBooks) => {
    const { data: response } = await instance.get(`/share/user/${mode}`, {
      params: {
        order,
        filter,
      },
    });

    return response;
  },

  getOtherUserShareBooks: async ({ userId, type, order }: ISharedBooks) => {
    const response = await instance.get(`/share/user/${userId}`, {
      params: {
        type: type,
        order: order,
      },
    });

    return response;
  },
};
