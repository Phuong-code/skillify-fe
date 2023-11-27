import axios from 'axios';

export const publicApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const authApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

publicApi.defaults.withCredentials = true;
authApi.defaults.withCredentials = true;

authApi.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        await publicApi.post('/api/auth/refresh', {
          refreshToken,
        });
        return authApi(originalRequest);
      } catch (error) {
        console.error('Error during token refresh:', error);
      }
    }
    return Promise.reject(err);
  },
);
