
import axios from 'axios';

const connection = axios.create({
  baseURL: process.env.TRANSITI_BASE_URL, // Assicurati di impostare questa variabile d'ambiente
  timeout: 5000,
});

// Aggiungi un interceptor per aggiungere il token a ogni richiesta
connection.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Assicurati di ottenere il token in modo sicuro
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default connection;