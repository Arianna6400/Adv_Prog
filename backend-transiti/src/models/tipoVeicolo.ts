import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
interface TipoVeicoloAttributes {
  id_tipo_veicolo: number;
  descrizione: string;
  tariffa_base: number;
}

// Interfaccia per la creazione del modello, rende 'id_tipo_veicolo' opzionale
interface TipoVeicoloCreationAttributes extends Optional<TipoVeicoloAttributes, 'id_tipo_veicolo'> {}

// Implementazione del modello
class TipoVeicolo extends Model<TipoVeicoloAttributes, TipoVeicoloCreationAttributes> implements TipoVeicoloAttributes {
  public id_tipo_veicolo!: number;
  public descrizione!: string;
  public tariffa_base!: number;
}

// Inizializzazione del modello
TipoVeicolo.init(
  {
    id_tipo_veicolo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descrizione: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tariffa_base: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'TIPO_VEICOLO',
  }
);

export default TipoVeicolo;