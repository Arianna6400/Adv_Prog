import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
export interface UtenteAttributes {
  id_utente: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
  token_rimanenti: number;
}

// Interfaccia per la creazione del modello, rende 'id_utente' opzionale
export interface UtenteCreationAttributes extends Optional<UtenteAttributes, 'id_utente'> {}

// Implementazione del modello
class Utente extends Model<UtenteAttributes, UtenteCreationAttributes> implements UtenteAttributes {
  public id_utente!: number;
  public nome!: string;
  public cognome!: string;
  public email!: string;
  public ruolo!: string;
  public token_rimanenti!: number;

}

// Inizializzazione del modello
Utente.init(
  {
    id_utente: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Il database gestisce l'auto-incremento
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cognome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    ruolo: {
      type: DataTypes.ENUM('operatore', 'varco', 'automobilista', 'admin'),
      allowNull: false,
    },
    token_rimanenti: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'utente',
    timestamps: false, // Disabilita i timestamp
  }
);

export default Utente;