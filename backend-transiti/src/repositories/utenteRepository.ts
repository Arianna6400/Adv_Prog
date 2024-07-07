import utenteDao from '../dao/utenteDao';
import Utente, { UtenteCreationAttributes, UtenteAttributes } from '../models/utente';
import Veicolo from '../models/veicolo';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

class UtenteRepository {
  public async getAllUtenti(): Promise<Utente[]> {
    try {
      return await utenteDao.getAll();
    } catch (error) {
      console.error('Errore nel recupero degli utenti dal repository:', error);
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile recuperare gli utenti');
    }
  }

  public async getUtenteById(id: number): Promise<Utente | null> {
    try {
      return await utenteDao.getById(id);
    } catch (error) {
      console.error(`Errore nel recupero dell'utente con id ${id} dal repository:`, error);
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile recuperare l\'utente');
    }
  }

  public async createUtente(data: UtenteCreationAttributes): Promise<Utente> {
    try {
      return await utenteDao.create(data);
    } catch (error) {
      console.error('Errore nella creazione dell\'utente nel repository:', error);
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile creare l\'utente');
    }
  }

  public async updateUtente(id: number, data: Partial<UtenteAttributes>): Promise<[number, Utente[]]> {
    try {
      return await utenteDao.update(id, data);
    } catch (error) {
      console.error(`Errore nell'aggiornamento dell'utente con id ${id} nel repository:`, error);
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile aggiornare l\'utente');
    }
  }

  public async deleteUtente(id: number): Promise<number> {
    try {
      return await utenteDao.delete(id);
    } catch (error) {
      console.error(`Errore nella cancellazione dell'utente con id ${id} nel repository:`, error);
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile cancellare l\'utente');
    }
  }

  // Metodo per ottenere i veicoli di un utente
  public async getVeicoliByUtenteId(id: number): Promise<Veicolo[]> {
    try {
      return await Veicolo.findAll({ where: { utente: id } });
    } catch (error) {
      console.error(`Errore nel recupero dei veicoli per l'utente con id ${id}:`, error);
      throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile recuperare i veicoli dell\'utente');
    }
  }
}

export default new UtenteRepository();