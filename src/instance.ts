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

instance.interceptors.request.use(config => {
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
  response => {
    return response;
  },
  error => {
    const errorMessage = error.response.data.message;
    if (errorMessage === '만료된 토큰입니다.') {
      const getToken = async () => {
        const response = await instance.post('/auth/refreshtoken');
        console.log(response.data.data.access_token);
        localStorage.setItem('access_Token', response.data.data.access_token);
      };
      getToken();
    } else if (
      errorMessage === '유효하지 않은 토큰입니다.' ||
      errorMessage === '토큰이 제공되지 않았습니다.'
    ) {
      localStorage.removeItem('access_Token');
      localStorage.removeItem('refresh_Token');
      window.location.href = '/auth';
    }

    return Promise.reject(error);
  },
);
