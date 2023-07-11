import { instance } from '@/instance';

export const userAPI = {
  getUserInfo: async () => {
    const response = await instance.get('/user/userservice');

    return response;
  },

  deleteAccount: async () => {
    const response = await instance.delete('/user/userservice');

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

  changeNickname: async (newNickname: string) => {
    const response = await instance.put('/user/userservice', {
      to_nickname: newNickname,
    });

    return response;
  },
};
