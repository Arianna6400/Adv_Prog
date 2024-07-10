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
  private _nome!: string;
  private _cognome!: string;
  private _email!: string;
  private _ruolo!: string;
  private _token_rimanenti!: number;

  // Getter e setter per 'nome'
  public get nome(): string {
    return this._nome;
  }

  public set nome(value: string) {
    this._nome = value;
  }

  // Getter e setter per 'cognome'
  public get cognome(): string {
    return this._cognome;
  }

  public set cognome(value: string) {
    this._cognome = value;
  }

  // Getter e setter per 'email'
  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  // Getter e setter per 'ruolo'
  public get ruolo(): string {
    return this._ruolo;
  }

  public set ruolo(value: string) {
    this._ruolo = value;
  }

  // Getter e setter per 'token_rimanenti'
  public get token_rimanenti(): number {
    return this._token_rimanenti;
  }

  public set token_rimanenti(value: number) {
    this._token_rimanenti = value;
  }
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
      get() {
        return this.getDataValue('nome');
      },
      set(value: string) {
        this.setDataValue('nome', value);
      },
    },
    cognome: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        return this.getDataValue('cognome');
      },
      set(value: string) {
        this.setDataValue('cognome', value);
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      get() {
        return this.getDataValue('email');
      },
      set(value: string) {
        this.setDataValue('email', value);
      },
    },
    ruolo: {
      type: DataTypes.ENUM('operatore', 'varco', 'automobilista', 'admin'),
      allowNull: false,
      get() {
        return this.getDataValue('ruolo');
      },
      set(value: string) {
        this.setDataValue('ruolo', value);
      },
    },
    token_rimanenti: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      get() {
        return this.getDataValue('token_rimanenti');
      },
      set(value: number) {
        this.setDataValue('token_rimanenti', value);
      },
    },
  },
  {
    sequelize,
    tableName: 'utente',
    timestamps: false, // Disabilita i timestamp
  }
);

export default Utente;