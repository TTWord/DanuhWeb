import { instance } from '@/instance';

export const userAPI = {
  signup: async (
    username: string,
    password: string,
    nickname: string,
    certification_id: string,
  ) => {
    const response = await instance.post('/user/signup', {
      username,
      password,
      nickname,
      certification_id,
    });

    return response;
  },

  deleteAccount: async (username: string) => {
    const response = await instance.delete('/user/signup', {
      data: {
        username,
      },
    });

    return response;
  },

  modifyAccount: async (
    id: string,
    username: string,
    password: string,
    nickname: string,
    certification_id: string,
  ) => {
    const response = await instance.put(`/user/${id}`, {
      username,
      password,
      nickname,
      certification_id,
    });

    return response;
  },
};
