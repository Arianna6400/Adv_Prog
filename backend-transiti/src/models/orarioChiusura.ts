import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
export interface OrarioChiusuraAttributes {
  id_orario: number;
  giorni_settimana_festivi: string;
  orario_inizio_F: Date;
  orario_fine_F: Date;
  orario_inizio_L: Date;
  orario_fine_L: Date;
  tariffa_F: number;
  tariffa_L: number;
}

// Interfaccia per la creazione del modello, rende 'id_orario' opzionale
export interface OrarioChiusuraCreationAttributes extends Optional<OrarioChiusuraAttributes, 'id_orario'> {}

// Implementazione del modello
class OrarioChiusura extends Model<OrarioChiusuraAttributes, OrarioChiusuraCreationAttributes> implements OrarioChiusuraAttributes {
  public id_orario!: number;
  public giorni_settimana_festivi!: string;
  public orario_inizio_F!: Date;
  public orario_fine_F!: Date;
  public orario_inizio_L!: Date;
  public orario_fine_L!: Date;
  public tariffa_F!: number;
  public tariffa_L!: number;
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
    orario_inizio_F: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    orario_fine_F: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    orario_inizio_L: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    orario_fine_L: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    tariffa_F: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    tariffa_L: {
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