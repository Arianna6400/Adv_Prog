
//Servizio per istanziare una connessione con il backend-transiti utilizzando Axios

import axios from 'axios';

const connection = axios.create({
  baseURL: process.env.TRANSITI_BASE_URL, // Assicurati di impostare questa variabile d'ambiente
  timeout: 5000,
});

export default connection;

