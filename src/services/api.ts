import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const TOKEN_KEY = 'six-cities-token';

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: 'https://14.design.htmlacademy.pro/six-cities',
    timeout: 5000,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers['X-Token'] = token;
    }
    return config;
  });

  return api;
}

