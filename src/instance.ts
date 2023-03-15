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
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers!.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/auth';
    }
    return error;
  },
);
