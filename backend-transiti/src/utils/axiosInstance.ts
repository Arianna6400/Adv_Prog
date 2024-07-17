import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.PAGAMENTI_BASE_URL || 'http://pagamenti:3001',
});

/**
 *  Imposta il token come intestazione di autorizzazione per tutte le richieste Axios.
 * 
 * @param {string} token Il token JWT
 */
export const setAuthToken = (token: string) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization']; // Se il token non è fornito viene rimossa l'intestazione Authorization
  }
};

export default axiosInstance;