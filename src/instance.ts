// axios instance
import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.SERVER_NAME,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_Token');
  const refreshToken = localStorage.getItem('refresh_Token');
  const requestUrl = '/auth/refreshtoken';

  if (config.url === requestUrl) {
    config.headers!.Authorization = `Bearer ${refreshToken}`;
  } else {
    config.headers!.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = error.response.data.message;

    if (errorMessage === 'EXPIRED_ACCESS_TOKEN') {
      const getToken = async () => {
        const response = await instance.post('/auth/refreshtoken');
        localStorage.setItem('access_Token', response.data.data.access_token);
        location.reload(); // 새로고침
      };
      getToken();
    } else if (
      errorMessage === 'ACCESS_TOKEN_NOT_PROVIDED' ||
      errorMessage === 'INVALID_ACCESS_TOKEN' ||
      errorMessage === 'REFRESH_TOKEN_NOT_PROVIDED' ||
      errorMessage === 'EXPIRED_REFRESH_TOKEN' ||
      errorMessage === 'INVALID_REFRESH_TOKEN'
    ) {
      localStorage.removeItem('access_Token');
      localStorage.removeItem('refresh_Token');

      // 임시 알림 창
      window.location.href = '/error?code=LOGIN_REQUIRED';
    }

    return Promise.reject(error);
  },
);
