import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
export interface OrarioChiusuraAttributes {
  id_orario: number;
  giorni_settimana_festivi: string;
  fascia_oraria_F: Date;
  fascia_oraria_L: Date;
  tariffa_F: number;
  tariffa_L: number;
}

// Interfaccia per la creazione del modello, rende 'id_orario' opzionale
export interface OrarioChiusuraCreationAttributes extends Optional<OrarioChiusuraAttributes, 'id_orario'> {}

// Implementazione del modello
class OrarioChiusura extends Model<OrarioChiusuraAttributes, OrarioChiusuraCreationAttributes> implements OrarioChiusuraAttributes {
  public id_orario!: number;
  public giorni_settimana_festivi!: string;
  public fascia_oraria_F!: Date;
  public fascia_oraria_L!: Date;
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
    fascia_oraria_F: {
      type: DataTypes.TIME,
    },
    fascia_oraria_L: {
      type: DataTypes.TIME,
    },
    tariffa_F: {
      type: DataTypes.DECIMAL(10, 2),
    },
    tariffa_L: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    sequelize,
    tableName: 'orario_chiusura',
    timestamps: false, // Disabilita i timestamp
  }
);

export default OrarioChiusura;