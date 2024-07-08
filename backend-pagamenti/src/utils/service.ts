// src/utils/transitiService.ts
import axios from './connection';

const transitiService = {
  getMultaById: async (id: number) => {
    try {
      const response = await axios.get(`/multe/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Errore nel recupero della multa dal backend transiti');
    }
  }
};

export default transitiService;