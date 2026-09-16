import axios from 'axios';
import { clearSession, getAuthToken } from '../utils/auth.js';

const axiosInstance = axios.create({
  baseURL: 'https://story-api.dicoding.dev/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (config.data instanceof FormData) delete config.headers['Content-Type'];
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearSession();
      window.dispatchEvent(new CustomEvent('auth-expired'));
    }
    const message = error.response?.data?.message || error.message || 'Permintaan API gagal.';
    return Promise.reject(new Error(message));
  },
);

export default axiosInstance;
