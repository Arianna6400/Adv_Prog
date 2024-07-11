import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.PAGAMENTI_BASE_URL || 'http://pagamenti:3001',
});

export const setAuthToken = (token: string) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;