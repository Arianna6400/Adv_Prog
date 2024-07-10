import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
export interface OrarioChiusuraAttributes {
  id_orario: number;
  giorni_settimana_festivi: string;
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
  public giorni_settimana_festivi!: string;
  public orario_inizio_f!: string;
  public orario_fine_f!: string;
  public orario_inizio_l!: string;
  public orario_fine_l!: string;
  public tariffa_f!: number;
  public tariffa_l!: number;
}

// Inizializzazione del modello
OrarioChiusura.init(
  {
    id_orario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    giorni_settimana_festivi: {
      type: DataTypes.STRING,
    },
    orario_inizio_f: {
      type: DataTypes.TIME,
    },
    orario_fine_f: {
      type: DataTypes.TIME,
    },
    orario_inizio_l: {
      type: DataTypes.TIME,
    },
    orario_fine_l: {
      type: DataTypes.TIME,
    },
    tariffa_f: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    tariffa_l: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'orario_chiusura',
    timestamps: false, // Disabilita i timestamp
  }
);

export default OrarioChiusura;