import Utente, { UtenteAttributes, UtenteCreationAttributes } from '../models/utente';
import { DAO } from '../dao/daoInterface';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { Transaction } from 'sequelize';

// Interfaccia UtenteDAO che estende la DAO per includere metodi specifici per Utente
interface UtenteDAO extends DAO<UtenteAttributes, number> {
  // metodi specifici per l'utentee, se necessari
}

// Classe UtenteDao che implementa l'interfaccia UtenteDAO
class UtenteDao implements UtenteDAO {
  /**
   * Recupera tutti gli utenti.
   * 
   * @returns {Promise<Utente[]>} Una Promise che risolve un array di utenti.
   */
  public async getAll(): Promise<Utente[]> {
      try {
          return await Utente.findAll();
      } catch (error) {
          throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero degli utenti');
      }
  }

  /**
   * Recupera un utente per ID.
   * 
   * @param {number} id L'ID dell'utente.
   * @returns {Promise<Utente | null>} Una Promise che risolve un utente o null se non trovato.
   */
  public async getById(id: number): Promise<Utente | null> {
      try {
          const utente = await Utente.findByPk(id);
          if (!utente) {
              throw ErrorFactory.createError(ErrorTypes.NotFound, `Utente con id ${id} non trovato`);
          }
          return utente;
      } catch (error) {
          throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero dell'utente con id ${id}`);
      }
  }

  /**
   * Crea un nuovo utente.
   * 
   * @param {UtenteCreationAttributes} data I dati per creare l'utente.
   * @param {Object} [options] Opzioni aggiuntive per la transazione.
   * @param {Transaction} [options.transaction] La transazione Sequelize.
   * @returns {Promise<Utente>} Una Promise che risolve l'utente creato.
   */
  public async create(data: UtenteCreationAttributes, options?: { transaction?: Transaction }): Promise<Utente> {
    try {
        return await Utente.create(data, options);
    } catch (error) {
        throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione dell\'utente');
    }
  }

  /**
   * Aggiorna un utente esistente.
   * 
   * @param {number} id L'ID dell'utente.
   * @param {Partial<UtenteAttributes>} data I dati per aggiornare l'utente.
   * @param {Object} [options] Opzioni aggiuntive per la transazione.
   * @param {Transaction} [options.transaction] La transazione Sequelize.
   * @returns {Promise<[number, Utente[]]>} Una Promise che risolve il numero di righe aggiornate e l'array degli utenti aggiornati.
   */
  public async update(id: number, data: Partial<UtenteAttributes>, options?: { transaction?: Transaction }): Promise<[number, Utente[]]> {
      try {
          const utente = await Utente.findByPk(id);
          if (!utente) {
              throw ErrorFactory.createError(ErrorTypes.NotFound, `Utente con id ${id} non trovato`);
          }
          const [affectedCount] = await Utente.update(data, { where: { id_utente: id }, returning: true });
          const updatedUtenti = await Utente.findAll({ where: { id_utente: id } });
          return [affectedCount, updatedUtenti];
      } catch (error) {
          throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento dell'utente con id ${id}`);
      }
  }

  /**
   * Cancella un utente per ID.
   * 
   * @param {number} id L'ID dell'utente.
   * @param {Object} [options] Opzioni aggiuntive per la transazione.
   * @param {Transaction} [options.transaction] La transazione Sequelize.
   * @returns {Promise<number>} Una Promise che risolve il numero di righe cancellate.
   */
  public async delete(id: number, options?: { transaction?: Transaction }): Promise<number> {
      try {
          const utente = await Utente.findByPk(id, options);
          if (!utente) {
              throw ErrorFactory.createError(ErrorTypes.NotFound, `Utente con id ${id} non trovato`);
          }
          return await Utente.destroy({ where: { id_utente: id }, ...options });
      } catch (error) {
          throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione dell'utente con id ${id}`);
      }
  }
}

export default new UtenteDao();