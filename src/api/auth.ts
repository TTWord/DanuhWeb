import { instance } from '@/instance';

export const authAPI = {
  signup: async (
    username: string,
    password: string,
    nickname: string,
    certification_id: string,
  ) => {
    const response = await instance.post('/auth/signup', {
      username,
      password,
      nickname,
      certification_id,
    });

    return response;
  },

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

  socialLogin: async (social: string) => {
    const response = await instance.post(`/auth/${social}`);

    return response;
  },

  checkNickname: async (nickname: string) => {
    const response = await instance.post('/auth/check/nickname', {
      nickname,
    });

    return response;
  },

  findPassword: async (username: string) => {
    const response = await instance.post('/auth/findpassword', {
      username,
    });

    return response;
  },

  checkCert: async (username: string, certification_id: number) => {
    const response = await instance.post('/auth/checkcert', {
      username,
      certification_id,
    });

    return response;
  },
};
