import { instance } from '@/instance';

export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await instance.post('/auth/signin', {
      username,
      password,
    });

    return response;
  },

  sendmail: async (username: string, password: string, nickname: string) => {
    const response = await instance.post('/auth/sendmail', {
      username,
      password,
      nickname,
    });

    return response;
  },
};
