import axios, { AxiosError } from 'axios';

interface ErrorResponse {
  code?: number;
  message?: string;
}

export const axiosInstance = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    const errorResponse = error.response?.data;
    return Promise.reject({
      status: error.response?.status,
      code: errorResponse?.code,
      message: errorResponse?.message || error.message,
    });
  },
);
