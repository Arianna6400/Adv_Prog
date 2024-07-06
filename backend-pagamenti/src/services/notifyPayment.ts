
//Servizio per inviare notifiche al backend dei pagamenti utilizzando Axios

import axios from 'axios';

export async function notifyPaymentService(userId, multaId, importo) {
  try {
    const response = await axios.post('http://localhost:3001/api/payments/notify', {
      userId,
      multaId,
      importo
    });
    return response.data;
  } catch (error) {
    console.error('Error notifying payment service:', error);
    throw error;
  }
}
