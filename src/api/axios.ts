import axios from 'axios';

// interface ErrorResponse {
//   code?: number;
//   message?: string;
// }

export const instance = axios.create({
  baseURL: 'https://api-test',
  headers: {
    'Content-Type': 'application/json',
  },
});

// instance.interceptors.response.use(
//   async (response) => response,
//   async (error: AxiosError<ErrorResponse>) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   },
// );
