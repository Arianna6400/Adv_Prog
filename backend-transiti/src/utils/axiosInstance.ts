import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.PAGAMENTI_BASE_URL, // Assicurati di impostare questa variabile d'ambiente
  timeout: 5000,
});

export default axiosInstance;