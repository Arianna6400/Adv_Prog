
// errore riga 29 e 38 da verificare

import { UtenteDAO } from '../interfaces/utenteDaoI';
import Utente from '../models/utente';
import { HttpError } from '../middleware/errorHandler';

class UtenteDao implements UtenteDAO {
  public async getAll(): Promise<Utente[]> {
    try {
      return await Utente.findAll();
    } catch (error) {
      console.error('Errore nel recupero degli utenti:', error);
      throw new HttpError(500, 'Errore nel recupero degli utenti');
    }
  }

  public async getById(id: number): Promise<Utente | null> {
    try {
      return await Utente.findByPk(id);
    } catch (error) {
      console.error(`Errore nel recupero dell'utente con id ${id}:`, error);
      throw new HttpError(500, `Errore nel recupero dell'utente con id ${id}`);
    }
  }

  public async create(data: Partial<Utente>): Promise<Utente> {
    try {
      return await Utente.create(data);
    } catch (error) {
      console.error('Errore nella creazione dell\'utente:', error);
      throw new HttpError(500, 'Errore nella creazione dell\'utente');
    }
  }

  public async update(id: number, data: Partial<Utente>): Promise<[number, Utente[]]> {
    try {
      return await Utente.update(data, { where: { id_utente: id } });
    } catch (error) {
      console.error(`Errore nell'aggiornamento dell'utente con id ${id}:`, error);
      throw new HttpError(500, `Errore nell'aggiornamento dell'utente con id ${id}`);
    }
  }

  public async delete(id: number): Promise<number> {
    try {
      return await Utente.destroy({ where: { id_utente: id } });
    } catch (error) {
      console.error(`Errore nella cancellazione dell'utente con id ${id}:`, error);
      throw new HttpError(500, `Errore nella cancellazione dell'utente con id ${id}`);
    }
  }
}

export default new UtenteDao();