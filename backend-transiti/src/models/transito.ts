import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';
import Veicolo from './veicolo';
import VarcoZtl from './varcoZtl';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
export interface TransitoAttributes {
  id_transito: number;
  veicolo: string;
  varco: number;
  data_ora: Date;
}

// Interfaccia per la creazione del modello, rende 'id_transito' opzionale
export interface TransitoCreationAttributes extends Optional<TransitoAttributes, 'id_transito'> {}

// Implementazione del modello
class Transito extends Model<TransitoAttributes, TransitoCreationAttributes> implements TransitoAttributes {
  public id_transito!: number;
  public veicolo!: string;
  public varco!: number;
  public data_ora!: Date;
}

// Inizializzazione del modello
Transito.init(
  {
    id_transito: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    veicolo: {
      type: DataTypes.STRING,
      references: {
        model: Veicolo,
        key: 'targa',
      },
      allowNull: false,
    },
    varco: {
      type: DataTypes.INTEGER,
      references: {
        model: VarcoZtl,
        key: 'id_varco',
      },
      allowNull: false,
    },
    data_ora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'transito',
    timestamps: false, // Disabilita i timestamp
  }
);

export default Transito;