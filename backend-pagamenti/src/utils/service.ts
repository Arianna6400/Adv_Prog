import connection from './connection';

class TransitiService {
  public async getMultaById(id: number) {
    try {
      const response = await connection.get(`/multe/${id}`);
      return response.data;
    } catch (error) {
      console.error('Errore nella comunicazione con il backend-transiti:', error);
      throw new Error('Impossibile ottenere la multa dal backend-transiti');
    }
  }
}

export default new TransitiService();
