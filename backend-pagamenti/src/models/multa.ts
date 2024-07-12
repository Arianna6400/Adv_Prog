import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
export interface MultaAttributes {
  id_multa: number;
  transito: number;
  data_multa: Date;
  pagata: boolean;
  importo_token: number;
  uuid_pagamento: string;
}

// Interfaccia per la creazione del modello, rende 'id_multa' opzionale
export interface MultaCreationAttributes extends Optional<MultaAttributes, 'id_multa'> {}

// Implementazione del modello
class Multa extends Model<MultaAttributes, MultaCreationAttributes> implements MultaAttributes {
  public id_multa!: number;
  public transito!: number;
  public data_multa!: Date;
  public pagata!: boolean;
  public importo_token!: number;
  public uuid_pagamento!: string;
}

// Inizializzazione del modello
Multa.init(
  {
    id_multa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    transito: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_multa: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    pagata: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    importo_token: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    uuid_pagamento: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'multa',
    timestamps: false, // Disabilita i timestamp
  }
);

export default Multa;