import { DataTypes, Model, Optional } from 'sequelize';
<<<<<<< HEAD
import sequelize from '../utils/database';
=======
import Database from '../config/database';
>>>>>>> 11ebb8d (aggiornati model, creato dao per utente con interfacce annesse, creata prova controllerUtente)
import Veicolo from './veicolo';
import VarcoZtl from './varcoZtl';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
interface TransitoAttributes {
  id_transito: number;
  veicolo: string;
  varco: number;
  data_ora: Date;
}

// Interfaccia per la creazione del modello, rende 'id_transito' opzionale
interface TransitoCreationAttributes extends Optional<TransitoAttributes, 'id_transito'> {}

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
    },
    varco: {
      type: DataTypes.INTEGER,
      references: {
        model: VarcoZtl,
        key: 'id_varco',
      },
    },
    data_ora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'TRANSITO',
  }
);

export default Transito;