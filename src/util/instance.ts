// axios instance
import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.SERVER_NAME,
  timeout: 10000,
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  const accessToken = localStorage.get('accessToken');

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
    return error;
  },
);
