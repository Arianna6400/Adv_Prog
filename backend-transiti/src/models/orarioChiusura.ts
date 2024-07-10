import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
export interface OrarioChiusuraAttributes {
  id_orario: number;
  giorno_chiusura: string;
  orario_inizio_f: string;
  orario_fine_f: string;
  orario_inizio_l: string;
  orario_fine_l: string;
  tariffa_f: number;
  tariffa_l: number;
}

// Interfaccia per la creazione del modello, rende 'id_orario' opzionale
export interface OrarioChiusuraCreationAttributes extends Optional<OrarioChiusuraAttributes, 'id_orario'> {}

// Implementazione del modello
class OrarioChiusura extends Model<OrarioChiusuraAttributes, OrarioChiusuraCreationAttributes> implements OrarioChiusuraAttributes {
  public id_orario!: number;
  private _giorno_chiusura!: string;
  private _orario_inizio_f!: string;
  private _orario_fine_f!: string;
  private _orario_inizio_l!: string;
  private _orario_fine_l!: string;
  private _tariffa_f!: number;
  private _tariffa_l!: number;

  // Getter e setter
  public get giorno_chiusura(): string {
    return this._giorno_chiusura;
  }

  public set giorno_chiusura(value: string) {
    this._giorno_chiusura = value;
  }

  public get orario_inizio_f(): string {
    return this._orario_inizio_f;
  }

  public set orario_inizio_f(value: string) {
    this._orario_inizio_f = value;
  }

  public get orario_fine_f(): string {
    return this._orario_fine_f;
  }

  public set orario_fine_f(value: string) {
    this._orario_fine_f = value;
  }

  public get orario_inizio_l(): string {
    return this._orario_inizio_l;
  }

  public set orario_inizio_l(value: string) {
    this._orario_inizio_l = value;
  }

  public get orario_fine_l(): string {
    return this._orario_fine_l;
  }

  public set orario_fine_l(value: string) {
    this._orario_fine_l = value;
  }

  public get tariffa_f(): number {
    return this._tariffa_f;
  }

  public set tariffa_f(value: number) {
    this._tariffa_f = value;
  }

  public get tariffa_l(): number {
    return this._tariffa_l;
  }

  public set tariffa_l(value: number) {
    this._tariffa_l = value;
  }
}

// Inizializzazione del modello
OrarioChiusura.init(
  {
    id_orario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    giorno_chiusura: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('giorno_chiusura');
      },
      set(value: string) {
        this.setDataValue('giorno_chiusura', value);
      },
    },
    orario_inizio_f: {
      type: DataTypes.TIME,
      get() {
        return this.getDataValue('orario_inizio_f');
      },
      set(value: string) {
        this.setDataValue('orario_inizio_f', value);
      },
    },
    orario_fine_f: {
      type: DataTypes.TIME,
      get() {
        return this.getDataValue('orario_fine_f');
      },
      set(value: string) {
        this.setDataValue('orario_fine_f', value);
      },
    },
    orario_inizio_l: {
      type: DataTypes.TIME,
      get() {
        return this.getDataValue('orario_inizio_l');
      },
      set(value: string) {
        this.setDataValue('orario_inizio_l', value);
      },
    },
    orario_fine_l: {
      type: DataTypes.TIME,
      get() {
        return this.getDataValue('orario_fine_l');
      },
      set(value: string) {
        this.setDataValue('orario_fine_l', value);
      },
    },
    tariffa_f: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      get() {
        return this.getDataValue('tariffa_f');
      },
      set(value: number) {
        this.setDataValue('tariffa_f', value);
      },
    },
    tariffa_l: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      get() {
        return this.getDataValue('tariffa_l');
      },
      set(value: number) {
        this.setDataValue('tariffa_l', value);
      },
    },
  },
  {
    sequelize,
    tableName: 'orario_chiusura',
    timestamps: false, // Disabilita i timestamp
  }
);

export default OrarioChiusura;