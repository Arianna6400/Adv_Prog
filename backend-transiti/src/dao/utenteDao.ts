import Utente, { UtenteAttributes, UtenteCreationAttributes } from '../models/utente';
import { DAO } from '../dao/daoInterface';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

interface UtenteDAO extends DAO<UtenteAttributes, number> {
  // metodi specifici per l'utentee, se necessari
}

class UtenteDao implements UtenteDAO {
  public async getAll(): Promise<Utente[]> {
    try {
      return await Utente.findAll();
    } catch (error) {
      console.error('Errore nel recupero degli utenti:', error);
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero degli utenti');
    }
  }

  public async getById(id: number): Promise<Utente | null> {
    try {
      return await Utente.findByPk(id);
    } catch (error) {
      console.error(`Errore nel recupero dell'utente con id ${id}:`, error);
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero dell'utente con id ${id}`);
    }
  }

  public async create(data: UtenteCreationAttributes): Promise<Utente> {
    try {
      return await Utente.create(data);
    } catch (error) {
      console.error('Errore nella creazione dell\'utente:', error);
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione dell\'utente');
    }
  }

  public async update(id: number, data: Partial<UtenteAttributes>): Promise<[number, Utente[]]> {
    try {
      const [affectedCount] = await Utente.update(data, { where: { id_utente: id } });
      const updatedUtenti = await Utente.findAll({ where: { id_utente: id } });
      return [affectedCount, updatedUtenti];
    } catch (error) {
      console.error(`Errore nell'aggiornamento dell'utente con id ${id}:`, error);
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento dell'utente con id ${id}`);
    }
  }

  public async delete(id: number): Promise<number> {
    try {
      return await Utente.destroy({ where: { id_utente: id } });
    } catch (error) {
      console.error(`Errore nella cancellazione dell'utente con id ${id}:`, error);
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione dell'utente con id ${id}`);
    }
  }
}

export default new UtenteDao();