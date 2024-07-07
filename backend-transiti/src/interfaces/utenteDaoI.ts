import { DAO } from './daoI';
import { UtenteAttributes } from '../models/utente';

export interface UtenteDAO extends DAO<UtenteAttributes, number> {
  // metodi specifici per l'utentee, se necessari
}