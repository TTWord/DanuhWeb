import { instance } from '@/instance';

export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await instance.post('/auth/signin', {
      username,
      password,
    });

    return response;
  },
};
